export interface FAQ {
  question: string;
  answer: string;
}

export interface AiTool {
  slug: string;
  name: string;
  category: string;
  description: string;
  keywords: string[];
  component: string;
  faqs: FAQ[];
  useCases: string[];
  relatedTools: string[];
  icon: string;
  systemPrompt: string;
  placeholder: string;
}

export const aiTools: AiTool[] = [
  {
    slug: "prompt-generator",
    name: "AI Prompt Generator",
    category: "ai-writing",
    description: "Generate optimized prompts for AI models like ChatGPT, Claude, and others. Get better AI responses with well-structured prompts.",
    keywords: ["prompt", "ai", "chatgpt", "claude", "generator"],
    component: "PromptGenerator",
    icon: "Sparkles",
    systemPrompt: "You are an expert prompt engineer. Generate a detailed, well-structured prompt based on the user's brief description. The prompt should be clear, specific, and optimized for getting the best results from AI models. Include context, constraints, and desired output format.",
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
    relatedTools: ["seo-title-generator", "product-description-generator"]
  },
  {
    slug: "seo-title-generator",
    name: "SEO Title Generator",
    category: "ai-seo",
    description: "Generate SEO-optimized titles for your content. Get multiple title variations with optimal length and keyword placement.",
    keywords: ["seo", "title", "headline", "meta", "optimization"],
    component: "SeoTitleGenerator",
    icon: "Heading",
    systemPrompt: "You are an SEO expert. Generate 5 SEO-optimized title variations based on the user's topic. Each title should be 50-60 characters, include relevant keywords naturally, be compelling and click-worthy, and follow SEO best practices. Return only the titles, numbered 1-5.",
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
    relatedTools: ["meta-description-generator", "xiaohongshu-title-generator"]
  },
  {
    slug: "meta-description-generator",
    name: "Meta Description Generator",
    category: "ai-seo",
    description: "Create compelling meta descriptions that improve click-through rates. Optimized for search engines and user engagement.",
    keywords: ["meta", "description", "seo", "snippet", "serp"],
    component: "MetaDescriptionGenerator",
    icon: "FileText",
    systemPrompt: "You are an SEO copywriter. Generate 3 meta description variations based on the user's content. Each description should be 150-160 characters, include the main keyword naturally, have a clear call-to-action, and be compelling enough to improve click-through rates. Return only the descriptions, numbered 1-3.",
    placeholder: "Describe your page content... (e.g., 'Guide to choosing the right coffee maker')",
    faqs: [
      {
        question: "What's the ideal meta description length?",
        answer: "Meta descriptions should be 150-160 characters to display fully in search results."
      },
      {
        question: "Do meta descriptions affect SEO?",
        answer: "While not a direct ranking factor, good meta descriptions improve click-through rates, which can indirectly boost SEO."
      }
    ],
    useCases: [
      "Optimize search snippets",
      "Improve CTR from search results",
      "Create compelling page descriptions",
      "Enhance SERP appearance"
    ],
    relatedTools: ["seo-title-generator", "prompt-generator"]
  },
  {
    slug: "xiaohongshu-title-generator",
    name: "Xiaohongshu Title Generator",
    category: "ai-social",
    description: "Generate engaging titles for Xiaohongshu (小红书) posts. Optimized for Chinese social media with emojis and trending formats.",
    keywords: ["xiaohongshu", "小红书", "title", "social media", "chinese"],
    component: "XiaohongshuTitleGenerator",
    icon: "MessageSquare",
    systemPrompt: "你是小红书爆款标题专家。根据用户的主题生成5个小红书风格的标题。要求：1) 使用合适的emoji 2) 制造悬念或好奇心 3) 15-20字左右 4) 符合小红书用户阅读习惯 5) 可以使用｜、！、✨等符号。只返回标题，编号1-5。",
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
    relatedTools: ["seo-title-generator", "product-description-generator"]
  },
  {
    slug: "product-description-generator",
    name: "Product Description Generator",
    category: "ai-ecommerce",
    description: "Generate compelling product descriptions for e-commerce. Highlight features, benefits, and create urgency to drive sales.",
    keywords: ["product", "description", "ecommerce", "copywriting", "sales"],
    component: "ProductDescriptionGenerator",
    icon: "ShoppingCart",
    systemPrompt: "You are an e-commerce copywriter. Generate a compelling product description based on the user's product details. The description should: 1) Start with an attention-grabbing hook 2) Highlight key features and benefits 3) Address customer pain points 4) Include a call-to-action 5) Be scannable with short paragraphs. Keep it 100-150 words.",
    placeholder: "Describe your product... (e.g., 'Wireless earbuds with noise cancellation, 24h battery')",
    faqs: [
      {
        question: "What makes a good product description?",
        answer: "Good descriptions focus on benefits over features, tell a story, address customer needs, and include clear calls-to-action."
      },
      {
        question: "How long should it be?",
        answer: "Aim for 100-150 words - long enough to be informative but short enough to maintain attention."
      }
    ],
    useCases: [
      "Write e-commerce product pages",
      "Create marketplace listings",
      "Improve conversion rates",
      "Save time on copywriting"
    ],
    relatedTools: ["prompt-generator", "xiaohongshu-title-generator"]
  }
];

export const getAiToolBySlug = (slug: string): AiTool | undefined => {
  return aiTools.find(tool => tool.slug === slug);
};

export const getAiToolsByCategory = (category: string): AiTool[] => {
  return aiTools.filter(tool => tool.category === category);
};

export const searchAiTools = (query: string): AiTool[] => {
  const lowerQuery = query.toLowerCase();
  return aiTools.filter(tool =>
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
  );
};
