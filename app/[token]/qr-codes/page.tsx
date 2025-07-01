// ...QRコード管理ページ雛形...
import React from "react";
import { Card } from "../../../components/ui/card";
import { Alert } from "../../../components/ui/alert";
import { QrCode } from "lucide-react";

export default function QRCodesPage() {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
        <QrCode className="h-6 w-6" />
        QRコード管理
      </h2>
      <Card className="p-6 text-gray-500">
        QRコード管理UIは今後追加予定です。
      </Card>
    </div>
  );
}
