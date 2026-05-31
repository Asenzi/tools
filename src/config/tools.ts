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
}

export interface Tool {
  slug: string;
  category: string;
  keywords: Record<Locale, string[]>;
  component: string;
  icon: string;
  relatedTools: string[];
  content: Record<Locale, LocalizedContent>;
}

export const tools: Tool[] = [
  {
    slug: "json-formatter",
    category: "formatter",
    keywords: {
      en: ["json", "formatter", "beautify", "minify", "validate", "pretty print"],
      zh: ["json", "格式化", "美化", "压缩", "验证", "格式化工具"],
    },
    component: "JsonFormatter",
    icon: "Braces",
    relatedTools: ["json-validator", "base64-encode-decode"],
    content: {
      en: {
        name: "JSON Formatter",
        description: "Format, validate and beautify JSON data with syntax highlighting. Supports minification and error detection.",
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
      },
      zh: {
        name: "JSON 格式化工具",
        description: "格式化、验证和美化 JSON 数据，支持语法高亮、压缩和错误检测。",
        faqs: [
          {
            question: "什么是 JSON 格式化？",
            answer: "JSON 格式化是将紧凑的 JSON 数据转换为具有适当缩进和换行的人类可读格式的过程。"
          },
          {
            question: "可以压缩 JSON 吗？",
            answer: "是的，此工具支持格式化（美化）和压缩 JSON 数据。"
          },
          {
            question: "它会验证 JSON 语法吗？",
            answer: "是的，该工具会自动验证 JSON 语法，如果 JSON 无效会显示错误消息。"
          }
        ],
        useCases: [
          "格式化 API 响应以提高可读性",
          "验证 JSON 配置文件",
          "压缩 JSON 数据以减小文件大小",
          "调试 JSON 解析错误"
        ],
      },
    },
  },
  {
    slug: "json-validator",
    category: "validator",
    keywords: {
      en: ["json", "validator", "validate", "check", "syntax", "error"],
      zh: ["json", "验证", "检查", "语法", "错误"],
    },
    component: "JsonValidator",
    icon: "CheckCircle",
    relatedTools: ["json-formatter", "jwt-decoder"],
    content: {
      en: {
        name: "JSON Validator",
        description: "Validate JSON syntax and structure. Get detailed error messages with line numbers for debugging.",
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
      },
      zh: {
        name: "JSON 验证工具",
        description: "验证 JSON 语法和结构。获取带有行号的详细错误消息以便调试。",
        faqs: [
          {
            question: "JSON 验证检查什么？",
            answer: "JSON 验证检查您的 JSON 数据是否遵循正确的语法规则，包括正确的括号、引号和逗号。"
          },
          {
            question: "如何修复 JSON 错误？",
            answer: "验证器会显示错误的确切行和位置，便于定位和修复语法问题。"
          }
        ],
        useCases: [
          "验证 API 请求/响应数据",
          "检查配置文件语法",
          "调试 JSON 解析错误",
          "在处理前确保数据完整性"
        ],
      },
    },
  },
  // Add more tools with similar structure...
  // For brevity, I'll add a few more key tools
  {
    slug: "base64-encode-decode",
    category: "encoder",
    keywords: {
      en: ["base64", "encode", "decode", "encoding", "decoding", "utf8"],
      zh: ["base64", "编码", "解码", "utf8"],
    },
    component: "Base64EncodeDecode",
    icon: "Binary",
    relatedTools: ["url-encode-decode", "jwt-decoder"],
    content: {
      en: {
        name: "Base64 Encoder/Decoder",
        description: "Encode and decode Base64 strings. Supports UTF-8 encoding for international characters.",
        faqs: [
          {
            question: "What is Base64 encoding?",
            answer: "Base64 is a binary-to-text encoding scheme that represents binary data in ASCII string format."
          },
          {
            question: "Does it support Chinese characters?",
            answer: "Yes, this tool supports UTF-8 encoding, which handles Chinese and other international characters correctly."
          }
        ],
        useCases: [
          "Encode images for data URLs",
          "Encode credentials for HTTP Basic Auth",
          "Decode Base64-encoded API responses",
          "Convert binary data for JSON transmission"
        ],
      },
      zh: {
        name: "Base64 编码/解码工具",
        description: "编码和解码 Base64 字符串。支持 UTF-8 编码以处理国际字符。",
        faqs: [
          {
            question: "什么是 Base64 编码？",
            answer: "Base64 是一种二进制到文本的编码方案，以 ASCII 字符串格式表示二进制数据。"
          },
          {
            question: "支持中文字符吗？",
            answer: "是的，此工具支持 UTF-8 编码，可以正确处理中文和其他国际字符。"
          }
        ],
        useCases: [
          "为数据 URL 编码图像",
          "为 HTTP 基本认证编码凭据",
          "解码 Base64 编码的 API 响应",
          "转换二进制数据用于 JSON 传输"
        ],
      },
    },
  },
  {
    slug: "uuid-generator",
    category: "generator",
    keywords: {
      en: ["uuid", "guid", "unique id", "generator", "random"],
      zh: ["uuid", "guid", "唯一标识", "生成器", "随机"],
    },
    component: "UuidGenerator",
    icon: "Hash",
    relatedTools: ["timestamp-converter", "jwt-decoder"],
    content: {
      en: {
        name: "UUID Generator",
        description: "Generate RFC4122 compliant UUIDs (v4). Support batch generation for multiple UUIDs.",
        faqs: [
          {
            question: "What is a UUID?",
            answer: "UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information in computer systems."
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
      },
      zh: {
        name: "UUID 生成器",
        description: "生成符合 RFC4122 标准的 UUID (v4)。支持批量生成多个 UUID。",
        faqs: [
          {
            question: "什么是 UUID？",
            answer: "UUID（通用唯一标识符）是一个 128 位数字，用于在计算机系统中唯一标识信息。"
          },
          {
            question: "可以生成多个 UUID 吗？",
            answer: "是的，此工具支持一次批量生成多个 UUID。"
          }
        ],
        useCases: [
          "为数据库记录生成唯一 ID",
          "创建唯一的会话标识符",
          "生成 API 密钥或令牌",
          "创建唯一的文件名"
        ],
      },
    },
  },
  {
    slug: "url-encode-decode",
    category: "encoder",
    keywords: {
      en: ["url", "encode", "decode", "uri", "query string", "percent encoding"],
      zh: ["url", "编码", "解码", "uri", "查询字符串", "百分号编码"],
    },
    component: "UrlEncodeDecode",
    icon: "Link",
    relatedTools: ["base64-encode-decode", "html-encode-decode"],
    content: {
      en: {
        name: "URL Encoder/Decoder",
        description: "Encode and decode URL parameters and query strings. Handle special characters safely.",
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
      },
      zh: {
        name: "URL 编码/解码工具",
        description: "编码和解码 URL 参数和查询字符串。安全处理特殊字符。",
        faqs: [
          {
            question: "什么是 URL 编码？",
            answer: "URL 编码将特殊字符转换为可以在 URL 中安全传输的格式。"
          },
          {
            question: "哪些字符需要编码？",
            answer: "空格、&、=、?、# 等特殊字符以及非 ASCII 字符需要在 URL 中编码。"
          }
        ],
        useCases: [
          "为 API 调用编码查询参数",
          "从浏览器解码 URL 参数",
          "处理 URL 中的特殊字符",
          "构建安全的重定向 URL"
        ],
      },
    },
  },
  {
    slug: "html-encode-decode",
    category: "encoder",
    keywords: {
      en: ["html", "encode", "decode", "entities", "escape", "unescape"],
      zh: ["html", "编码", "解码", "实体", "转义", "反转义"],
    },
    component: "HtmlEncodeDecode",
    icon: "Code",
    relatedTools: ["url-encode-decode", "unicode-encode-decode"],
    content: {
      en: {
        name: "HTML Encoder/Decoder",
        description: "Encode and decode HTML entities. Convert special characters to HTML entities and vice versa.",
        faqs: [
          {
            question: "What is HTML encoding?",
            answer: "HTML encoding converts special characters like <, >, &, and quotes into HTML entities (&lt;, &gt;, &amp;, etc.) to display them safely in HTML."
          },
          {
            question: "When should I use HTML encoding?",
            answer: "Use HTML encoding when displaying user input or special characters in HTML to prevent XSS attacks and rendering issues."
          }
        ],
        useCases: [
          "Prevent XSS attacks in web applications",
          "Display code snippets in HTML",
          "Encode special characters for HTML attributes",
          "Decode HTML entities from scraped content"
        ],
      },
      zh: {
        name: "HTML 编码/解码工具",
        description: "编码和解码 HTML 实体。将特殊字符转换为 HTML 实体，反之亦然。",
        faqs: [
          {
            question: "什么是 HTML 编码？",
            answer: "HTML 编码将特殊字符如 <、>、& 和引号转换为 HTML 实体（&lt;、&gt;、&amp; 等），以便在 HTML 中安全显示。"
          },
          {
            question: "什么时候应该使用 HTML 编码？",
            answer: "在 HTML 中显示用户输入或特殊字符时使用 HTML 编码，以防止 XSS 攻击和渲染问题。"
          }
        ],
        useCases: [
          "防止 Web 应用程序中的 XSS 攻击",
          "在 HTML 中显示代码片段",
          "为 HTML 属性编码特殊字符",
          "从抓取的内容中解码 HTML 实体"
        ],
      },
    },
  },
  {
    slug: "unicode-encode-decode",
    category: "encoder",
    keywords: {
      en: ["unicode", "encode", "decode", "utf8", "escape", "unescape"],
      zh: ["unicode", "编码", "解码", "utf8", "转义", "反转义"],
    },
    component: "UnicodeEncodeDecode",
    icon: "Globe",
    relatedTools: ["html-encode-decode", "base64-encode-decode"],
    content: {
      en: {
        name: "Unicode Encoder/Decoder",
        description: "Encode and decode Unicode escape sequences. Convert text to \\uXXXX format and vice versa.",
        faqs: [
          {
            question: "What is Unicode encoding?",
            answer: "Unicode encoding converts characters to their Unicode escape sequences (\\uXXXX format), commonly used in JavaScript and JSON."
          },
          {
            question: "Does it support all languages?",
            answer: "Yes, Unicode supports all languages and characters, including Chinese, Japanese, Arabic, and emoji."
          }
        ],
        useCases: [
          "Encode non-ASCII characters for JavaScript",
          "Decode Unicode escape sequences in JSON",
          "Handle international characters in code",
          "Debug Unicode-related issues"
        ],
      },
      zh: {
        name: "Unicode 编码/解码工具",
        description: "编码和解码 Unicode 转义序列。将文本转换为 \\uXXXX 格式，反之亦然。",
        faqs: [
          {
            question: "什么是 Unicode 编码？",
            answer: "Unicode 编码将字符转换为 Unicode 转义序列（\\uXXXX 格式），常用于 JavaScript 和 JSON。"
          },
          {
            question: "支持所有语言吗？",
            answer: "是的，Unicode 支持所有语言和字符，包括中文、日文、阿拉伯文和表情符号。"
          }
        ],
        useCases: [
          "为 JavaScript 编码非 ASCII 字符",
          "解码 JSON 中的 Unicode 转义序列",
          "在代码中处理国际字符",
          "调试 Unicode 相关问题"
        ],
      },
    },
  },
  {
    slug: "hash-generator",
    category: "generator",
    keywords: {
      en: ["hash", "md5", "sha", "sha256", "sha512", "checksum", "digest"],
      zh: ["哈希", "md5", "sha", "sha256", "sha512", "校验和", "摘要"],
    },
    component: "HashGenerator",
    icon: "Shield",
    relatedTools: ["base64-encode-decode", "jwt-decoder"],
    content: {
      en: {
        name: "Hash Generator",
        description: "Generate cryptographic hashes using various algorithms. Supports SHA-1, SHA-256, SHA-384, and SHA-512.",
        faqs: [
          {
            question: "What is a hash function?",
            answer: "A hash function converts input data into a fixed-size string of characters, which is typically a digest that is unique to each unique input."
          },
          {
            question: "Which algorithm should I use?",
            answer: "For security purposes, use SHA-256 or higher. MD5 and SHA-1 are considered weak and should be avoided for security-critical applications."
          },
          {
            question: "Can I reverse a hash?",
            answer: "No, hash functions are one-way. You cannot reverse a hash to get the original input."
          }
        ],
        useCases: [
          "Generate password hashes",
          "Verify file integrity",
          "Create checksums for data validation",
          "Generate unique identifiers"
        ],
      },
      zh: {
        name: "哈希生成器",
        description: "使用各种算法生成加密哈希。支持 SHA-1、SHA-256、SHA-384 和 SHA-512。",
        faqs: [
          {
            question: "什么是哈希函数？",
            answer: "哈希函数将输入数据转换为固定大小的字符串，通常是每个唯一输入的唯一摘要。"
          },
          {
            question: "应该使用哪种算法？",
            answer: "出于安全目的，请使用 SHA-256 或更高版本。MD5 和 SHA-1 被认为较弱，应避免用于安全关键应用程序。"
          },
          {
            question: "可以反转哈希吗？",
            answer: "不可以，哈希函数是单向的。您无法反转哈希以获取原始输入。"
          }
        ],
        useCases: [
          "生成密码哈希",
          "验证文件完整性",
          "创建数据验证的校验和",
          "生成唯一标识符"
        ],
      },
    },
  },
  {
    slug: "timestamp-converter",
    category: "converter",
    keywords: {
      en: ["timestamp", "unix", "epoch", "date", "time", "converter"],
      zh: ["时间戳", "unix", "纪元", "日期", "时间", "转换器"],
    },
    component: "TimestampConverter",
    icon: "Clock",
    relatedTools: ["uuid-generator", "cron-generator"],
    content: {
      en: {
        name: "Timestamp Converter",
        description: "Convert between Unix timestamps and human-readable dates. Supports both seconds and milliseconds.",
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
      },
      zh: {
        name: "时间戳转换器",
        description: "在 Unix 时间戳和人类可读日期之间转换。支持秒和毫秒。",
        faqs: [
          {
            question: "什么是 Unix 时间戳？",
            answer: "Unix 时间戳是自 1970 年 1 月 1 日 00:00:00 UTC 以来的秒数（或毫秒数）。"
          },
          {
            question: "秒和毫秒的区别？",
            answer: "Unix 时间戳可以是秒（10位数字）或毫秒（13位数字）。此工具支持两种格式。"
          }
        ],
        useCases: [
          "将 API 时间戳转换为可读日期",
          "调试时间相关问题",
          "计算时间差",
          "为测试生成时间戳"
        ],
      },
    },
  },
  {
    slug: "jwt-decoder",
    category: "decoder",
    keywords: {
      en: ["jwt", "json web token", "decode", "token", "auth"],
      zh: ["jwt", "json web token", "解码", "令牌", "认证"],
    },
    component: "JwtDecoder",
    icon: "Key",
    relatedTools: ["base64-encode-decode", "json-formatter"],
    content: {
      en: {
        name: "JWT Decoder",
        description: "Decode and inspect JWT tokens. View header, payload, and expiration time. Note: Does not verify signatures.",
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
      },
      zh: {
        name: "JWT 解码器",
        description: "解码和检查 JWT 令牌。查看头部、载荷和过期时间。注意：不验证签名。",
        faqs: [
          {
            question: "什么是 JWT？",
            answer: "JWT（JSON Web Token）是一种紧凑的、URL 安全的方式，用于表示要在两方之间传输的声明。"
          },
          {
            question: "此工具会验证 JWT 签名吗？",
            answer: "不会，此工具仅解码和显示 JWT 内容。它不验证加密签名。"
          },
          {
            question: "在这里解码 JWT 安全吗？",
            answer: "是的，所有解码都在浏览器中进行。不会向任何服务器发送数据。"
          }
        ],
        useCases: [
          "调试身份验证问题",
          "检查 JWT 令牌内容",
          "查看令牌过期时间",
          "理解 JWT 结构"
        ],
      },
    },
  },
  {
    slug: "regex-tester",
    category: "tester",
    keywords: {
      en: ["regex", "regular expression", "pattern", "match", "test"],
      zh: ["正则", "正则表达式", "模式", "匹配", "测试"],
    },
    component: "RegexTester",
    icon: "Search",
    relatedTools: ["json-validator", "sql-formatter"],
    content: {
      en: {
        name: "Regex Tester",
        description: "Test regular expressions with real-time matching. Supports all JavaScript regex flags.",
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
      },
      zh: {
        name: "正则表达式测试器",
        description: "实时测试正则表达式匹配。支持所有 JavaScript 正则标志。",
        faqs: [
          {
            question: "支持哪些正则标志？",
            answer: "此工具支持所有 JavaScript 正则标志：g（全局）、i（不区分大小写）、m（多行）、s（dotAll）、u（unicode）和 y（粘性）。"
          },
          {
            question: "可以测试多个匹配吗？",
            answer: "是的，使用 'g'（全局）标志可以找到文本中的所有匹配。"
          }
        ],
        useCases: [
          "在代码中使用前测试正则模式",
          "调试正则匹配问题",
          "学习正则表达式",
          "验证输入模式"
        ],
      },
    },
  },
  {
    slug: "cron-generator",
    category: "generator",
    keywords: {
      en: ["cron", "schedule", "crontab", "job", "task"],
      zh: ["cron", "定时", "计划任务", "任务", "调度"],
    },
    component: "CronGenerator",
    icon: "Calendar",
    relatedTools: ["timestamp-converter", "uuid-generator"],
    content: {
      en: {
        name: "Cron Expression Generator",
        description: "Generate cron expressions with a visual interface. Preview execution times and get human-readable descriptions.",
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
      },
      zh: {
        name: "Cron 表达式生成器",
        description: "使用可视化界面生成 cron 表达式。预览执行时间并获取人类可读的描述。",
        faqs: [
          {
            question: "什么是 cron 表达式？",
            answer: "Cron 表达式是一个字符串，用于定义 Unix 类系统中重复任务的计划。"
          },
          {
            question: "使用什么格式？",
            answer: "此工具生成标准的 5 字段 cron 表达式：分钟、小时、日期、月份和星期。"
          }
        ],
        useCases: [
          "安排自动化任务",
          "配置 CI/CD 管道",
          "设置备份计划",
          "规划重复任务"
        ],
      },
    },
  },
  {
    slug: "markdown-preview",
    category: "formatter",
    keywords: {
      en: ["markdown", "preview", "editor", "gfm", "github"],
      zh: ["markdown", "预览", "编辑器", "gfm", "github"],
    },
    component: "MarkdownPreview",
    icon: "FileText",
    relatedTools: ["json-formatter", "sql-formatter"],
    content: {
      en: {
        name: "Markdown Preview",
        description: "Write and preview Markdown in real-time. Supports GitHub Flavored Markdown and syntax highlighting.",
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
      },
      zh: {
        name: "Markdown 预览器",
        description: "实时编写和预览 Markdown。支持 GitHub 风格的 Markdown 和语法高亮。",
        faqs: [
          {
            question: "什么是 Markdown？",
            answer: "Markdown 是一种轻量级标记语言，用于使用纯文本编辑器创建格式化文本。"
          },
          {
            question: "支持 GitHub 风格的 Markdown 吗？",
            answer: "是的，此工具支持 GFM，包括表格、任务列表和删除线。"
          },
          {
            question: "可以看到代码语法高亮吗？",
            answer: "是的，代码块支持多种编程语言的语法高亮。"
          }
        ],
        useCases: [
          "编写 README 文件",
          "预览文档",
          "起草博客文章",
          "创建格式化笔记"
        ],
      },
    },
  },
  {
    slug: "sql-formatter",
    category: "formatter",
    keywords: {
      en: ["sql", "formatter", "query", "database", "beautify"],
      zh: ["sql", "格式化", "查询", "数据库", "美化"],
    },
    component: "SqlFormatter",
    icon: "Database",
    relatedTools: ["json-formatter", "markdown-preview"],
    content: {
      en: {
        name: "SQL Formatter",
        description: "Format and beautify SQL queries. Supports multiple SQL dialects and customizable formatting options.",
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
      },
      zh: {
        name: "SQL 格式化工具",
        description: "格式化和美化 SQL 查询。支持多种 SQL 方言和可自定义的格式化选项。",
        faqs: [
          {
            question: "支持哪些 SQL 方言？",
            answer: "此工具支持标准 SQL、MySQL、PostgreSQL、SQL Server 等。"
          },
          {
            question: "可以自定义格式化吗？",
            answer: "是的，您可以调整缩进、关键字大小写和换行。"
          }
        ],
        useCases: [
          "格式化复杂的 SQL 查询",
          "提高查询可读性",
          "标准化 SQL 代码风格",
          "调试 SQL 语法"
        ],
      },
    },
  },
  {
    slug: "json-escape",
    category: "formatter",
    keywords: {
      en: ["json", "escape", "unescape", "string", "quotes"],
      zh: ["json", "转义", "反转义", "字符串", "引号"],
    },
    component: "JsonEscape",
    icon: "Quote",
    relatedTools: ["json-formatter", "json-validator"],
    content: {
      en: {
        name: "JSON Escape/Unescape",
        description: "Escape or unescape JSON strings for safe embedding in code or databases.",
        faqs: [
          {
            question: "What is JSON escaping?",
            answer: "JSON escaping converts special characters (quotes, backslashes, newlines) into escape sequences so they can be safely embedded in strings."
          },
          {
            question: "When do I need to escape JSON?",
            answer: "When embedding JSON in JavaScript code, HTML attributes, or database queries where quotes need to be escaped."
          }
        ],
        useCases: [
          "Embed JSON in JavaScript strings",
          "Store JSON in database fields",
          "Include JSON in HTML attributes",
          "Prepare JSON for API requests"
        ],
      },
      zh: {
        name: "JSON 转义/反转义",
        description: "转义或反转义 JSON 字符串，以便安全地嵌入代码或数据库。",
        faqs: [
          {
            question: "什么是 JSON 转义？",
            answer: "JSON 转义将特殊字符（引号、反斜杠、换行符）转换为转义序列，以便可以安全地嵌入字符串中。"
          },
          {
            question: "什么时候需要转义 JSON？",
            answer: "在 JavaScript 代码、HTML 属性或数据库查询中嵌入 JSON 时，需要转义引号。"
          }
        ],
        useCases: [
          "在 JavaScript 字符串中嵌入 JSON",
          "在数据库字段中存储 JSON",
          "在 HTML 属性中包含 JSON",
          "为 API 请求准备 JSON"
        ],
      },
    },
  },
  {
    slug: "json-compare",
    category: "validator",
    keywords: {
      en: ["json", "compare", "diff", "difference", "merge"],
      zh: ["json", "比较", "差异", "对比", "合并"],
    },
    component: "JsonCompare",
    icon: "GitCompare",
    relatedTools: ["json-formatter", "json-validator"],
    content: {
      en: {
        name: "JSON Compare",
        description: "Compare two JSON objects and highlight differences. Find added, removed, and modified fields.",
        faqs: [
          {
            question: "How does JSON comparison work?",
            answer: "The tool compares two JSON objects field by field and highlights additions, deletions, and modifications."
          },
          {
            question: "Can it handle nested objects?",
            answer: "Yes, the tool recursively compares nested objects and arrays."
          }
        ],
        useCases: [
          "Compare API responses",
          "Detect configuration changes",
          "Review data migrations",
          "Debug JSON differences"
        ],
      },
      zh: {
        name: "JSON 比较工具",
        description: "比较两个 JSON 对象并突出显示差异。查找添加、删除和修改的字段。",
        faqs: [
          {
            question: "JSON 比较如何工作？",
            answer: "该工具逐字段比较两个 JSON 对象，并突出显示添加、删除和修改。"
          },
          {
            question: "可以处理嵌套对象吗？",
            answer: "是的，该工具递归比较嵌套对象和数组。"
          }
        ],
        useCases: [
          "比较 API 响应",
          "检测配置更改",
          "审查数据迁移",
          "调试 JSON 差异"
        ],
      },
    },
  },
  {
    slug: "json-to-csv",
    category: "converter",
    keywords: {
      en: ["json", "csv", "convert", "export", "spreadsheet"],
      zh: ["json", "csv", "转换", "导出", "电子表格"],
    },
    component: "JsonToCsv",
    icon: "FileSpreadsheet",
    relatedTools: ["json-formatter", "json-to-xml"],
    content: {
      en: {
        name: "JSON to CSV Converter",
        description: "Convert JSON data to CSV format for Excel and spreadsheet applications.",
        faqs: [
          {
            question: "What JSON format is supported?",
            answer: "The tool works best with JSON arrays of objects where each object has the same structure."
          },
          {
            question: "Can I download the CSV file?",
            answer: "Yes, you can copy the CSV output or download it as a file."
          }
        ],
        useCases: [
          "Export JSON data to Excel",
          "Create CSV reports from API data",
          "Convert JSON logs to spreadsheets",
          "Prepare data for analysis"
        ],
      },
      zh: {
        name: "JSON 转 CSV 工具",
        description: "将 JSON 数据转换为 CSV 格式，用于 Excel 和电子表格应用程序。",
        faqs: [
          {
            question: "支持什么 JSON 格式？",
            answer: "该工具最适合 JSON 对象数组，其中每个对象具有相同的结构。"
          },
          {
            question: "可以下载 CSV 文件吗？",
            answer: "是的，您可以复制 CSV 输出或将其下载为文件。"
          }
        ],
        useCases: [
          "将 JSON 数据导出到 Excel",
          "从 API 数据创建 CSV 报告",
          "将 JSON 日志转换为电子表格",
          "准备数据进行分析"
        ],
      },
    },
  },
  {
    slug: "json-to-xml",
    category: "converter",
    keywords: {
      en: ["json", "xml", "convert", "transform"],
      zh: ["json", "xml", "转换", "转化"],
    },
    component: "JsonToXml",
    icon: "FileCode",
    relatedTools: ["json-formatter", "json-to-yaml"],
    content: {
      en: {
        name: "JSON to XML Converter",
        description: "Convert JSON data to XML format. Supports nested objects and arrays.",
        faqs: [
          {
            question: "How are JSON arrays converted?",
            answer: "Arrays are converted to repeated XML elements with the same tag name."
          },
          {
            question: "Can I customize the root element?",
            answer: "Yes, you can specify a custom root element name for the XML output."
          }
        ],
        useCases: [
          "Convert JSON to XML for legacy systems",
          "Generate XML configuration files",
          "Transform API responses to XML",
          "Prepare data for XML-based tools"
        ],
      },
      zh: {
        name: "JSON 转 XML 工具",
        description: "将 JSON 数据转换为 XML 格式。支持嵌套对象和数组。",
        faqs: [
          {
            question: "JSON 数组如何转换？",
            answer: "数组转换为具有相同标签名称的重复 XML 元素。"
          },
          {
            question: "可以自定义根元素吗？",
            answer: "是的，您可以为 XML 输出指定自定义根元素名称。"
          }
        ],
        useCases: [
          "为旧系统将 JSON 转换为 XML",
          "生成 XML 配置文件",
          "将 API 响应转换为 XML",
          "为基于 XML 的工具准备数据"
        ],
      },
    },
  },
  {
    slug: "json-to-yaml",
    category: "converter",
    keywords: {
      en: ["json", "yaml", "yml", "convert", "transform"],
      zh: ["json", "yaml", "yml", "转换", "转化"],
    },
    component: "JsonToYaml",
    icon: "FileJson",
    relatedTools: ["json-formatter", "json-to-xml"],
    content: {
      en: {
        name: "JSON to YAML Converter",
        description: "Convert JSON data to YAML format. Perfect for configuration files and Kubernetes manifests.",
        faqs: [
          {
            question: "What is YAML?",
            answer: "YAML is a human-readable data serialization format commonly used for configuration files."
          },
          {
            question: "Is the conversion reversible?",
            answer: "Yes, YAML can be converted back to JSON without data loss."
          }
        ],
        useCases: [
          "Create Kubernetes configuration files",
          "Generate Docker Compose files",
          "Convert JSON config to YAML",
          "Prepare data for CI/CD pipelines"
        ],
      },
      zh: {
        name: "JSON 转 YAML 工具",
        description: "将 JSON 数据转换为 YAML 格式。非常适合配置文件和 Kubernetes 清单。",
        faqs: [
          {
            question: "什么是 YAML？",
            answer: "YAML 是一种人类可读的数据序列化格式，通常用于配置文件。"
          },
          {
            question: "转换可逆吗？",
            answer: "是的，YAML 可以无损地转换回 JSON。"
          }
        ],
        useCases: [
          "创建 Kubernetes 配置文件",
          "生成 Docker Compose 文件",
          "将 JSON 配置转换为 YAML",
          "为 CI/CD 管道准备数据"
        ],
      },
    },
  },
  {
    slug: "json-viewer",
    category: "formatter",
    keywords: {
      en: ["json", "viewer", "tree", "explorer", "visualize"],
      zh: ["json", "查看器", "树形", "浏览器", "可视化"],
    },
    component: "JsonViewer",
    icon: "Eye",
    relatedTools: ["json-formatter", "json-validator"],
    content: {
      en: {
        name: "JSON Viewer",
        description: "Visualize JSON data in an interactive tree view. Expand and collapse nested structures.",
        faqs: [
          {
            question: "What is a JSON tree view?",
            answer: "A tree view displays JSON data hierarchically, allowing you to expand and collapse nested objects and arrays."
          },
          {
            question: "Can I search within the JSON?",
            answer: "Yes, you can search for keys and values within the JSON structure."
          }
        ],
        useCases: [
          "Explore complex JSON structures",
          "Debug nested API responses",
          "Visualize configuration files",
          "Understand JSON data hierarchy"
        ],
      },
      zh: {
        name: "JSON 查看器",
        description: "在交互式树形视图中可视化 JSON 数据。展开和折叠嵌套结构。",
        faqs: [
          {
            question: "什么是 JSON 树形视图？",
            answer: "树形视图以层次结构显示 JSON 数据，允许您展开和折叠嵌套对象和数组。"
          },
          {
            question: "可以在 JSON 中搜索吗？",
            answer: "是的，您可以在 JSON 结构中搜索键和值。"
          }
        ],
        useCases: [
          "探索复杂的 JSON 结构",
          "调试嵌套的 API 响应",
          "可视化配置文件",
          "理解 JSON 数据层次结构"
        ],
      },
    },
  },
  {
    slug: "age-calculator",
    category: "calculator",
    keywords: {
      en: ["age", "calculator", "birthday", "date", "years"],
      zh: ["年龄", "计算器", "生日", "日期", "岁数"],
    },
    component: "AgeCalculator",
    icon: "Calendar",
    relatedTools: ["date-difference-calculator", "timestamp-converter"],
    content: {
      en: {
        name: "Age Calculator",
        description: "Calculate age from birth date. Get detailed breakdown in years, months, and days.",
        faqs: [
          {
            question: "How is age calculated?",
            answer: "Age is calculated by finding the difference between the birth date and the target date, accounting for leap years and varying month lengths."
          },
          {
            question: "Can I calculate age on a specific date?",
            answer: "Yes, you can specify any target date to calculate age on that particular day."
          }
        ],
        useCases: [
          "Calculate current age",
          "Determine age on a specific date",
          "Calculate age for forms and applications",
          "Track milestones and anniversaries"
        ],
      },
      zh: {
        name: "年龄计算器",
        description: "根据出生日期计算年龄。获取年、月、日的详细分解。",
        faqs: [
          {
            question: "年龄如何计算？",
            answer: "年龄通过计算出生日期和目标日期之间的差异来计算，考虑闰年和不同月份的长度。"
          },
          {
            question: "可以计算特定日期的年龄吗？",
            answer: "是的，您可以指定任何目标日期来计算该特定日期的年龄。"
          }
        ],
        useCases: [
          "计算当前年龄",
          "确定特定日期的年龄",
          "为表单和应用程序计算年龄",
          "跟踪里程碑和周年纪念"
        ],
      },
    },
  },
  {
    slug: "date-difference-calculator",
    category: "calculator",
    keywords: {
      en: ["date", "difference", "calculator", "days", "between"],
      zh: ["日期", "差异", "计算器", "天数", "之间"],
    },
    component: "DateDifferenceCalculator",
    icon: "Calendar",
    relatedTools: ["age-calculator", "timestamp-converter"],
    content: {
      en: {
        name: "Date Difference Calculator",
        description: "Calculate the difference between two dates in years, months, days, hours, minutes, and seconds.",
        faqs: [
          {
            question: "What units are supported?",
            answer: "The calculator shows the difference in years, months, days, total days, hours, minutes, and seconds."
          },
          {
            question: "Does it account for time zones?",
            answer: "The calculator uses the dates as entered without time zone conversion."
          }
        ],
        useCases: [
          "Calculate project duration",
          "Find days until an event",
          "Calculate time between milestones",
          "Determine contract or subscription length"
        ],
      },
      zh: {
        name: "日期差异计算器",
        description: "计算两个日期之间的差异，以年、月、日、小时、分钟和秒为单位。",
        faqs: [
          {
            question: "支持哪些单位？",
            answer: "计算器显示年、月、日、总天数、小时、分钟和秒的差异。"
          },
          {
            question: "是否考虑时区？",
            answer: "计算器使用输入的日期，不进行时区转换。"
          }
        ],
        useCases: [
          "计算项目持续时间",
          "查找距离事件的天数",
          "计算里程碑之间的时间",
          "确定合同或订阅长度"
        ],
      },
    },
  },
  {
    slug: "time-zone-converter",
    category: "converter",
    keywords: {
      en: ["time", "zone", "converter", "timezone", "utc"],
      zh: ["时区", "转换", "时间", "utc"],
    },
    component: "TimeZoneConverter",
    icon: "Clock",
    relatedTools: ["timestamp-converter", "date-difference-calculator"],
    content: {
      en: {
        name: "Time Zone Converter",
        description: "Convert time between different time zones. Supports major time zones worldwide.",
        faqs: [
          {
            question: "Which time zones are supported?",
            answer: "The tool supports major time zones including UTC, EST, PST, GMT, CET, JST, and many more."
          },
          {
            question: "Does it handle daylight saving time?",
            answer: "Yes, the converter automatically accounts for daylight saving time changes."
          }
        ],
        useCases: [
          "Schedule international meetings",
          "Convert flight times",
          "Coordinate with remote teams",
          "Plan global events"
        ],
      },
      zh: {
        name: "时区转换器",
        description: "在不同时区之间转换时间。支持全球主要时区。",
        faqs: [
          {
            question: "支持哪些时区？",
            answer: "该工具支持主要时区，包括 UTC、EST、PST、GMT、CET、JST 等。"
          },
          {
            question: "是否处理夏令时？",
            answer: "是的，转换器会自动考虑夏令时变化。"
          }
        ],
        useCases: [
          "安排国际会议",
          "转换航班时间",
          "与远程团队协调",
          "规划全球活动"
        ],
      },
    },
  },
  {
    slug: "word-counter",
    category: "text",
    keywords: {
      en: ["word", "counter", "count", "text", "statistics"],
      zh: ["单词", "计数", "统计", "文本"],
    },
    component: "WordCounter",
    icon: "FileText",
    relatedTools: ["character-counter", "text-diff-checker"],
    content: {
      en: {
        name: "Word Counter",
        description: "Count words, characters, sentences, and paragraphs in your text. Real-time statistics.",
        faqs: [
          {
            question: "How are words counted?",
            answer: "Words are counted by splitting text on whitespace. Multiple spaces are treated as a single separator."
          },
          {
            question: "What statistics are provided?",
            answer: "The tool provides word count, character count (with and without spaces), sentences, paragraphs, and lines."
          }
        ],
        useCases: [
          "Check essay or article length",
          "Meet word count requirements",
          "Analyze text statistics",
          "Track writing progress"
        ],
      },
      zh: {
        name: "单词计数器",
        description: "统计文本中的单词、字符、句子和段落。实时统计。",
        faqs: [
          {
            question: "如何计算单词？",
            answer: "通过在空白处分割文本来计算单词。多个空格被视为单个分隔符。"
          },
          {
            question: "提供哪些统计信息？",
            answer: "该工具提供单词数、字符数（包括和不包括空格）、句子、段落和行数。"
          }
        ],
        useCases: [
          "检查文章或论文长度",
          "满足字数要求",
          "分析文本统计",
          "跟踪写作进度"
        ],
      },
    },
  },
  {
    slug: "character-counter",
    category: "text",
    keywords: {
      en: ["character", "counter", "count", "text", "length"],
      zh: ["字符", "计数", "统计", "文本", "长度"],
    },
    component: "CharacterCounter",
    icon: "Type",
    relatedTools: ["word-counter", "case-converter"],
    content: {
      en: {
        name: "Character Counter",
        description: "Count characters in text with detailed breakdown by type. Track letters, digits, spaces, and punctuation.",
        faqs: [
          {
            question: "What character types are counted?",
            answer: "The tool counts total characters, letters, digits, spaces, punctuation, and special characters separately."
          },
          {
            question: "Does it count Unicode characters?",
            answer: "Yes, the tool correctly counts all Unicode characters including emojis and international characters."
          }
        ],
        useCases: [
          "Check text length limits",
          "Analyze character distribution",
          "Validate input length",
          "Count social media post length"
        ],
      },
      zh: {
        name: "字符计数器",
        description: "统计文本中的字符，按类型详细分解。跟踪字母、数字、空格和标点符号。",
        faqs: [
          {
            question: "统计哪些字符类型？",
            answer: "该工具分别统计总字符数、字母、数字、空格、标点符号和特殊字符。"
          },
          {
            question: "是否统计 Unicode 字符？",
            answer: "是的，该工具正确统计所有 Unicode 字符，包括表情符号和国际字符。"
          }
        ],
        useCases: [
          "检查文本长度限制",
          "分析字符分布",
          "验证输入长度",
          "统计社交媒体帖子长度"
        ],
      },
    },
  },
  {
    slug: "case-converter",
    category: "text",
    keywords: {
      en: ["case", "converter", "uppercase", "lowercase", "camel", "snake"],
      zh: ["大小写", "转换", "驼峰", "下划线"],
    },
    component: "CaseConverter",
    icon: "Type",
    relatedTools: ["character-counter", "text-diff-checker"],
    content: {
      en: {
        name: "Case Converter",
        description: "Convert text between different cases: uppercase, lowercase, title case, camelCase, snake_case, and more.",
        faqs: [
          {
            question: "What case formats are supported?",
            answer: "The tool supports uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, and kebab-case."
          },
          {
            question: "Can I convert code variable names?",
            answer: "Yes, the tool is perfect for converting between different programming naming conventions."
          }
        ],
        useCases: [
          "Convert variable naming styles",
          "Format text for different contexts",
          "Standardize text case",
          "Convert between coding conventions"
        ],
      },
      zh: {
        name: "大小写转换器",
        description: "在不同大小写之间转换文本：大写、小写、标题大小写、驼峰命名、下划线命名等。",
        faqs: [
          {
            question: "支持哪些大小写格式？",
            answer: "该工具支持大写、小写、标题大小写、句子大小写、驼峰命名、帕斯卡命名、下划线命名和短横线命名。"
          },
          {
            question: "可以转换代码变量名吗？",
            answer: "是的，该工具非常适合在不同的编程命名约定之间转换。"
          }
        ],
        useCases: [
          "转换变量命名风格",
          "为不同上下文格式化文本",
          "标准化文本大小写",
          "在编码约定之间转换"
        ],
      },
    },
  },
  {
    slug: "remove-duplicate-lines",
    category: "text",
    keywords: {
      en: ["remove", "duplicate", "lines", "unique", "filter"],
      zh: ["删除", "重复", "行", "唯一", "过滤"],
    },
    component: "RemoveDuplicateLines",
    icon: "Filter",
    relatedTools: ["sort-lines", "text-diff-checker"],
    content: {
      en: {
        name: "Remove Duplicate Lines",
        description: "Remove duplicate lines from text. Keep only unique lines and see statistics.",
        faqs: [
          {
            question: "How are duplicates detected?",
            answer: "Lines are compared exactly as they appear. Two lines are considered duplicates if they match character-for-character."
          },
          {
            question: "Is the order preserved?",
            answer: "Yes, the tool preserves the order of first occurrence for each unique line."
          }
        ],
        useCases: [
          "Clean up lists",
          "Remove duplicate entries",
          "Filter unique values",
          "Deduplicate data"
        ],
      },
      zh: {
        name: "删除重复行",
        description: "从文本中删除重复行。仅保留唯一行并查看统计信息。",
        faqs: [
          {
            question: "如何检测重复？",
            answer: "按行的实际显示进行比较。如果两行逐字符匹配，则被视为重复。"
          },
          {
            question: "是否保留顺序？",
            answer: "是的，该工具保留每个唯一行首次出现的顺序。"
          }
        ],
        useCases: [
          "清理列表",
          "删除重复条目",
          "过滤唯一值",
          "去重数据"
        ],
      },
    },
  },
  {
    slug: "sort-lines",
    category: "text",
    keywords: {
      en: ["sort", "lines", "alphabetical", "order", "arrange"],
      zh: ["排序", "行", "字母", "顺序", "整理"],
    },
    component: "SortLines",
    icon: "ArrowUpDown",
    relatedTools: ["remove-duplicate-lines", "case-converter"],
    content: {
      en: {
        name: "Sort Lines",
        description: "Sort text lines alphabetically or by length. Supports ascending, descending, and random order.",
        faqs: [
          {
            question: "What sorting options are available?",
            answer: "You can sort A-Z, Z-A, by length (shortest to longest or longest to shortest), or randomly shuffle lines."
          },
          {
            question: "Is sorting case-sensitive?",
            answer: "The alphabetical sort uses locale-aware comparison which handles case and special characters appropriately."
          }
        ],
        useCases: [
          "Organize lists alphabetically",
          "Sort data entries",
          "Arrange items by length",
          "Randomize list order"
        ],
      },
      zh: {
        name: "行排序",
        description: "按字母顺序或长度对文本行进行排序。支持升序、降序和随机顺序。",
        faqs: [
          {
            question: "有哪些排序选项？",
            answer: "您可以按 A-Z、Z-A、长度（从短到长或从长到短）排序，或随机打乱行。"
          },
          {
            question: "排序是否区分大小写？",
            answer: "字母排序使用区域感知比较，适当处理大小写和特殊字符。"
          }
        ],
        useCases: [
          "按字母顺序组织列表",
          "排序数据条目",
          "按长度排列项目",
          "随机化列表顺序"
        ],
      },
    },
  },
  {
    slug: "text-diff-checker",
    category: "text",
    keywords: {
      en: ["text", "diff", "compare", "difference", "changes"],
      zh: ["文本", "差异", "比较", "对比", "变化"],
    },
    component: "TextDiffChecker",
    icon: "GitCompare",
    relatedTools: ["word-counter", "remove-duplicate-lines"],
    content: {
      en: {
        name: "Text Diff Checker",
        description: "Compare two texts and highlight differences. See added, removed, and unchanged lines.",
        faqs: [
          {
            question: "How are differences displayed?",
            answer: "Added lines are highlighted in green, removed lines in red, and unchanged lines in gray."
          },
          {
            question: "Can it compare code?",
            answer: "Yes, the tool works well for comparing code, configuration files, or any text content."
          }
        ],
        useCases: [
          "Compare document versions",
          "Review text changes",
          "Diff code snippets",
          "Track content modifications"
        ],
      },
      zh: {
        name: "文本差异检查器",
        description: "比较两个文本并突出显示差异。查看添加、删除和未更改的行。",
        faqs: [
          {
            question: "如何显示差异？",
            answer: "添加的行以绿色突出显示，删除的行以红色显示，未更改的行以灰色显示。"
          },
          {
            question: "可以比较代码吗？",
            answer: "是的，该工具非常适合比较代码、配置文件或任何文本内容。"
          }
        ],
        useCases: [
          "比较文档版本",
          "审查文本更改",
          "对比代码片段",
          "跟踪内容修改"
        ],
      },
    },
  },
  {
    slug: "color-converter",
    category: "converter",
    keywords: {
      en: ["color", "converter", "hex", "rgb", "hsl", "picker"],
      zh: ["颜色", "转换", "hex", "rgb", "hsl", "选择器"],
    },
    component: "ColorConverter",
    icon: "Palette",
    relatedTools: ["base64-encode-decode", "hash-generator"],
    content: {
      en: {
        name: "Color Converter",
        description: "Convert colors between HEX, RGB, and HSL formats. Interactive color picker with live preview.",
        faqs: [
          {
            question: "What color formats are supported?",
            answer: "The tool supports HEX (#RRGGBB), RGB (red, green, blue), and HSL (hue, saturation, lightness) formats."
          },
          {
            question: "Can I adjust colors visually?",
            answer: "Yes, use the sliders to adjust RGB or HSL values and see the color change in real-time."
          }
        ],
        useCases: [
          "Convert CSS color values",
          "Match colors across formats",
          "Design color schemes",
          "Extract color values from designs"
        ],
      },
      zh: {
        name: "颜色转换器",
        description: "在 HEX、RGB 和 HSL 格式之间转换颜色。带实时预览的交互式颜色选择器。",
        faqs: [
          {
            question: "支持哪些颜色格式？",
            answer: "该工具支持 HEX (#RRGGBB)、RGB（红、绿、蓝）和 HSL（色调、饱和度、亮度）格式。"
          },
          {
            question: "可以可视化调整颜色吗？",
            answer: "是的，使用滑块调整 RGB 或 HSL 值，实时查看颜色变化。"
          }
        ],
        useCases: [
          "转换 CSS 颜色值",
          "跨格式匹配颜色",
          "设计配色方案",
          "从设计中提取颜色值"
        ],
      },
    },
  },
  {
    slug: "http-status-lookup",
    category: "reference",
    keywords: {
      en: ["http", "status", "code", "error", "response"],
      zh: ["http", "状态", "代码", "错误", "响应"],
    },
    component: "HttpStatusLookup",
    icon: "Globe",
    relatedTools: ["regex-tester", "jwt-decoder"],
    content: {
      en: {
        name: "HTTP Status Code Lookup",
        description: "Search and lookup HTTP status codes. Get detailed descriptions and meanings for all standard HTTP status codes.",
        faqs: [
          {
            question: "What status codes are included?",
            answer: "The tool includes all standard HTTP status codes from 1xx (Informational) to 5xx (Server Error)."
          },
          {
            question: "Can I search by description?",
            answer: "Yes, you can search by status code number, name, or description text."
          }
        ],
        useCases: [
          "Debug API errors",
          "Understand HTTP responses",
          "Learn HTTP status codes",
          "Troubleshoot web applications"
        ],
      },
      zh: {
        name: "HTTP 状态码查询",
        description: "搜索和查询 HTTP 状态码。获取所有标准 HTTP 状态码的详细描述和含义。",
        faqs: [
          {
            question: "包含哪些状态码？",
            answer: "该工具包含从 1xx（信息性）到 5xx（服务器错误）的所有标准 HTTP 状态码。"
          },
          {
            question: "可以按描述搜索吗？",
            answer: "是的，您可以按状态码编号、名称或描述文本搜索。"
          }
        ],
        useCases: [
          "调试 API 错误",
          "理解 HTTP 响应",
          "学习 HTTP 状态码",
          "排查 Web 应用程序故障"
        ],
      },
    },
  },
  {
    slug: "image-compressor",
    category: "image",
    keywords: {
      en: ["image", "compress", "optimize", "reduce", "size", "jpeg", "png"],
      zh: ["图片", "压缩", "优化", "减小", "大小", "jpeg", "png"],
    },
    component: "ImageCompressor",
    icon: "FileImage",
    relatedTools: ["image-resizer", "image-converter"],
    content: {
      en: {
        name: "Image Compressor",
        description: "Compress images to reduce file size while maintaining quality. Supports JPEG, PNG, and WebP formats.",
        faqs: [
          {
            question: "How much can I compress an image?",
            answer: "Compression depends on the quality setting. Lower quality means smaller file size but may reduce image clarity."
          },
          {
            question: "Will compression reduce image quality?",
            answer: "Yes, compression reduces quality to some degree. Use quality settings of 80-90% for a good balance between size and quality."
          },
          {
            question: "What formats are supported?",
            answer: "The tool supports JPEG, PNG, WebP, and most common image formats."
          }
        ],
        useCases: [
          "Reduce website load times",
          "Optimize images for web",
          "Save storage space",
          "Prepare images for email"
        ],
      },
      zh: {
        name: "图片压缩器",
        description: "压缩图片以减小文件大小，同时保持质量。支持 JPEG、PNG 和 WebP 格式。",
        faqs: [
          {
            question: "可以压缩图片多少？",
            answer: "压缩取决于质量设置。较低的质量意味着较小的文件大小，但可能会降低图像清晰度。"
          },
          {
            question: "压缩会降低图像质量吗？",
            answer: "是的，压缩会在一定程度上降低质量。使用 80-90% 的质量设置可以在大小和质量之间取得良好平衡。"
          },
          {
            question: "支持哪些格式？",
            answer: "该工具支持 JPEG、PNG、WebP 和大多数常见图像格式。"
          }
        ],
        useCases: [
          "减少网站加载时间",
          "为网络优化图片",
          "节省存储空间",
          "为电子邮件准备图片"
        ],
      },
    },
  },
  {
    slug: "png-to-webp",
    category: "image",
    keywords: {
      en: ["png", "webp", "convert", "image", "format"],
      zh: ["png", "webp", "转换", "图片", "格式"],
    },
    component: "PngToWebp",
    icon: "Image",
    relatedTools: ["webp-to-png", "image-converter"],
    content: {
      en: {
        name: "PNG to WebP Converter",
        description: "Convert PNG images to WebP format for better compression and faster loading times.",
        faqs: [
          {
            question: "What is WebP?",
            answer: "WebP is a modern image format that provides superior compression for images on the web, resulting in smaller file sizes."
          },
          {
            question: "Is WebP supported by all browsers?",
            answer: "WebP is supported by all modern browsers including Chrome, Firefox, Edge, and Safari."
          },
          {
            question: "Will I lose quality converting to WebP?",
            answer: "WebP provides better compression than PNG with minimal quality loss. The tool uses high-quality settings by default."
          }
        ],
        useCases: [
          "Reduce image file sizes",
          "Improve website performance",
          "Optimize images for modern web",
          "Save bandwidth"
        ],
      },
      zh: {
        name: "PNG 转 WebP 工具",
        description: "将 PNG 图片转换为 WebP 格式，以获得更好的压缩和更快的加载时间。",
        faqs: [
          {
            question: "什么是 WebP？",
            answer: "WebP 是一种现代图像格式，为网络上的图像提供卓越的压缩，从而产生更小的文件大小。"
          },
          {
            question: "所有浏览器都支持 WebP 吗？",
            answer: "WebP 被所有现代浏览器支持，包括 Chrome、Firefox、Edge 和 Safari。"
          },
          {
            question: "转换为 WebP 会损失质量吗？",
            answer: "WebP 提供比 PNG 更好的压缩，质量损失最小。该工具默认使用高质量设置。"
          }
        ],
        useCases: [
          "减小图片文件大小",
          "提高网站性能",
          "为现代网络优化图片",
          "节省带宽"
        ],
      },
    },
  },
  {
    slug: "webp-to-png",
    category: "image",
    keywords: {
      en: ["webp", "png", "convert", "image", "format"],
      zh: ["webp", "png", "转换", "图片", "格式"],
    },
    component: "WebpToPng",
    icon: "Image",
    relatedTools: ["png-to-webp", "image-converter"],
    content: {
      en: {
        name: "WebP to PNG Converter",
        description: "Convert WebP images to PNG format for compatibility with older systems and applications.",
        faqs: [
          {
            question: "Why convert WebP to PNG?",
            answer: "PNG is more widely supported by older software and systems. Convert to PNG when you need maximum compatibility."
          },
          {
            question: "Will the file size increase?",
            answer: "Yes, PNG files are typically larger than WebP files due to less efficient compression."
          }
        ],
        useCases: [
          "Ensure compatibility with older software",
          "Edit images in programs that don't support WebP",
          "Share images with users on older systems",
          "Archive images in a widely supported format"
        ],
      },
      zh: {
        name: "WebP 转 PNG 工具",
        description: "将 WebP 图片转换为 PNG 格式，以兼容旧系统和应用程序。",
        faqs: [
          {
            question: "为什么要将 WebP 转换为 PNG？",
            answer: "PNG 被旧软件和系统更广泛地支持。当您需要最大兼容性时，转换为 PNG。"
          },
          {
            question: "文件大小会增加吗？",
            answer: "是的，由于压缩效率较低，PNG 文件通常比 WebP 文件大。"
          }
        ],
        useCases: [
          "确保与旧软件的兼容性",
          "在不支持 WebP 的程序中编辑图片",
          "与使用旧系统的用户共享图片",
          "以广泛支持的格式存档图片"
        ],
      },
    },
  },
  {
    slug: "image-resizer",
    category: "image",
    keywords: {
      en: ["image", "resize", "scale", "dimensions", "width", "height"],
      zh: ["图片", "调整大小", "缩放", "尺寸", "宽度", "高度"],
    },
    component: "ImageResizer",
    icon: "Maximize2",
    relatedTools: ["image-cropper", "image-compressor"],
    content: {
      en: {
        name: "Image Resizer",
        description: "Resize images to custom dimensions. Maintain aspect ratio or set custom width and height.",
        faqs: [
          {
            question: "What is aspect ratio?",
            answer: "Aspect ratio is the proportional relationship between width and height. Maintaining it prevents image distortion."
          },
          {
            question: "Can I make images larger?",
            answer: "Yes, but enlarging images may reduce quality. It's best to resize images to smaller dimensions."
          },
          {
            question: "What happens if I don't maintain aspect ratio?",
            answer: "The image may appear stretched or squashed if you change dimensions without maintaining the aspect ratio."
          }
        ],
        useCases: [
          "Resize images for social media",
          "Create thumbnails",
          "Fit images to specific dimensions",
          "Prepare images for printing"
        ],
      },
      zh: {
        name: "图片尺寸调整工具",
        description: "将图片调整为自定义尺寸。保持宽高比或设置自定义宽度和高度。",
        faqs: [
          {
            question: "什么是宽高比？",
            answer: "宽高比是宽度和高度之间的比例关系。保持它可以防止图像失真。"
          },
          {
            question: "可以放大图片吗？",
            answer: "可以，但放大图片可能会降低质量。最好将图片调整为较小的尺寸。"
          },
          {
            question: "如果不保持宽高比会怎样？",
            answer: "如果在不保持宽高比的情况下更改尺寸，图像可能会显得拉伸或压扁。"
          }
        ],
        useCases: [
          "为社交媒体调整图片大小",
          "创建缩略图",
          "使图片适合特定尺寸",
          "为打印准备图片"
        ],
      },
    },
  },
  {
    slug: "image-cropper",
    category: "image",
    keywords: {
      en: ["image", "crop", "cut", "trim", "edit"],
      zh: ["图片", "裁剪", "剪切", "修剪", "编辑"],
    },
    component: "ImageCropper",
    icon: "Crop",
    relatedTools: ["image-resizer", "image-converter"],
    content: {
      en: {
        name: "Image Cropper",
        description: "Crop images to remove unwanted areas. Set custom crop dimensions and position.",
        faqs: [
          {
            question: "How do I crop an image?",
            answer: "Upload an image, set the X and Y position for the crop area, then set the width and height of the crop region."
          },
          {
            question: "Can I preview the crop area?",
            answer: "Yes, the tool shows a preview overlay on the original image indicating the crop area."
          }
        ],
        useCases: [
          "Remove unwanted backgrounds",
          "Focus on specific image areas",
          "Create profile pictures",
          "Prepare images for specific layouts"
        ],
      },
      zh: {
        name: "图片裁剪工具",
        description: "裁剪图片以删除不需要的区域。设置自定义裁剪尺寸和位置。",
        faqs: [
          {
            question: "如何裁剪图片？",
            answer: "上传图片，设置裁剪区域的 X 和 Y 位置，然后设置裁剪区域的宽度和高度。"
          },
          {
            question: "可以预览裁剪区域吗？",
            answer: "可以，该工具在原始图片上显示预览覆盖层，指示裁剪区域。"
          }
        ],
        useCases: [
          "删除不需要的背景",
          "聚焦于特定图像区域",
          "创建个人资料图片",
          "为特定布局准备图片"
        ],
      },
    },
  },
  {
    slug: "image-converter",
    category: "image",
    keywords: {
      en: ["image", "convert", "format", "png", "jpeg", "webp"],
      zh: ["图片", "转换", "格式", "png", "jpeg", "webp"],
    },
    component: "ImageConverter",
    icon: "RefreshCw",
    relatedTools: ["png-to-webp", "webp-to-png"],
    content: {
      en: {
        name: "Image Format Converter",
        description: "Convert images between different formats: PNG, JPEG, and WebP. Adjust quality settings for optimal results.",
        faqs: [
          {
            question: "Which format should I use?",
            answer: "Use WebP for web (best compression), PNG for images with transparency, and JPEG for photographs."
          },
          {
            question: "Does format conversion affect quality?",
            answer: "Converting to JPEG or WebP with quality settings below 100% will reduce quality. PNG conversion is lossless."
          },
          {
            question: "Can I convert multiple images at once?",
            answer: "Currently, the tool processes one image at a time. Upload and convert each image individually."
          }
        ],
        useCases: [
          "Convert images for web use",
          "Change format for compatibility",
          "Optimize images for different platforms",
          "Prepare images for specific applications"
        ],
      },
      zh: {
        name: "图片格式转换器",
        description: "在不同格式之间转换图片：PNG、JPEG 和 WebP。调整质量设置以获得最佳效果。",
        faqs: [
          {
            question: "应该使用哪种格式？",
            answer: "网络使用 WebP（最佳压缩），带透明度的图片使用 PNG，照片使用 JPEG。"
          },
          {
            question: "格式转换会影响质量吗？",
            answer: "转换为质量设置低于 100% 的 JPEG 或 WebP 会降低质量。PNG 转换是无损的。"
          },
          {
            question: "可以一次转换多张图片吗？",
            answer: "目前，该工具一次处理一张图片。单独上传和转换每张图片。"
          }
        ],
        useCases: [
          "为网络使用转换图片",
          "更改格式以实现兼容性",
          "为不同平台优化图片",
          "为特定应用程序准备图片"
        ],
      },
    },
  },
  {
    slug: "svg-viewer",
    category: "image",
    keywords: {
      en: ["svg", "viewer", "preview", "vector", "xml"],
      zh: ["svg", "查看器", "预览", "矢量", "xml"],
    },
    component: "SvgViewer",
    icon: "Eye",
    relatedTools: ["svg-optimizer", "image-converter"],
    content: {
      en: {
        name: "SVG Viewer",
        description: "View and preview SVG files. Upload SVG files or paste SVG code to see the rendered output.",
        faqs: [
          {
            question: "What is SVG?",
            answer: "SVG (Scalable Vector Graphics) is an XML-based vector image format that can scale to any size without losing quality."
          },
          {
            question: "Can I edit SVG code?",
            answer: "Yes, you can paste and edit SVG code directly in the tool and see the changes in real-time."
          },
          {
            question: "Is SVG better than PNG or JPEG?",
            answer: "SVG is ideal for logos, icons, and illustrations because it scales perfectly. Use PNG/JPEG for photographs."
          }
        ],
        useCases: [
          "Preview SVG files before using",
          "View SVG code output",
          "Test SVG compatibility",
          "Inspect SVG structure"
        ],
      },
      zh: {
        name: "SVG 查看器",
        description: "查看和预览 SVG 文件。上传 SVG 文件或粘贴 SVG 代码以查看渲染输出。",
        faqs: [
          {
            question: "什么是 SVG？",
            answer: "SVG（可缩放矢量图形）是一种基于 XML 的矢量图像格式，可以缩放到任何大小而不会失去质量。"
          },
          {
            question: "可以编辑 SVG 代码吗？",
            answer: "可以，您可以直接在工具中粘贴和编辑 SVG 代码，并实时查看更改。"
          },
          {
            question: "SVG 比 PNG 或 JPEG 更好吗？",
            answer: "SVG 非常适合徽标、图标和插图，因为它可以完美缩放。照片使用 PNG/JPEG。"
          }
        ],
        useCases: [
          "使用前预览 SVG 文件",
          "查看 SVG 代码输出",
          "测试 SVG 兼容性",
          "检查 SVG 结构"
        ],
      },
    },
  },
  {
    slug: "svg-optimizer",
    category: "image",
    keywords: {
      en: ["svg", "optimize", "compress", "minify", "reduce"],
      zh: ["svg", "优化", "压缩", "精简", "减小"],
    },
    component: "SvgOptimizer",
    icon: "Zap",
    relatedTools: ["svg-viewer", "image-compressor"],
    content: {
      en: {
        name: "SVG Optimizer",
        description: "Optimize SVG files by removing unnecessary code, comments, and metadata. Reduce file size while maintaining visual quality.",
        faqs: [
          {
            question: "How does SVG optimization work?",
            answer: "The tool removes comments, unnecessary whitespace, metadata, and default attribute values to reduce file size."
          },
          {
            question: "Will optimization change how my SVG looks?",
            answer: "No, optimization only removes unnecessary code. The visual appearance remains the same."
          },
          {
            question: "How much can I reduce file size?",
            answer: "Optimization typically reduces SVG file size by 20-50%, depending on how the SVG was created."
          }
        ],
        useCases: [
          "Reduce SVG file sizes for web",
          "Clean up SVG code from editors",
          "Improve website loading speed",
          "Remove unnecessary metadata"
        ],
      },
      zh: {
        name: "SVG 优化器",
        description: "通过删除不必要的代码、注释和元数据来优化 SVG 文件。在保持视觉质量的同时减小文件大小。",
        faqs: [
          {
            question: "SVG 优化如何工作？",
            answer: "该工具删除注释、不必要的空白、元数据和默认属性值以减小文件大小。"
          },
          {
            question: "优化会改变 SVG 的外观吗？",
            answer: "不会，优化只删除不必要的代码。视觉外观保持不变。"
          },
          {
            question: "可以减小多少文件大小？",
            answer: "优化通常可以将 SVG 文件大小减少 20-50%，具体取决于 SVG 的创建方式。"
          }
        ],
        useCases: [
          "为网络减小 SVG 文件大小",
          "清理编辑器中的 SVG 代码",
          "提高网站加载速度",
          "删除不必要的元数据"
        ],
      },
    },
  },
  {
    slug: "meta-tag-generator",
    category: "seo",
    keywords: {
      en: ["meta", "tags", "seo", "html", "head", "title", "description"],
      zh: ["meta", "标签", "seo", "html", "头部", "标题", "描述"],
    },
    component: "MetaTagGenerator",
    icon: "Tags",
    relatedTools: ["open-graph-generator", "schema-markup-generator"],
    content: {
      en: {
        name: "Meta Tag Generator",
        description: "Generate HTML meta tags for SEO. Create title, description, keywords, and other essential meta tags.",
        faqs: [
          {
            question: "What are meta tags?",
            answer: "Meta tags are HTML elements that provide metadata about a web page. They help search engines understand your content and improve SEO."
          },
          {
            question: "What's the ideal title length?",
            answer: "The recommended title length is 50-60 characters. Longer titles may be truncated in search results."
          },
          {
            question: "How important are meta descriptions?",
            answer: "Meta descriptions are very important for SEO. They should be 150-160 characters and accurately describe your page content."
          }
        ],
        useCases: [
          "Optimize pages for search engines",
          "Improve click-through rates from search results",
          "Set up new website pages",
          "Update existing page metadata"
        ],
      },
      zh: {
        name: "Meta 标签生成器",
        description: "为 SEO 生成 HTML meta 标签。创建标题、描述、关键词和其他必要的 meta 标签。",
        faqs: [
          {
            question: "什么是 meta 标签？",
            answer: "Meta 标签是提供网页元数据的 HTML 元素。它们帮助搜索引擎理解您的内容并改善 SEO。"
          },
          {
            question: "理想的标题长度是多少？",
            answer: "推荐的标题长度是 50-60 个字符。更长的标题可能在搜索结果中被截断。"
          },
          {
            question: "meta 描述有多重要？",
            answer: "Meta 描述对 SEO 非常重要。它们应该是 150-160 个字符，并准确描述您的页面内容。"
          }
        ],
        useCases: [
          "为搜索引擎优化页面",
          "提高搜索结果的点击率",
          "设置新网站页面",
          "更新现有页面元数据"
        ],
      },
    },
  },
  {
    slug: "open-graph-generator",
    category: "seo",
    keywords: {
      en: ["open graph", "og", "facebook", "twitter", "social", "meta"],
      zh: ["open graph", "og", "facebook", "twitter", "社交", "meta"],
    },
    component: "OpenGraphGenerator",
    icon: "Share2",
    relatedTools: ["meta-tag-generator", "schema-markup-generator"],
    content: {
      en: {
        name: "Open Graph Generator",
        description: "Generate Open Graph and Twitter Card meta tags for social media sharing. Control how your content appears when shared.",
        faqs: [
          {
            question: "What is Open Graph?",
            answer: "Open Graph is a protocol that enables web pages to become rich objects in social graphs, controlling how content appears when shared on social media."
          },
          {
            question: "What image size should I use?",
            answer: "The recommended image size for Open Graph is 1200x630 pixels. This ensures your image displays properly across all platforms."
          },
          {
            question: "Do Twitter Cards use the same tags?",
            answer: "Twitter Cards can use Open Graph tags as fallbacks, but also have their own specific tags for better control."
          }
        ],
        useCases: [
          "Optimize social media sharing",
          "Control preview appearance on Facebook",
          "Set up Twitter Card previews",
          "Improve social engagement"
        ],
      },
      zh: {
        name: "Open Graph 生成器",
        description: "为社交媒体分享生成 Open Graph 和 Twitter Card meta 标签。控制内容分享时的显示方式。",
        faqs: [
          {
            question: "什么是 Open Graph？",
            answer: "Open Graph 是一个协议，使网页成为社交图谱中的丰富对象，控制内容在社交媒体上分享时的显示方式。"
          },
          {
            question: "应该使用什么图片尺寸？",
            answer: "Open Graph 推荐的图片尺寸是 1200x630 像素。这确保您的图片在所有平台上正确显示。"
          },
          {
            question: "Twitter Cards 使用相同的标签吗？",
            answer: "Twitter Cards 可以使用 Open Graph 标签作为后备，但也有自己的特定标签以获得更好的控制。"
          }
        ],
        useCases: [
          "优化社交媒体分享",
          "控制 Facebook 上的预览外观",
          "设置 Twitter Card 预览",
          "提高社交参与度"
        ],
      },
    },
  },
  {
    slug: "robots-txt-generator",
    category: "seo",
    keywords: {
      en: ["robots", "txt", "crawler", "seo", "disallow", "sitemap"],
      zh: ["robots", "txt", "爬虫", "seo", "禁止", "站点地图"],
    },
    component: "RobotsTxtGenerator",
    icon: "Bot",
    relatedTools: ["sitemap-generator", "meta-tag-generator"],
    content: {
      en: {
        name: "Robots.txt Generator",
        description: "Generate robots.txt file to control search engine crawler access. Configure rules for different user agents.",
        faqs: [
          {
            question: "What is robots.txt?",
            answer: "Robots.txt is a file that tells search engine crawlers which pages or sections of your site they can or cannot access."
          },
          {
            question: "Should I block all crawlers?",
            answer: "No, you should only block crawlers from accessing sensitive or duplicate content. Blocking all crawlers will prevent your site from being indexed."
          },
          {
            question: "Where should I place robots.txt?",
            answer: "The robots.txt file must be placed in the root directory of your website (e.g., https://example.com/robots.txt)."
          }
        ],
        useCases: [
          "Control search engine access",
          "Prevent indexing of admin pages",
          "Specify sitemap location",
          "Manage crawler behavior"
        ],
      },
      zh: {
        name: "Robots.txt 生成器",
        description: "生成 robots.txt 文件以控制搜索引擎爬虫访问。为不同的用户代理配置规则。",
        faqs: [
          {
            question: "什么是 robots.txt？",
            answer: "Robots.txt 是一个文件，告诉搜索引擎爬虫可以或不可以访问您网站的哪些页面或部分。"
          },
          {
            question: "应该阻止所有爬虫吗？",
            answer: "不应该，您应该只阻止爬虫访问敏感或重复的内容。阻止所有爬虫将阻止您的网站被索引。"
          },
          {
            question: "应该将 robots.txt 放在哪里？",
            answer: "Robots.txt 文件必须放在网站的根目录中（例如，https://example.com/robots.txt）。"
          }
        ],
        useCases: [
          "控制搜索引擎访问",
          "防止索引管理页面",
          "指定站点地图位置",
          "管理爬虫行为"
        ],
      },
    },
  },
  {
    slug: "sitemap-generator",
    category: "seo",
    keywords: {
      en: ["sitemap", "xml", "seo", "urls", "search engine"],
      zh: ["站点地图", "xml", "seo", "网址", "搜索引擎"],
    },
    component: "SitemapGenerator",
    icon: "Map",
    relatedTools: ["robots-txt-generator", "meta-tag-generator"],
    content: {
      en: {
        name: "Sitemap Generator",
        description: "Generate XML sitemap for search engines. Help search engines discover and index your pages more efficiently.",
        faqs: [
          {
            question: "What is an XML sitemap?",
            answer: "An XML sitemap is a file that lists all important pages on your website, helping search engines discover and crawl your content."
          },
          {
            question: "How often should I update my sitemap?",
            answer: "Update your sitemap whenever you add, remove, or significantly modify pages on your website."
          },
          {
            question: "What is priority in sitemap?",
            answer: "Priority (0.0-1.0) indicates the relative importance of pages on your site. It helps search engines understand which pages are most important."
          }
        ],
        useCases: [
          "Submit sitemap to search engines",
          "Help search engines discover new pages",
          "Improve site indexing",
          "Organize website structure"
        ],
      },
      zh: {
        name: "站点地图生成器",
        description: "为搜索引擎生成 XML 站点地图。帮助搜索引擎更有效地发现和索引您的页面。",
        faqs: [
          {
            question: "什么是 XML 站点地图？",
            answer: "XML 站点地图是一个文件，列出了您网站上的所有重要页面，帮助搜索引擎发现和抓取您的内容。"
          },
          {
            question: "应该多久更新一次站点地图？",
            answer: "每当您添加、删除或显著修改网站上的页面时，都应该更新站点地图。"
          },
          {
            question: "站点地图中的优先级是什么？",
            answer: "优先级（0.0-1.0）表示网站上页面的相对重要性。它帮助搜索引擎理解哪些页面最重要。"
          }
        ],
        useCases: [
          "向搜索引擎提交站点地图",
          "帮助搜索引擎发现新页面",
          "改善网站索引",
          "组织网站结构"
        ],
      },
    },
  },
  {
    slug: "schema-markup-generator",
    category: "seo",
    keywords: {
      en: ["schema", "structured data", "json-ld", "rich snippets", "seo"],
      zh: ["schema", "结构化数据", "json-ld", "富摘要", "seo"],
    },
    component: "SchemaMarkupGenerator",
    icon: "Code2",
    relatedTools: ["meta-tag-generator", "open-graph-generator"],
    content: {
      en: {
        name: "Schema Markup Generator",
        description: "Generate Schema.org structured data in JSON-LD format. Help search engines understand your content and display rich snippets.",
        faqs: [
          {
            question: "What is Schema markup?",
            answer: "Schema markup is structured data that helps search engines understand your content better and can result in rich snippets in search results."
          },
          {
            question: "What is JSON-LD?",
            answer: "JSON-LD is a format for structured data that's easy to implement and recommended by Google. It's placed in a script tag in your HTML."
          },
          {
            question: "Will Schema markup improve my rankings?",
            answer: "Schema markup doesn't directly improve rankings, but it can increase click-through rates by making your search results more attractive with rich snippets."
          }
        ],
        useCases: [
          "Enable rich snippets in search results",
          "Improve content understanding by search engines",
          "Display star ratings and prices",
          "Show event dates and locations"
        ],
      },
      zh: {
        name: "Schema 标记生成器",
        description: "以 JSON-LD 格式生成 Schema.org 结构化数据。帮助搜索引擎理解您的内容并显示富摘要。",
        faqs: [
          {
            question: "什么是 Schema 标记？",
            answer: "Schema 标记是结构化数据，帮助搜索引擎更好地理解您的内容，并可能在搜索结果中显示富摘要。"
          },
          {
            question: "什么是 JSON-LD？",
            answer: "JSON-LD 是一种结构化数据格式，易于实现且被 Google 推荐。它放置在 HTML 的 script 标签中。"
          },
          {
            question: "Schema 标记会提高我的排名吗？",
            answer: "Schema 标记不会直接提高排名，但它可以通过富摘要使您的搜索结果更具吸引力，从而提高点击率。"
          }
        ],
        useCases: [
          "在搜索结果中启用富摘要",
          "改善搜索引擎对内容的理解",
          "显示星级评分和价格",
          "显示活动日期和地点"
        ],
      },
    },
  },
  {
    slug: "keyword-density-checker",
    category: "seo",
    keywords: {
      en: ["keyword", "density", "seo", "analysis", "frequency"],
      zh: ["关键词", "密度", "seo", "分析", "频率"],
    },
    component: "KeywordDensityChecker",
    icon: "Search",
    relatedTools: ["meta-tag-generator", "word-counter"],
    content: {
      en: {
        name: "Keyword Density Checker",
        description: "Analyze keyword density in your content. Check keyword frequency and optimize for SEO without keyword stuffing.",
        faqs: [
          {
            question: "What is keyword density?",
            answer: "Keyword density is the percentage of times a keyword appears in your content compared to the total word count."
          },
          {
            question: "What's the ideal keyword density?",
            answer: "The ideal keyword density is 1-2% for primary keywords. Higher densities may be considered keyword stuffing by search engines."
          },
          {
            question: "Should I focus only on keyword density?",
            answer: "No, keyword density is just one factor. Focus on creating quality content that naturally includes relevant keywords and variations."
          }
        ],
        useCases: [
          "Optimize content for target keywords",
          "Avoid keyword stuffing",
          "Analyze competitor content",
          "Improve SEO content strategy"
        ],
      },
      zh: {
        name: "关键词密度检查器",
        description: "分析内容中的关键词密度。检查关键词频率并优化 SEO，避免关键词堆砌。",
        faqs: [
          {
            question: "什么是关键词密度？",
            answer: "关键词密度是关键词在内容中出现的次数与总字数相比的百分比。"
          },
          {
            question: "理想的关键词密度是多少？",
            answer: "主要关键词的理想密度是 1-2%。更高的密度可能被搜索引擎视为关键词堆砌。"
          },
          {
            question: "应该只关注关键词密度吗？",
            answer: "不应该，关键词密度只是一个因素。专注于创建自然包含相关关键词和变体的优质内容。"
          }
        ],
        useCases: [
          "为目标关键词优化内容",
          "避免关键词堆砌",
          "分析竞争对手内容",
          "改善 SEO 内容策略"
        ],
      },
    },
  },
];

export const getToolBySlug = (slug: string): Tool | undefined => {
  return tools.find(tool => tool.slug === slug);
};

export const getToolsByCategory = (category: string): Tool[] => {
  return tools.filter(tool => tool.category === category);
};

export const searchTools = (query: string, locale: Locale): Tool[] => {
  const lowerQuery = query.toLowerCase();
  return tools.filter(tool => {
    const content = tool.content[locale];
    const keywords = tool.keywords[locale] || tool.keywords.en;

    return (
      content.name.toLowerCase().includes(lowerQuery) ||
      content.description.toLowerCase().includes(lowerQuery) ||
      keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
    );
  });
};
