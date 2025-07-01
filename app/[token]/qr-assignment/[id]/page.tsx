// ...QRコード割り当てページ雛形...
import React from "react";
import { Card } from "../../../../components/ui/card";
import { QrCode } from "lucide-react";

export default function QRAssignmentPage() {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
        <QrCode className="h-6 w-6" />
        QRコード割り当て
      </h2>
      <Card className="p-6 text-gray-500">
        QR割り当てUIは今後追加予定です。
      </Card>
    </div>
  );
}
