'use client';

import { useEffect, useState } from 'react';

export default function BanglaDate() {
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString('bn-BD', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    );
  }, []);

  return <>{today}</>;
}
