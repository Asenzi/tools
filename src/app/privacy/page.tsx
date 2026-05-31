import { Container } from '@/components/layout/Container';

export const metadata = {
  title: 'Privacy Policy - DevTools Hub',
  description: 'Privacy policy for DevTools Hub',
};

export default function PrivacyPage() {
  return (
    <div className="py-12">
      <Container>
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>Introduction</h2>
          <p>
            DevTools Hub ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, and safeguard your information when you use our website and services.
          </p>

          <h2>Information We Collect</h2>
          <h3>Developer Tools</h3>
          <p>
            Our developer tools (JSON Formatter, Base64 Encoder, etc.) run entirely in your browser. We do not collect,
            store, or transmit any data you process with these tools. Your data never leaves your device.
          </p>

          <h3>AI Tools</h3>
          <p>
            When you use our AI-powered tools, we collect:
          </p>
          <ul>
            <li>Your IP address (for rate limiting)</li>
            <li>The prompts you submit</li>
            <li>The generated results</li>
            <li>Timestamps of usage</li>
          </ul>
          <p>
            This data is used solely for providing the service, preventing abuse, and improving our tools.
          </p>

          <h3>Analytics</h3>
          <p>
            We may use analytics services to understand how our website is used. This includes:
          </p>
          <ul>
            <li>Pages visited</li>
            <li>Time spent on site</li>
            <li>Browser and device information</li>
            <li>General location (country/city level)</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Prevent abuse and enforce rate limits</li>
            <li>Improve our tools and user experience</li>
            <li>Analyze usage patterns</li>
          </ul>

          <h2>Data Storage and Security</h2>
          <p>
            We implement appropriate security measures to protect your information. AI tool usage logs are stored
            securely and retained for a limited time for operational purposes.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We use third-party services including:
          </p>
          <ul>
            <li>DeepSeek API for AI generation</li>
            <li>Google AdSense for advertising</li>
            <li>Analytics providers</li>
          </ul>
          <p>
            These services have their own privacy policies governing their use of your information.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Request deletion of your data</li>
            <li>Opt out of analytics tracking</li>
          </ul>

          <h2>Children's Privacy</h2>
          <p>
            Our services are not directed to children under 13. We do not knowingly collect information from children.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            policy on this page.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us through our website.
          </p>
        </div>
      </Container>
    </div>
  );
}
