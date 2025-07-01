// ...QRコード管理ページ雛形...
import React, { useEffect, useState } from "react";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { QrCode, Trash2, Link2 } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import QRCodeGenerator from "../../../components/qr-code-generator";

export default function QRCodesPage() {
  const [qrList, setQrList] = useState<any[]>([]);
  const [cylinders, setCylinders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const { data: qr } = await supabase.from("qr_codes").select("*");
      const { data: cyl } = await supabase.from("cylinders").select("id, qr_code_id, container_number");
      setQrList(qr || []);
      setCylinders(cyl || []);
      setLoading(false);
    };
    fetchAll();
  }, []);

  // 未紐付けQR
  const usedQrIds = new Set(cylinders.map(c => c.qr_code_id));
  const unusedQrs = qrList.filter(qr => !usedQrIds.has(qr.id));

  // 削除
  const handleDelete = async (id: string) => {
    await supabase.from("qr_codes").delete().eq("id", id);
    setQrList(qrList.filter(qr => qr.id !== id));
  };

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
        <QrCode className="h-6 w-6" />QRコード管理
      </h2>
      <Card className="p-6 mb-6">
        <QRCodeGenerator />
      </Card>
      <Card className="p-6 mb-6">
        <div className="font-bold mb-2">未紐付けQRコード</div>
        <div className="flex flex-wrap gap-2">
          {unusedQrs.length === 0 ? <span className="text-gray-400">なし</span> : unusedQrs.map(qr => (
            <Badge key={qr.id} variant="outline">#{qr.qr_number}</Badge>
          ))}
        </div>
      </Card>
      <Card className="p-6">
        <div className="font-bold mb-2">全QRコード一覧</div>
        <div className="flex flex-col gap-2">
          {loading ? <span>読み込み中...</span> : qrList.length === 0 ? <span className="text-gray-400">なし</span> : qrList.map(qr => {
            const linked = cylinders.find(c => c.qr_code_id === qr.id);
            return (
              <div key={qr.id} className="flex items-center gap-2 border-b last:border-b-0 py-1">
                <Badge variant={linked ? "default" : "outline"}>#{qr.qr_number}</Badge>
                <a href={qr.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1"><Link2 className="w-4 h-4" />URL</a>
                {linked && <span className="text-xs text-gray-500">→ {linked.container_number}</span>}
                <Button variant="ghost" className="ml-auto" onClick={() => handleDelete(qr.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
