'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

type SchemaType = 'Article' | 'Product' | 'Organization' | 'Person' | 'LocalBusiness' | 'Event';

export function SchemaMarkupGenerator() {
  const [schemaType, setSchemaType] = useState<SchemaType>('Article');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');

  // Article specific
  const [author, setAuthor] = useState('');
  const [datePublished, setDatePublished] = useState('');

  // Product specific
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [availability, setAvailability] = useState('InStock');

  // Organization/Person specific
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

  // Event specific
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');

  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generateSchema = () => {
    let schema: any = {
      '@context': 'https://schema.org',
      '@type': schemaType,
    };

    // Common fields
    if (name) schema.name = name;
    if (description) schema.description = description;
    if (url) schema.url = url;
    if (image) schema.image = image;

    // Type-specific fields
    switch (schemaType) {
      case 'Article':
        if (author) schema.author = { '@type': 'Person', name: author };
        if (datePublished) schema.datePublished = datePublished;
        schema.headline = name;
        break;

      case 'Product':
        if (price) {
          schema.offers = {
            '@type': 'Offer',
            price: price,
            priceCurrency: currency,
            availability: `https://schema.org/${availability}`,
          };
        }
        break;

      case 'Organization':
      case 'LocalBusiness':
        if (email) schema.email = email;
        if (telephone) schema.telephone = telephone;
        break;

      case 'Person':
        if (email) schema.email = email;
        if (telephone) schema.telephone = telephone;
        break;

      case 'Event':
        if (startDate) schema.startDate = startDate;
        if (endDate) schema.endDate = endDate;
        if (location) {
          schema.location = {
            '@type': 'Place',
            name: location,
          };
        }
        break;
    }

    const jsonLd = JSON.stringify(schema, null, 2);
    setOutput(`<script type="application/ld+json">\n${jsonLd}\n</script>`);
  };

  const handleCopy = async () => {
    if (output) {
      await copyToClipboard(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Schema Markup Configuration</CardTitle>
          <CardDescription>Generate structured data for search engines</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Schema Type</label>
            <Select value={schemaType} onValueChange={(value) => setSchemaType(value as SchemaType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Article">Article</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Organization">Organization</SelectItem>
                <SelectItem value="Person">Person</SelectItem>
                <SelectItem value="LocalBusiness">Local Business</SelectItem>
                <SelectItem value="Event">Event</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description..."
              className="min-h-[100px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">URL</label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              type="url"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              type="url"
            />
          </div>

          {schemaType === 'Article' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date Published</label>
                <Input
                  type="date"
                  value={datePublished}
                  onChange={(e) => setDatePublished(e.target.value)}
                />
              </div>
            </>
          )}

          {schemaType === 'Product' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="29.99"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Currency</label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="CNY">CNY</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Availability</label>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="InStock">In Stock</SelectItem>
                    <SelectItem value="OutOfStock">Out of Stock</SelectItem>
                    <SelectItem value="PreOrder">Pre-Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {(schemaType === 'Organization' || schemaType === 'LocalBusiness' || schemaType === 'Person') && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Telephone</label>
                <Input
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="+1-555-555-5555"
                />
              </div>
            </>
          )}

          {schemaType === 'Event' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <Input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <Input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Event venue name"
                />
              </div>
            </>
          )}

          <Button onClick={generateSchema} className="w-full">
            Generate Schema Markup
          </Button>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Schema Markup</CardTitle>
              <Button onClick={handleCopy} variant="outline" size="sm">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              className="min-h-[400px] font-mono text-sm"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
