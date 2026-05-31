# DevTools Hub

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAsenzi%2Ftools&project-name=tools&repository-name=tools&env=DEEPSEEK_API_KEY,DEEPSEEK_API_URL,DATABASE_URL,NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_SITE_NAME,NEXT_PUBLIC_SITE_DESCRIPTION,NEXT_PUBLIC_ADSENSE_CLIENT,RATE_LIMIT_FREE_DAILY&envDescription=Add%20your%20DeepSeek%20API%20key%2C%20site%20settings%2C%20AdSense%20client%2C%20and%20database%20URL%20before%20deploying.)

A professional, SEO-optimized tool website built with Next.js 15, featuring developer tools and AI-powered generators.

## Features

- 🛠️ **11 Developer Tools** - JSON formatter, Base64 encoder, UUID generator, and more
- 🤖 **5 AI Tools** - Powered by DeepSeek API for content generation
- 🎯 **SEO Optimized** - Automatic sitemap, structured data, and meta tags
- ⚡ **Fast & Responsive** - Built with Next.js 15 App Router and TailwindCSS
- 🔒 **Privacy-Focused** - Developer tools run entirely in browser
- 📱 **Mobile-First** - Fully responsive design
- 🎨 **Modern UI** - Built with shadcn/ui components
- 🔧 **Configuration-Based** - Easy to add new tools via config files

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: Prisma + SQLite
- **AI**: DeepSeek API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**

```bash
cd C:\Users\HALittle\Desktop\tool
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
DATABASE_URL="file:./dev.db"
DEEPSEEK_API_KEY="your_deepseek_api_key_here"
DEEPSEEK_API_URL="https://api.deepseek.com/v1/chat/completions"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="DevTools Hub"
NEXT_PUBLIC_SITE_DESCRIPTION="Professional developer tools and AI generators"
NEXT_PUBLIC_ADSENSE_CLIENT="ca-pub-9275585559027208"
RATE_LIMIT_FREE_DAILY=3
```

4. **Initialize the database**

```bash
npm run db:generate
npm run db:push
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── api/                  # API routes
│   │   └── ai/              # AI generation endpoint
│   ├── tools/               # Developer tools pages
│   ├── ai-tools/            # AI tools pages
│   ├── search/              # Search page
│   ├── privacy/             # Privacy policy
│   ├── terms/               # Terms of service
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── sitemap.ts           # Dynamic sitemap
│   └── robots.ts            # Robots.txt
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── layout/              # Layout components
│   ├── seo/                 # SEO components
│   ├── ads/                 # Ad components
│   ├── tools/               # Developer tool components
│   └── ai-tools/            # AI tool components
├── config/
│   ├── tools.ts             # Developer tools configuration
│   ├── aiTools.ts           # AI tools configuration
│   └── categories.ts        # Categories configuration
├── lib/
│   ├── utils.ts             # Utility functions
│   ├── seo.ts               # SEO helpers
│   ├── search.ts            # Search functionality
│   ├── rateLimit.ts         # Rate limiting
│   └── ai.ts                # AI integration
└── prisma/
    └── schema.prisma        # Database schema
```

## Adding New Tools

### Developer Tools

1. **Add tool configuration** in `src/config/tools.ts`:

```typescript
{
  slug: "my-tool",
  name: "My Tool",
  category: "formatter",
  description: "Tool description",
  keywords: ["keyword1", "keyword2"],
  component: "MyTool",
  icon: "Code",
  faqs: [...],
  useCases: [...],
  relatedTools: [...]
}
```

2. **Create tool component** in `src/components/tools/MyTool.tsx`

3. **Export component** in `src/components/tools/index.tsx`

### AI Tools

1. **Add tool configuration** in `src/config/aiTools.ts`

2. **Create tool component** in `src/components/ai-tools/` (or use the base component)

The system will automatically:
- Generate routes
- Create SEO metadata
- Add to sitemap
- Include in search

## Database Commands

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Open Prisma Studio
npm run db:studio
```

## Building for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

1. **Push code to GitHub**

2. **Import project in Vercel**

3. **Add environment variables** in Vercel dashboard:
   - `DATABASE_URL`
   - `DEEPSEEK_API_KEY`
   - `DEEPSEEK_API_URL`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SITE_NAME`
   - `NEXT_PUBLIC_SITE_DESCRIPTION`
   - `NEXT_PUBLIC_ADSENSE_CLIENT`
   - `RATE_LIMIT_FREE_DAILY`

4. **Deploy**

Vercel will automatically:
- Build the project
- Deploy to production

Notes:
- If `DATABASE_URL` points to local SQLite like `file:./dev.db`, Vercel deployments will still work, but AI usage logs are skipped in production because Vercel's filesystem is ephemeral.
- For persistent AI logging in production, switch `DATABASE_URL` to a hosted database such as Postgres/Neon/Supabase.

## Google AdSense Integration

1. Set `NEXT_PUBLIC_ADSENSE_CLIENT`
2. Add or update your `slot` IDs where `AdSlot` is used

## Rate Limiting

Free users are limited to 3 AI generations per day per tool. This is configured via:

- Environment variable: `RATE_LIMIT_FREE_DAILY`
- Implementation: `src/lib/rateLimit.ts`

## SEO Features

- ✅ Automatic sitemap generation
- ✅ Robots.txt
- ✅ Structured data (Schema.org)
- ✅ OpenGraph tags
- ✅ Twitter Card tags
- ✅ Breadcrumbs
- ✅ FAQ schema
- ✅ Canonical URLs

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
