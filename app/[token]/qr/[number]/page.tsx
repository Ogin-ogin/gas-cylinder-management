// ...QRコードリダイレクト雛形...
import React from "react";
import { Card } from "../../../../components/ui/card";
import { QrCode } from "lucide-react";

export default function QRRedirectPage() {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
        <QrCode className="h-6 w-6" />
        QRリダイレクト
      </h2>
      <Card className="p-6 text-gray-500">
        QRリダイレクト処理は今後追加予定です。
      </Card>
    </div>
  );
}
