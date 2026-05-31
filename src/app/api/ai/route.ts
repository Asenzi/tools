import { NextRequest, NextResponse } from 'next/server';
import { generateWithDeepSeek, AiGenerateResponse } from '@/lib/ai';
import { checkRateLimit, getRateLimitKey, getClientIp } from '@/lib/rateLimit';

async function logAiUsage(ip: string, toolSlug: string, prompt: string, result: string) {
  const databaseUrl = process.env.DATABASE_URL;

  // File-based SQLite is fine locally, but it is not a reliable persistence layer on Vercel.
  if (!databaseUrl || (process.env.VERCEL && databaseUrl.startsWith('file:'))) {
    return;
  }

  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    await prisma.aiUsageLog.create({
      data: {
        ip,
        toolSlug,
      },
    });

    await prisma.aiGenerationLog.create({
      data: {
        toolSlug,
        prompt,
        result,
        ip,
      },
    });

    await prisma.$disconnect();
  } catch (error) {
    console.warn('Skipping AI usage logging:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { toolSlug, prompt, systemPrompt } = body;

    if (!toolSlug || !prompt || !systemPrompt) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get client IP
    const ip = getClientIp(request);

    // Check rate limit
    const rateLimitKey = getRateLimitKey(ip, toolSlug);
    const rateLimit = checkRateLimit(rateLimitKey);

    if (!rateLimit.allowed) {
      const resetDate = new Date(rateLimit.resetAt);
      return NextResponse.json(
        {
          success: false,
          error: `Rate limit exceeded. Resets at ${resetDate.toLocaleString()}`,
          remaining: rateLimit.remaining,
          resetAt: rateLimit.resetAt,
        },
        { status: 429 }
      );
    }

    // Generate with DeepSeek
    const result = await generateWithDeepSeek(systemPrompt, prompt);

    await logAiUsage(ip, toolSlug, prompt, result);

    const response: AiGenerateResponse = {
      success: true,
      result,
      remaining: rateLimit.remaining,
      resetAt: rateLimit.resetAt,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
