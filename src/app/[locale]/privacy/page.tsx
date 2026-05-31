import { Container } from '@/components/layout/Container';
import { Locale } from '@/i18n/config';

type LocaleParams = Promise<{ locale: Locale }>;

export async function generateMetadata({ params }: { params: LocaleParams }) {
  const { locale } = await params;
  return {
    title: locale === 'zh' ? '隐私政策' : 'Privacy Policy',
    description: locale === 'zh' ? 'DevTools Hub 隐私政策' : 'Privacy policy for DevTools Hub',
  };
}

export default async function LocalePrivacyPage({ params }: { params: LocaleParams }) {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return (
    <div className="py-12">
      <Container>
        <div className="prose prose-slate mx-auto max-w-3xl">
          <h1>{isZh ? '隐私政策' : 'Privacy Policy'}</h1>
          <p className="text-muted-foreground">
            {isZh ? '最后更新' : 'Last updated'}: {new Date().toLocaleDateString()}
          </p>

          <h2>{isZh ? '简介' : 'Introduction'}</h2>
          <p>
            {isZh
              ? 'DevTools Hub 致力于保护你的隐私。本页面说明我们在你使用网站和服务时如何处理相关信息。'
              : 'DevTools Hub is committed to protecting your privacy. This page explains how we handle information when you use our website and services.'}
          </p>

          <h2>{isZh ? '我们收集的信息' : 'Information We Collect'}</h2>
          <p>
            {isZh
              ? '开发者工具主要在浏览器本地运行。AI 工具在调用时可能会处理你的 IP、提示词和生成结果，用于限流、服务提供和问题排查。'
              : 'Developer tools run primarily in your browser. AI tools may process your IP address, prompts, and generated output for rate limiting, service delivery, and troubleshooting.'}
          </p>

          <h2>{isZh ? '广告与第三方服务' : 'Ads and Third-Party Services'}</h2>
          <p>
            {isZh
              ? '本站可能使用 Google AdSense 和 AI 接口服务。第三方服务会根据它们各自的隐私政策处理相关数据。'
              : 'This site may use Google AdSense and AI API providers. Third-party services handle relevant data according to their own privacy policies.'}
          </p>

          <h2>{isZh ? '联系我们' : 'Contact'}</h2>
          <p>
            {isZh
              ? '如果你对隐私政策有疑问，请通过网站相关入口联系我们。'
              : 'If you have questions about this privacy policy, please contact us through the website.'}
          </p>
        </div>
      </Container>
    </div>
  );
}
