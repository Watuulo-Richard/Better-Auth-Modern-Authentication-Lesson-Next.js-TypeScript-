'use client';

import { incrementPageViewsAction } from '@/actions/visitors';
import { useEffect, useState } from 'react';

function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const trackView = async () => {
      try {
        const response = await incrementPageViewsAction();
        console.log(response, "hello....")
        if (response.success && response.data !== null) {
          setViews(response.data);
        } else {
          console.error(response.error || response.message);
        }
      } catch (error) {
        console.error('Error tracking view:', error);
      } finally {
        setIsLoading(false);
      }
    };

    trackView();
  }, []);

  if (isLoading || views === null) {
    return <span>loading...</span>;
  }

  return <span>{getOrdinalSuffix(views)} visitor</span>;
}

