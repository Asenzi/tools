import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { tools } from '@/config/tools';
import { aiTools } from '@/config/aiTools';
import { ArrowRight, Search, Code2, Sparkles } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function HomePage() {
  const popularTools = tools.slice(0, 6);
  const popularAiTools = aiTools.slice(0, 4);

  return (
    <div className="py-12">
      {/* Hero Section */}
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Professional Developer Tools & AI Generators
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Free, fast, and privacy-focused tools for developers. All tools run in your browser.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <Input placeholder="Search tools..." className="flex-1" />
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
              <h2 className="text-2xl font-bold">Popular Developer Tools</h2>
            </div>
            <Link href="/tools">
              <Button variant="ghost">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool) => {
              const Icon = (Icons as any)[tool.icon] || Code2;
              return (
                <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                      </div>
                      <CardDescription>{tool.description}</CardDescription>
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
              <h2 className="text-2xl font-bold">AI-Powered Tools</h2>
            </div>
            <Link href="/ai-tools">
              <Button variant="ghost">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularAiTools.map((tool) => {
              const Icon = (Icons as any)[tool.icon] || Sparkles;
              return (
                <Link key={tool.slug} href={`/ai-tools/${tool.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                      </div>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are these tools free?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, all developer tools are completely free. AI tools have a daily limit for free users.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is my data safe?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Developer tools run entirely in your browser. Your data never leaves your device.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do I need to sign up?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No account required. All tools are accessible without registration.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I use these tools offline?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Developer tools work offline. AI tools require an internet connection.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </Container>
    </div>
  );
}
