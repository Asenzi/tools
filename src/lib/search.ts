import { tools, Tool } from '@/config/tools';
import { aiTools, AiTool } from '@/config/aiTools';

export type SearchResult = {
  type: 'tool' | 'ai-tool';
  item: Tool | AiTool;
  score: number;
};

export function searchAll(query: string): SearchResult[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  // Search regular tools
  tools.forEach(tool => {
    const score = calculateScore(tool, lowerQuery);
    if (score > 0) {
      results.push({ type: 'tool', item: tool, score });
    }
  });

  // Search AI tools
  aiTools.forEach(tool => {
    const score = calculateScore(tool, lowerQuery);
    if (score > 0) {
      results.push({ type: 'ai-tool', item: tool, score });
    }
  });

  // Sort by score (highest first)
  return results.sort((a, b) => b.score - a.score);
}

function calculateScore(tool: Tool | AiTool, query: string): number {
  let score = 0;

  // Exact name match (highest priority)
  if (tool.name.toLowerCase() === query) {
    score += 100;
  }
  // Name contains query
  else if (tool.name.toLowerCase().includes(query)) {
    score += 50;
  }

  // Slug match
  if (tool.slug.includes(query)) {
    score += 40;
  }

  // Description match
  if (tool.description.toLowerCase().includes(query)) {
    score += 20;
  }

  // Keywords match
  tool.keywords.forEach(keyword => {
    if (keyword.toLowerCase().includes(query)) {
      score += 30;
    }
    if (keyword.toLowerCase() === query) {
      score += 20; // Bonus for exact keyword match
    }
  });

  // Category match
  if (tool.category.toLowerCase().includes(query)) {
    score += 15;
  }

  return score;
}

export function getPopularTools(limit: number = 6): Tool[] {
  // For now, return first N tools
  // In production, this could be based on usage analytics
  return tools.slice(0, limit);
}

export function getPopularAiTools(limit: number = 4): AiTool[] {
  return aiTools.slice(0, limit);
}
