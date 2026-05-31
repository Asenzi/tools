'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';

export function WebpToPng() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('webp')) {
      alert('Please upload a WebP file');
      return;
    }

    setFileName(file.name.replace('.webp', '.png'));

    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const convertToPNG = () => {
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
          };
          reader.readAsDataURL(blob);
        },
        'image/png'
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
          <CardTitle>Upload WebP Image</CardTitle>
          <CardDescription>Select a WebP image to convert to PNG format</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="file"
            accept="image/webp"
            onChange={handleFileUpload}
            className="cursor-pointer"
          />

          {originalImage && (
            <Button onClick={convertToPNG} className="w-full">
              Convert to PNG
            </Button>
          )}
        </CardContent>
      </Card>

      {convertedImage && (
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Original (WebP)</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={originalImage} alt="Original WebP" className="w-full h-auto rounded-lg" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Converted (PNG)</CardTitle>
                <Button onClick={handleDownload} size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <img src={convertedImage} alt="Converted PNG" className="w-full h-auto rounded-lg" />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
