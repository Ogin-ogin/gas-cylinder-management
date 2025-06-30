import React from 'react';
import '../app/globals.css';

// ...Next.js ルートレイアウトの雛形...
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
