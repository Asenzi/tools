# 多语言实现指南

项目已经完成多语言架构改造，支持中英文双语，并针对 SEO 进行了优化。

## ✅ 已完成的改造

### 1. i18n 配置
- `src/i18n/config.ts` - 语言配置（en, zh）
- `src/i18n/locales/en.ts` - 英文翻译
- `src/i18n/locales/zh.ts` - 中文翻译
- `src/i18n/dictionaries.ts` - 翻译字典管理
- `src/middleware.ts` - 语言检测和重定向中间件

### 2. 配置文件多语言化
- `src/config/tools.ts` - 工具配置支持多语言内容
- `src/config/aiTools.ts` - AI 工具配置支持多语言内容
- 每个工具包含 `content: { en: {...}, zh: {...} }` 结构

### 3. 布局组件
- `src/components/layout/Header.tsx` - 支持多语言导航
- `src/components/layout/Footer.tsx` - 支持多语言页脚
- `src/components/layout/LanguageSwitcher.tsx` - 语言切换器

### 4. 页面结构
- `src/app/[locale]/layout.tsx` - 多语言根布局
- `src/app/[locale]/page.tsx` - 多语言首页（示例）

### 5. SEO 优化
- `src/app/sitemap.ts` - 多语言 sitemap，包含 hreflang
- 每个页面自动生成 alternates.languages
- 支持 x-default 语言标签

## 🔧 需要完成的页面迁移

将以下页面从 `src/app/` 移动到 `src/app/[locale]/`：

### 工具页面
```
src/app/tools/page.tsx → src/app/[locale]/tools/page.tsx
src/app/tools/[slug]/page.tsx → src/app/[locale]/tools/[slug]/page.tsx
```

### AI 工具页面
```
src/app/ai-tools/page.tsx → src/app/[locale]/ai-tools/page.tsx
src/app/ai-tools/[slug]/page.tsx → src/app/[locale]/ai-tools/[slug]/page.tsx
```

### 其他页面
```
src/app/search/page.tsx → src/app/[locale]/search/page.tsx
src/app/privacy/page.tsx → src/app/[locale]/privacy/page.tsx
src/app/terms/page.tsx → src/app/[locale]/terms/page.tsx
```

## 📝 页面迁移模板

### 1. 添加 locale 参数

```typescript
export default function Page({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  // ...
}
```

### 2. 生成静态参数

```typescript
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}
```

### 3. 更新 metadata

```typescript
export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtools-hub.com';

  return {
    title: dict['page.title'],
    description: dict['page.description'],
    alternates: {
      canonical: `${siteUrl}/${params.locale}/path`,
      languages: {
        'en': `${siteUrl}/en/path`,
        'zh': `${siteUrl}/zh/path`,
        'x-default': `${siteUrl}/en/path`,
      },
    },
  };
}
```

### 4. 使用多语言内容

```typescript
// 对于工具页面
const tool = getToolBySlug(params.slug);
const content = tool.content[params.locale];

// 使用 content.name, content.description 等
```

### 5. 更新链接

所有内部链接需要包含 locale：

```typescript
<Link href={`/${params.locale}/tools`}>Tools</Link>
<Link href={`/${params.locale}/tools/${tool.slug}`}>{content.name}</Link>
```

## 🌐 SEO 最佳实践

### 1. Hreflang 标签
每个页面自动包含 hreflang 标签，告诉搜索引擎页面的语言版本：

```html
<link rel="alternate" hreflang="en" href="https://example.com/en/page" />
<link rel="alternate" hreflang="zh" href="https://example.com/zh/page" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/page" />
```

### 2. Canonical URL
每个页面包含 canonical URL，指向当前语言版本：

```html
<link rel="canonical" href="https://example.com/zh/page" />
```

### 3. Sitemap
- 包含所有语言版本的 URL
- 每个 URL 包含 alternates 指向其他语言版本
- 搜索引擎可以发现所有语言版本

### 4. 语言检测
中间件自动检测用户语言：
1. 检查 URL 中的语言前缀
2. 检查 Accept-Language 头
3. 默认使用英语

## 🚀 测试多语言功能

### 1. 启动开发服务器
```bash
npm run dev
```

### 2. 访问不同语言版本
- 英文：http://localhost:3001/en
- 中文：http://localhost:3001/zh

### 3. 测试语言切换
点击右上角的语言切换器，应该能在中英文之间切换。

### 4. 测试自动重定向
访问 http://localhost:3001 应该自动重定向到 /en 或 /zh（根据浏览器语言）。

## 📋 完整迁移清单

- [x] i18n 配置和翻译字典
- [x] 工具配置多语言化
- [x] AI 工具配置多语言化
- [x] 布局组件（Header, Footer）
- [x] 语言切换器
- [x] 首页多语言版本
- [x] Sitemap 多语言支持
- [ ] 工具列表页
- [ ] 工具详情页
- [ ] AI 工具列表页
- [ ] AI 工具详情页
- [ ] 搜索页
- [ ] 隐私政策页
- [ ] 服务条款页
- [ ] 删除旧的单语言页面

## 🔍 SEO 验证

部署后，使用以下工具验证 SEO：

1. **Google Search Console**
   - 提交多语言 sitemap
   - 检查 hreflang 标签是否正确

2. **Hreflang Tags Testing Tool**
   - https://technicalseo.com/tools/hreflang/
   - 验证 hreflang 实现

3. **Google Rich Results Test**
   - 验证结构化数据

## 💡 添加新语言

要添加新语言（例如日语）：

1. 更新 `src/i18n/config.ts`：
```typescript
export const locales = ['en', 'zh', 'ja'] as const;
```

2. 创建 `src/i18n/locales/ja.ts` 翻译文件

3. 更新所有工具配置，添加日语内容：
```typescript
content: {
  en: {...},
  zh: {...},
  ja: {...}
}
```

4. 重新构建和部署

## 🎯 性能优化

- 使用 `generateStaticParams` 预渲染所有语言版本
- 翻译字典在构建时加载，无运行时开销
- 中间件高效处理语言检测和重定向

## 📚 参考资源

- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Google Multilingual SEO](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Hreflang Best Practices](https://developers.google.com/search/docs/specialty/international/localized-versions#html)
