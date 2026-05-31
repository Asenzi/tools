import { Locale } from '@/i18n/config';

export interface FAQ {
  question: string;
  answer: string;
}

export interface LocalizedContent {
  name: string;
  description: string;
  faqs: FAQ[];
  useCases: string[];
  placeholder: string;
}

export interface AiTool {
  slug: string;
  category: string;
  keywords: Record<Locale, string[]>;
  component: string;
  icon: string;
  relatedTools: string[];
  systemPrompt: Record<Locale, string>;
  content: Record<Locale, LocalizedContent>;
}

export const aiTools: AiTool[] = [
  {
    slug: "prompt-generator",
    category: "ai-writing",
    keywords: {
      en: ["prompt", "ai", "chatgpt", "claude", "generator"],
      zh: ["提示词", "ai", "chatgpt", "claude", "生成器"],
    },
    component: "PromptGenerator",
    icon: "Sparkles",
    relatedTools: ["seo-title-generator", "product-description-generator"],
    systemPrompt: {
      en: "You are an expert prompt engineer. Generate a detailed, well-structured prompt based on the user's brief description. The prompt should be clear, specific, and optimized for getting the best results from AI models. Include context, constraints, and desired output format.",
      zh: "你是一位专业的提示词工程师。根据用户的简要描述生成详细、结构良好的提示词。提示词应该清晰、具体，并针对从 AI 模型获得最佳结果进行优化。包括上下文、约束条件和期望的输出格式。",
    },
    content: {
      en: {
        name: "AI Prompt Generator",
        description: "Generate optimized prompts for AI models like ChatGPT, Claude, and others. Get better AI responses with well-structured prompts.",
        placeholder: "Describe what you want the AI to do... (e.g., 'Write a product description for a smart watch')",
        faqs: [
          {
            question: "What makes a good AI prompt?",
            answer: "A good prompt is specific, provides context, sets clear expectations, and defines the desired output format."
          },
          {
            question: "Which AI models does this work with?",
            answer: "The generated prompts work with ChatGPT, Claude, Gemini, and most other large language models."
          }
        ],
        useCases: [
          "Create better ChatGPT prompts",
          "Optimize AI interactions",
          "Learn prompt engineering",
          "Generate consistent AI outputs"
        ],
      },
      zh: {
        name: "AI 提示词生成器",
        description: "为 ChatGPT、Claude 等 AI 模型生成优化的提示词。通过结构良好的提示词获得更好的 AI 响应。",
        placeholder: "描述你想让 AI 做什么...（例如：'为智能手表写一个产品描述'）",
        faqs: [
          {
            question: "什么是好的 AI 提示词？",
            answer: "好的提示词应该具体、提供上下文、设定明确的期望，并定义期望的输出格式。"
          },
          {
            question: "这适用于哪些 AI 模型？",
            answer: "生成的提示词适用于 ChatGPT、Claude、Gemini 和大多数其他大型语言模型。"
          }
        ],
        useCases: [
          "创建更好的 ChatGPT 提示词",
          "优化 AI 交互",
          "学习提示词工程",
          "生成一致的 AI 输出"
        ],
      },
    },
  },
  {
    slug: "seo-title-generator",
    category: "ai-seo",
    keywords: {
      en: ["seo", "title", "headline", "meta", "optimization"],
      zh: ["seo", "标题", "优化", "元标签"],
    },
    component: "SeoTitleGenerator",
    icon: "Heading",
    relatedTools: ["meta-description-generator", "xiaohongshu-title-generator"],
    systemPrompt: {
      en: "You are an SEO expert. Generate 5 SEO-optimized title variations based on the user's topic. Each title should be 50-60 characters, include relevant keywords naturally, be compelling and click-worthy, and follow SEO best practices. Return only the titles, numbered 1-5.",
      zh: "你是一位 SEO 专家。根据用户的主题生成 5 个 SEO 优化的标题变体。每个标题应为 50-60 个字符，自然地包含相关关键词，引人注目且值得点击，并遵循 SEO 最佳实践。只返回标题，编号 1-5。",
    },
    content: {
      en: {
        name: "SEO Title Generator",
        description: "Generate SEO-optimized titles for your content. Get multiple title variations with optimal length and keyword placement.",
        placeholder: "Enter your topic or main keyword... (e.g., 'best coffee makers 2024')",
        faqs: [
          {
            question: "What's the ideal title length?",
            answer: "SEO titles should be 50-60 characters to display fully in search results without truncation."
          },
          {
            question: "How many titles will I get?",
            answer: "You'll receive 5 different title variations to choose from."
          }
        ],
        useCases: [
          "Optimize blog post titles",
          "Create compelling headlines",
          "Improve click-through rates",
          "A/B test different titles"
        ],
      },
      zh: {
        name: "SEO 标题生成器",
        description: "为您的内容生成 SEO 优化的标题。获取具有最佳长度和关键词位置的多个标题变体。",
        placeholder: "输入您的主题或主要关键词...（例如：'2024年最佳咖啡机'）",
        faqs: [
          {
            question: "理想的标题长度是多少？",
            answer: "SEO 标题应为 50-60 个字符，以便在搜索结果中完整显示而不被截断。"
          },
          {
            question: "我会得到多少个标题？",
            answer: "您将收到 5 个不同的标题变体供选择。"
          }
        ],
        useCases: [
          "优化博客文章标题",
          "创建引人注目的标题",
          "提高点击率",
          "A/B 测试不同标题"
        ],
      },
    },
  },
  {
    slug: "xiaohongshu-title-generator",
    category: "ai-social",
    keywords: {
      en: ["xiaohongshu", "小红书", "title", "social media", "chinese"],
      zh: ["小红书", "标题", "社交媒体", "爆款"],
    },
    component: "XiaohongshuTitleGenerator",
    icon: "MessageSquare",
    relatedTools: ["seo-title-generator", "product-description-generator"],
    systemPrompt: {
      en: "你是小红书爆款标题专家。根据用户的主题生成5个小红书风格的标题。要求：1) 使用合适的emoji 2) 制造悬念或好奇心 3) 15-20字左右 4) 符合小红书用户阅读习惯 5) 可以使用｜、！、✨等符号。只返回标题，编号1-5。",
      zh: "你是小红书爆款标题专家。根据用户的主题生成5个小红书风格的标题。要求：1) 使用合适的emoji 2) 制造悬念或好奇心 3) 15-20字左右 4) 符合小红书用户阅读习惯 5) 可以使用｜、！、✨等符号。只返回标题，编号1-5。",
    },
    content: {
      en: {
        name: "Xiaohongshu Title Generator",
        description: "Generate engaging titles for Xiaohongshu (小红书) posts. Optimized for Chinese social media with emojis and trending formats.",
        placeholder: "输入你的内容主题... (例如：'分享一款好用的面膜')",
        faqs: [
          {
            question: "小红书标题有什么特点？",
            answer: "小红书标题通常使用emoji、制造悬念、简短有力，能快速吸引用户注意力。"
          },
          {
            question: "标题长度多少合适？",
            answer: "建议15-20字，既能完整表达又不会太长影响阅读。"
          }
        ],
        useCases: [
          "创作小红书笔记标题",
          "提高笔记点击率",
          "学习爆款标题套路",
          "优化内容传播"
        ],
      },
      zh: {
        name: "小红书标题生成器",
        description: "为小红书笔记生成吸引人的标题。针对中文社交媒体优化，包含 emoji 和流行格式。",
        placeholder: "输入你的内容主题...（例如：'分享一款好用的面膜'）",
        faqs: [
          {
            question: "小红书标题有什么特点？",
            answer: "小红书标题通常使用emoji、制造悬念、简短有力，能快速吸引用户注意力。"
          },
          {
            question: "标题长度多少合适？",
            answer: "建议15-20字，既能完整表达又不会太长影响阅读。"
          }
        ],
        useCases: [
          "创作小红书笔记标题",
          "提高笔记点击率",
          "学习爆款标题套路",
          "优化内容传播"
        ],
      },
    },
  },
];

export const getAiToolBySlug = (slug: string): AiTool | undefined => {
  return aiTools.find(tool => tool.slug === slug);
};

export const getAiToolsByCategory = (category: string): AiTool[] => {
  return aiTools.filter(tool => tool.category === category);
};

export const searchAiTools = (query: string, locale: Locale): AiTool[] => {
  const lowerQuery = query.toLowerCase();
  return aiTools.filter(tool => {
    const content = tool.content[locale];
    const keywords = tool.keywords[locale] || tool.keywords.en;

    return (
      content.name.toLowerCase().includes(lowerQuery) ||
      content.description.toLowerCase().includes(lowerQuery) ||
      keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
    );
  });
};
