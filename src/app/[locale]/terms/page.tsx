import { Container } from '@/components/layout/Container';
import { Locale } from '@/i18n/config';

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return {
    title: params.locale === 'zh' ? '服务条款' : 'Terms of Service',
    description: params.locale === 'zh' ? 'DevTools Hub 服务条款' : 'Terms of service for DevTools Hub',
  };
}

export default function LocaleTermsPage({ params }: { params: { locale: Locale } }) {
  const isZh = params.locale === 'zh';

  return (
    <div className="py-12">
      <Container>
        <div className="prose prose-slate mx-auto max-w-3xl">
          <h1>{isZh ? '服务条款' : 'Terms of Service'}</h1>
          <p className="text-muted-foreground">
            {isZh ? '最后更新' : 'Last updated'}: {new Date().toLocaleDateString()}
          </p>

          <h2>{isZh ? '接受条款' : 'Agreement to Terms'}</h2>
          <p>
            {isZh
              ? '当你访问并使用 DevTools Hub 时，即表示你同意遵守这些服务条款。'
              : 'By accessing and using DevTools Hub, you agree to be bound by these terms of service.'}
          </p>

          <h2>{isZh ? '可接受使用方式' : 'Acceptable Use'}</h2>
          <p>
            {isZh
              ? '你不得将本服务用于违法、滥用、规避限流或破坏系统稳定性的用途。'
              : 'You may not use the service for unlawful purposes, abuse, rate-limit evasion, or actions that harm system stability.'}
          </p>

          <h2>{isZh ? '免责声明' : 'Disclaimer'}</h2>
          <p>
            {isZh
              ? '本网站与工具按“现状”提供，我们不对结果的准确性、完整性或可用性作保证。'
              : 'The website and tools are provided on an as-is basis, without guarantees regarding accuracy, completeness, or availability.'}
          </p>

          <h2>{isZh ? '联系我们' : 'Contact'}</h2>
          <p>
            {isZh
              ? '如果你对这些条款有疑问，请通过网站相关入口联系我们。'
              : 'If you have questions about these terms, please contact us through the website.'}
          </p>
        </div>
      </Container>
    </div>
  );
}
