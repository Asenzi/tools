'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Upload } from 'lucide-react';

export function ImageCompressor() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [stats, setStats] = useState({ original: 0, compressed: 0, saved: 0 });
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string);
      setStats(prev => ({ ...prev, original: file.size }));
    };
    reader.readAsDataURL(file);
  };

  const compressImage = () => {
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
            setCompressedImage(e.target?.result as string);
            const saved = ((stats.original - blob.size) / stats.original) * 100;
            setStats({
              original: stats.original,
              compressed: blob.size,
              saved: Math.max(0, saved),
            });
          };
          reader.readAsDataURL(blob);
        },
        'image/jpeg',
        quality / 100
      );
    };
    img.src = originalImage;
  };

  const handleDownload = () => {
    if (!compressedImage) return;

    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = `compressed-${fileName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
          <CardDescription>Select an image to compress (JPEG, PNG, WebP)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="cursor-pointer"
            />
          </div>

          {originalImage && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Quality: {quality}%
                </label>
                <Input
                  type="range"
                  min="1"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Lower quality = smaller file size
                </p>
              </div>

              <Button onClick={compressImage} className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Compress Image
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {compressedImage && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Compression Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Original Size</div>
                  <div className="text-2xl font-bold">
                    {(stats.original / 1024).toFixed(2)} KB
                  </div>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground">Compressed Size</div>
                  <div className="text-2xl font-bold text-primary">
                    {(stats.compressed / 1024).toFixed(2)} KB
                  </div>
                </div>
                <div className="p-4 bg-green-500/10 rounded-lg">
                  <div className="text-sm text-muted-foreground">Saved</div>
                  <div className="text-2xl font-bold text-green-600">
                    {stats.saved.toFixed(1)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Original</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Compressed</CardTitle>
                  <Button onClick={handleDownload} size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <img
                  src={compressedImage}
                  alt="Compressed"
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
