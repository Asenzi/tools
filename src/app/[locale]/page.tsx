import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { tools } from '@/config/tools';
import { aiTools } from '@/config/aiTools';
import { ArrowRight, Search, Code2, Sparkles } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtools-hub.com';

  return {
    title: dict['home.title'],
    description: dict['home.description'],
    alternates: {
      canonical: `${siteUrl}/${params.locale}`,
      languages: {
        'en': `${siteUrl}/en`,
        'zh': `${siteUrl}/zh`,
      },
    },
  };
}

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  const popularTools = tools.slice(0, 6);
  const popularAiTools = aiTools.slice(0, 4);

  return (
    <div className="py-12">
      <Container>
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {dict['home.title']}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {dict['home.description']}
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <Input placeholder={dict['home.searchPlaceholder']} className="flex-1" />
            <Button size="lg">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Popular Developer Tools */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Code2 className="h-6 w-6" />
              <h2 className="text-2xl font-bold">{dict['home.popularTools']}</h2>
            </div>
            <Link href={`/${params.locale}/tools`}>
              <Button variant="ghost">
                {dict['home.viewAll']} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool) => {
              const Icon = (Icons as any)[tool.icon] || Code2;
              const content = tool.content[params.locale];
              return (
                <Link key={tool.slug} href={`/${params.locale}/tools/${tool.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg">{content.name}</CardTitle>
                      </div>
                      <CardDescription>{content.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Popular AI Tools */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6" />
              <h2 className="text-2xl font-bold">{dict['home.aiTools']}</h2>
            </div>
            <Link href={`/${params.locale}/ai-tools`}>
              <Button variant="ghost">
                {dict['home.viewAll']} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularAiTools.map((tool) => {
              const Icon = (Icons as any)[tool.icon] || Sparkles;
              const content = tool.content[params.locale];
              return (
                <Link key={tool.slug} href={`/${params.locale}/ai-tools/${tool.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg">{content.name}</CardTitle>
                      </div>
                      <CardDescription>{content.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{dict['home.faq']}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{dict['home.faq.free.q']}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{dict['home.faq.free.a']}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{dict['home.faq.safe.q']}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{dict['home.faq.safe.a']}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{dict['home.faq.signup.q']}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{dict['home.faq.signup.a']}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{dict['home.faq.offline.q']}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{dict['home.faq.offline.a']}</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </Container>
    </div>
  );
}
