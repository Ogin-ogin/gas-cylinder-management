// ...shadcn/ui ダイアログコンポーネント雛形...
import * as React from 'react';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Dialog({ open, onClose, children }: DialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded shadow p-6 min-w-[300px]">
        {children}
        <button className="mt-4 text-blue-600" onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
}
