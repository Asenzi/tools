'use client';

import { useEffect } from 'react';
import { CSSProperties } from 'react';

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-9275585559027208';

export interface AdSlotProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
  layoutKey?: string;
  style?: CSSProperties;
}

export function AdSlot({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
  layoutKey,
  style,
}: AdSlotProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}
