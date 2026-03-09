'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview } from '@/lib/fpixel-clips';

export default function TrackClipsPixelPageView() {
  const pathname = usePathname();

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 20;

    const tryTrack = () => !!pageview();
    if (tryTrack()) return;

    const onReady = () => {
      tryTrack();
    };
    window.addEventListener('meta:pixel:ready', onReady);

    const interval = window.setInterval(() => {
      attempts += 1;
      if (tryTrack() || attempts >= maxAttempts) {
        window.clearInterval(interval);
      }
    }, 200);

    return () => {
      window.removeEventListener('meta:pixel:ready', onReady);
      window.clearInterval(interval);
    };
  }, [pathname]);

  return null;
}

