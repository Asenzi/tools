'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export function ColorConverter() {
  const [hexInput, setHexInput] = useState('#3b82f6');
  const [rgbR, setRgbR] = useState(59);
  const [rgbG, setRgbG] = useState(130);
  const [rgbB, setRgbB] = useState(246);
  const [hslH, setHslH] = useState(217);
  const [hslS, setHslS] = useState(91);
  const [hslL, setHslL] = useState(60);
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  const updateFromHex = (hex: string) => {
    setHexInput(hex);
    const rgb = hexToRgb(hex);
    if (rgb) {
      setRgbR(rgb.r);
      setRgbG(rgb.g);
      setRgbB(rgb.b);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setHslH(hsl.h);
      setHslS(hsl.s);
      setHslL(hsl.l);
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgbR(r);
    setRgbG(g);
    setRgbB(b);
    setHexInput(rgbToHex(r, g, b));
    const hsl = rgbToHsl(r, g, b);
    setHslH(hsl.h);
    setHslS(hsl.s);
    setHslL(hsl.l);
  };

  const updateFromHsl = (h: number, s: number, l: number) => {
    setHslH(h);
    setHslS(s);
    setHslL(l);
    const rgb = hslToRgb(h, s, l);
    setRgbR(rgb.r);
    setRgbG(rgb.g);
    setRgbB(rgb.b);
    setHexInput(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  const handleCopy = async (text: string, type: string) => {
    await copyToClipboard(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Color Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="w-full h-32 rounded-lg border-2 border-border"
            style={{ backgroundColor: hexInput }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>HEX</CardTitle>
            <Button
              onClick={() => handleCopy(hexInput, 'hex')}
              variant="outline"
              size="sm"
            >
              {copied === 'hex' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Input
            value={hexInput}
            onChange={(e) => updateFromHex(e.target.value)}
            placeholder="#000000"
            className="font-mono"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>RGB</CardTitle>
            <Button
              onClick={() => handleCopy(`rgb(${rgbR}, ${rgbG}, ${rgbB})`, 'rgb')}
              variant="outline"
              size="sm"
            >
              {copied === 'rgb' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Red: {rgbR}</label>
            <Input
              type="range"
              min="0"
              max="255"
              value={rgbR}
              onChange={(e) => updateFromRgb(Number(e.target.value), rgbG, rgbB)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Green: {rgbG}</label>
            <Input
              type="range"
              min="0"
              max="255"
              value={rgbG}
              onChange={(e) => updateFromRgb(rgbR, Number(e.target.value), rgbB)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Blue: {rgbB}</label>
            <Input
              type="range"
              min="0"
              max="255"
              value={rgbB}
              onChange={(e) => updateFromRgb(rgbR, rgbG, Number(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>HSL</CardTitle>
            <Button
              onClick={() => handleCopy(`hsl(${hslH}, ${hslS}%, ${hslL}%)`, 'hsl')}
              variant="outline"
              size="sm"
            >
              {copied === 'hsl' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Hue: {hslH}°</label>
            <Input
              type="range"
              min="0"
              max="360"
              value={hslH}
              onChange={(e) => updateFromHsl(Number(e.target.value), hslS, hslL)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Saturation: {hslS}%</label>
            <Input
              type="range"
              min="0"
              max="100"
              value={hslS}
              onChange={(e) => updateFromHsl(hslH, Number(e.target.value), hslL)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Lightness: {hslL}%</label>
            <Input
              type="range"
              min="0"
              max="100"
              value={hslL}
              onChange={(e) => updateFromHsl(hslH, hslS, Number(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
