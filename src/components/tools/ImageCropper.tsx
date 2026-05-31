'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';

export function ImageCropper() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropWidth, setCropWidth] = useState(300);
  const [cropHeight, setCropHeight] = useState(300);
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
    };
    reader.readAsDataURL(file);
  };

  const cropImage = () => {
    if (!originalImage) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = cropWidth;
      canvas.height = cropHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(
        img,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      canvas.toBlob((blob) => {
        if (!blob) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          setCroppedImage(e.target?.result as string);
        };
        reader.readAsDataURL(blob);
      }, 'image/png');
    };
    img.src = originalImage;
  };

  const handleDownload = () => {
    if (!croppedImage) return;

    const link = document.createElement('a');
    link.href = croppedImage;
    link.download = `cropped-${fileName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
          <CardDescription>Select an image to crop</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="cursor-pointer"
          />

          {originalImage && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">X Position</label>
                  <Input
                    type="number"
                    value={cropX}
                    onChange={(e) => setCropX(Number(e.target.value))}
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Y Position</label>
                  <Input
                    type="number"
                    value={cropY}
                    onChange={(e) => setCropY(Number(e.target.value))}
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Width</label>
                  <Input
                    type="number"
                    value={cropWidth}
                    onChange={(e) => setCropWidth(Number(e.target.value))}
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Height</label>
                  <Input
                    type="number"
                    value={cropHeight}
                    onChange={(e) => setCropHeight(Number(e.target.value))}
                    min="1"
                  />
                </div>
              </div>

              <Button onClick={cropImage} className="w-full">
                Crop Image
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {originalImage && (
        <Card>
          <CardHeader>
            <CardTitle>Original Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative inline-block">
              <img src={originalImage} alt="Original" className="w-full h-auto rounded-lg" />
              <div
                className="absolute border-2 border-primary bg-primary/10"
                style={{
                  left: `${cropX}px`,
                  top: `${cropY}px`,
                  width: `${cropWidth}px`,
                  height: `${cropHeight}px`,
                }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {croppedImage && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Cropped Image</CardTitle>
              <Button onClick={handleDownload} size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <img src={croppedImage} alt="Cropped" className="w-full h-auto rounded-lg" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
