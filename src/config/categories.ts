export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  toolType: 'tool' | 'ai-tool' | 'both';
}

export const categories: Category[] = [
  {
    slug: "formatter",
    name: "Formatters",
    description: "Format and beautify code, data, and text",
    icon: "Code",
    toolType: "tool"
  },
  {
    slug: "validator",
    name: "Validators",
    description: "Validate syntax and data integrity",
    icon: "CheckCircle",
    toolType: "tool"
  },
  {
    slug: "encoder",
    name: "Encoders/Decoders",
    description: "Encode and decode various formats",
    icon: "Binary",
    toolType: "tool"
  },
  {
    slug: "converter",
    name: "Converters",
    description: "Convert between different formats and units",
    icon: "RefreshCw",
    toolType: "tool"
  },
  {
    slug: "generator",
    name: "Generators",
    description: "Generate IDs, expressions, and more",
    icon: "Zap",
    toolType: "tool"
  },
  {
    slug: "decoder",
    name: "Decoders",
    description: "Decode and inspect encoded data",
    icon: "Eye",
    toolType: "tool"
  },
  {
    slug: "tester",
    name: "Testers",
    description: "Test patterns and expressions",
    icon: "TestTube",
    toolType: "tool"
  },
  {
    slug: "ai-writing",
    name: "AI Writing",
    description: "AI-powered writing and content generation",
    icon: "PenTool",
    toolType: "ai-tool"
  },
  {
    slug: "ai-seo",
    name: "AI SEO",
    description: "AI-powered SEO optimization tools",
    icon: "TrendingUp",
    toolType: "ai-tool"
  },
  {
    slug: "ai-social",
    name: "AI Social Media",
    description: "AI tools for social media content",
    icon: "Share2",
    toolType: "ai-tool"
  },
  {
    slug: "ai-ecommerce",
    name: "AI E-commerce",
    description: "AI tools for online stores",
    icon: "ShoppingBag",
    toolType: "ai-tool"
  }
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(cat => cat.slug === slug);
};
