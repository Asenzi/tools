'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';

export function PngToWebp() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [stats, setStats] = useState({ original: 0, converted: 0 });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('png')) {
      alert('Please upload a PNG file');
      return;
    }

    setFileName(file.name.replace('.png', '.webp'));
    setStats(prev => ({ ...prev, original: file.size }));

    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const convertToWebP = () => {
    if (!originalImage) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;

          const reader = new FileReader();
          reader.onload = (e) => {
            setConvertedImage(e.target?.result as string);
            setStats(prev => ({ ...prev, converted: blob.size }));
          };
          reader.readAsDataURL(blob);
        },
        'image/webp',
        0.9
      );
    };
    img.src = originalImage;
  };

  const handleDownload = () => {
    if (!convertedImage) return;

    const link = document.createElement('a');
    link.href = convertedImage;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload PNG Image</CardTitle>
          <CardDescription>Select a PNG image to convert to WebP format</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="file"
            accept="image/png"
            onChange={handleFileUpload}
            className="cursor-pointer"
          />

          {originalImage && (
            <Button onClick={convertToWebP} className="w-full">
              Convert to WebP
            </Button>
          )}
        </CardContent>
      </Card>

      {convertedImage && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Conversion Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">PNG Size</div>
                  <div className="text-2xl font-bold">
                    {(stats.original / 1024).toFixed(2)} KB
                  </div>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">WebP Size</div>
                  <div className="text-2xl font-bold text-primary">
                    {(stats.converted / 1024).toFixed(2)} KB
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Original (PNG)</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={originalImage} alt="Original PNG" className="w-full h-auto rounded-lg" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Converted (WebP)</CardTitle>
                  <Button onClick={handleDownload} size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <img src={convertedImage} alt="Converted WebP" className="w-full h-auto rounded-lg" />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
