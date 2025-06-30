// ...QRコード印刷コンポーネント雛形...
import React from 'react';
import { Button } from './ui/button';

// 進捗率: 約73%

export default function QRCodePrint({ url }: { url: string }) {
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="flex flex-col items-center">
      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`} alt="QRコード" />
      <Button onClick={handlePrint} className="mt-2">印刷</Button>
    </div>
  );
}
