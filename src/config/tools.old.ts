export interface FAQ {
  question: string;
  answer: string;
}

export interface Tool {
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
}

export const tools: Tool[] = [
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    category: "formatter",
    description: "Format, validate and beautify JSON data with syntax highlighting. Supports minification and error detection.",
    keywords: ["json", "formatter", "beautify", "minify", "validate", "pretty print"],
    component: "JsonFormatter",
    icon: "Braces",
    faqs: [
      {
        question: "What is JSON formatting?",
        answer: "JSON formatting is the process of converting compact JSON data into a human-readable format with proper indentation and line breaks."
      },
      {
        question: "Can I minify JSON?",
        answer: "Yes, this tool supports both formatting (beautifying) and minifying JSON data."
      },
      {
        question: "Does it validate JSON syntax?",
        answer: "Yes, the tool automatically validates JSON syntax and shows error messages if the JSON is invalid."
      }
    ],
    useCases: [
      "Format API responses for better readability",
      "Validate JSON configuration files",
      "Minify JSON data to reduce file size",
      "Debug JSON parsing errors"
    ],
    relatedTools: ["json-validator", "base64-encode-decode"]
  },
  {
    slug: "json-validator",
    name: "JSON Validator",
    category: "validator",
    description: "Validate JSON syntax and structure. Get detailed error messages with line numbers for debugging.",
    keywords: ["json", "validator", "validate", "check", "syntax", "error"],
    component: "JsonValidator",
    icon: "CheckCircle",
    faqs: [
      {
        question: "What does JSON validation check?",
        answer: "JSON validation checks if your JSON data follows the correct syntax rules, including proper brackets, quotes, and commas."
      },
      {
        question: "How do I fix JSON errors?",
        answer: "The validator shows the exact line and position of errors, making it easy to locate and fix syntax issues."
      }
    ],
    useCases: [
      "Validate API request/response data",
      "Check configuration file syntax",
      "Debug JSON parsing errors",
      "Ensure data integrity before processing"
    ],
    relatedTools: ["json-formatter", "jwt-decoder"]
  },
  {
    slug: "base64-encode-decode",
    name: "Base64 Encoder/Decoder",
    category: "encoder",
    description: "Encode and decode Base64 strings. Supports UTF-8 encoding for international characters.",
    keywords: ["base64", "encode", "decode", "encoding", "decoding", "utf8"],
    component: "Base64EncodeDecode",
    icon: "Binary",
    faqs: [
      {
        question: "What is Base64 encoding?",
        answer: "Base64 is a binary-to-text encoding scheme that represents binary data in ASCII string format."
      },
      {
        question: "Does it support Chinese characters?",
        answer: "Yes, this tool supports UTF-8 encoding, which handles Chinese and other international characters correctly."
      },
      {
        question: "When should I use Base64?",
        answer: "Base64 is commonly used for encoding binary data in URLs, emails, and JSON where binary data isn't supported."
      }
    ],
    useCases: [
      "Encode images for data URLs",
      "Encode credentials for HTTP Basic Auth",
      "Decode Base64-encoded API responses",
      "Convert binary data for JSON transmission"
    ],
    relatedTools: ["url-encode-decode", "jwt-decoder"]
  },
  {
    slug: "url-encode-decode",
    name: "URL Encoder/Decoder",
    category: "encoder",
    description: "Encode and decode URL parameters and query strings. Handle special characters safely.",
    keywords: ["url", "encode", "decode", "uri", "query string", "percent encoding"],
    component: "UrlEncodeDecode",
    icon: "Link",
    faqs: [
      {
        question: "What is URL encoding?",
        answer: "URL encoding converts special characters into a format that can be safely transmitted over the internet in URLs."
      },
      {
        question: "Which characters need encoding?",
        answer: "Special characters like spaces, &, =, ?, #, and non-ASCII characters need to be encoded in URLs."
      }
    ],
    useCases: [
      "Encode query parameters for API calls",
      "Decode URL parameters from browser",
      "Handle special characters in URLs",
      "Build safe redirect URLs"
    ],
    relatedTools: ["base64-encode-decode", "jwt-decoder"]
  },
  {
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    category: "converter",
    description: "Convert between Unix timestamps and human-readable dates. Supports both seconds and milliseconds.",
    keywords: ["timestamp", "unix", "epoch", "date", "time", "converter"],
    component: "TimestampConverter",
    icon: "Clock",
    faqs: [
      {
        question: "What is a Unix timestamp?",
        answer: "A Unix timestamp is the number of seconds (or milliseconds) since January 1, 1970 00:00:00 UTC."
      },
      {
        question: "Seconds vs milliseconds?",
        answer: "Unix timestamps can be in seconds (10 digits) or milliseconds (13 digits). This tool supports both formats."
      }
    ],
    useCases: [
      "Convert API timestamps to readable dates",
      "Debug time-related issues",
      "Calculate time differences",
      "Generate timestamps for testing"
    ],
    relatedTools: ["uuid-generator", "cron-generator"]
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    category: "generator",
    description: "Generate RFC4122 compliant UUIDs (v4). Support batch generation for multiple UUIDs.",
    keywords: ["uuid", "guid", "unique id", "generator", "random"],
    component: "UuidGenerator",
    icon: "Hash",
    faqs: [
      {
        question: "What is a UUID?",
        answer: "UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information in computer systems."
      },
      {
        question: "Are UUIDs truly unique?",
        answer: "UUID v4 uses random generation with a collision probability so low it's considered practically unique."
      },
      {
        question: "Can I generate multiple UUIDs?",
        answer: "Yes, this tool supports batch generation of multiple UUIDs at once."
      }
    ],
    useCases: [
      "Generate unique IDs for database records",
      "Create unique session identifiers",
      "Generate API keys or tokens",
      "Create unique file names"
    ],
    relatedTools: ["timestamp-converter", "jwt-decoder"]
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    category: "decoder",
    description: "Decode and inspect JWT tokens. View header, payload, and expiration time. Note: Does not verify signatures.",
    keywords: ["jwt", "json web token", "decode", "token", "auth"],
    component: "JwtDecoder",
    icon: "Key",
    faqs: [
      {
        question: "What is JWT?",
        answer: "JWT (JSON Web Token) is a compact, URL-safe means of representing claims to be transferred between two parties."
      },
      {
        question: "Does this tool verify JWT signatures?",
        answer: "No, this tool only decodes and displays JWT contents. It does not verify cryptographic signatures."
      },
      {
        question: "Is it safe to decode JWTs here?",
        answer: "Yes, all decoding happens in your browser. No data is sent to any server."
      }
    ],
    useCases: [
      "Debug authentication issues",
      "Inspect JWT token contents",
      "Check token expiration times",
      "Understand JWT structure"
    ],
    relatedTools: ["base64-encode-decode", "json-formatter"]
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    category: "tester",
    description: "Test regular expressions with real-time matching. Supports all JavaScript regex flags.",
    keywords: ["regex", "regular expression", "pattern", "match", "test"],
    component: "RegexTester",
    icon: "Search",
    faqs: [
      {
        question: "What regex flags are supported?",
        answer: "This tool supports all JavaScript regex flags: g (global), i (case-insensitive), m (multiline), s (dotAll), u (unicode), and y (sticky)."
      },
      {
        question: "Can I test multiple matches?",
        answer: "Yes, use the 'g' (global) flag to find all matches in your text."
      }
    ],
    useCases: [
      "Test regex patterns before using in code",
      "Debug regex matching issues",
      "Learn regular expressions",
      "Validate input patterns"
    ],
    relatedTools: ["json-validator", "sql-formatter"]
  },
  {
    slug: "cron-generator",
    name: "Cron Expression Generator",
    category: "generator",
    description: "Generate cron expressions with a visual interface. Preview execution times and get human-readable descriptions.",
    keywords: ["cron", "schedule", "crontab", "job", "task"],
    component: "CronGenerator",
    icon: "Calendar",
    faqs: [
      {
        question: "What is a cron expression?",
        answer: "A cron expression is a string that defines a schedule for recurring tasks in Unix-like systems."
      },
      {
        question: "What format does this use?",
        answer: "This tool generates standard 5-field cron expressions: minute, hour, day, month, and day of week."
      }
    ],
    useCases: [
      "Schedule automated tasks",
      "Configure CI/CD pipelines",
      "Set up backup schedules",
      "Plan recurring jobs"
    ],
    relatedTools: ["timestamp-converter", "uuid-generator"]
  },
  {
    slug: "markdown-preview",
    name: "Markdown Preview",
    category: "formatter",
    description: "Write and preview Markdown in real-time. Supports GitHub Flavored Markdown and syntax highlighting.",
    keywords: ["markdown", "preview", "editor", "gfm", "github"],
    component: "MarkdownPreview",
    icon: "FileText",
    faqs: [
      {
        question: "What is Markdown?",
        answer: "Markdown is a lightweight markup language for creating formatted text using a plain-text editor."
      },
      {
        question: "Does it support GitHub Flavored Markdown?",
        answer: "Yes, this tool supports GFM including tables, task lists, and strikethrough."
      },
      {
        question: "Can I see code syntax highlighting?",
        answer: "Yes, code blocks support syntax highlighting for many programming languages."
      }
    ],
    useCases: [
      "Write README files",
      "Preview documentation",
      "Draft blog posts",
      "Create formatted notes"
    ],
    relatedTools: ["json-formatter", "sql-formatter"]
  },
  {
    slug: "sql-formatter",
    name: "SQL Formatter",
    category: "formatter",
    description: "Format and beautify SQL queries. Supports multiple SQL dialects and customizable formatting options.",
    keywords: ["sql", "formatter", "query", "database", "beautify"],
    component: "SqlFormatter",
    icon: "Database",
    faqs: [
      {
        question: "Which SQL dialects are supported?",
        answer: "This tool supports standard SQL, MySQL, PostgreSQL, SQL Server, and more."
      },
      {
        question: "Can I customize formatting?",
        answer: "Yes, you can adjust indentation, keyword case, and line breaks."
      }
    ],
    useCases: [
      "Format complex SQL queries",
      "Improve query readability",
      "Standardize SQL code style",
      "Debug SQL syntax"
    ],
    relatedTools: ["json-formatter", "markdown-preview"]
  }
];

export const getToolBySlug = (slug: string): Tool | undefined => {
  return tools.find(tool => tool.slug === slug);
};

export const getToolsByCategory = (category: string): Tool[] => {
  return tools.filter(tool => tool.category === category);
};

export const searchTools = (query: string): Tool[] => {
  const lowerQuery = query.toLowerCase();
  return tools.filter(tool =>
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
  );
};
