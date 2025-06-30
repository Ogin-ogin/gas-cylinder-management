// ...QRコード表示ダイアログ雛形...
import React from 'react';
import { Dialog } from './ui/dialog';

// 進捗率: 約72%

export default function QRCodeDialog({ open, onClose, url }: { open: boolean; onClose: () => void; url: string }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="flex flex-col items-center">
        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`} alt="QRコード" />
        <div className="mt-2 text-xs break-all">{url}</div>
      </div>
    </Dialog>
  );
}
