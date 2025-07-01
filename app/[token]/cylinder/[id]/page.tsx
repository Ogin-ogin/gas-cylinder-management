"use client";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { Card } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { Alert } from "../../../../components/ui/alert";
import { ArrowLeft, QrCode, MapPin, Calendar, Clock, Gauge, AlertTriangle } from "lucide-react";
import EditCylinderDialog from "../../../../components/edit-cylinder-dialog";
import UpdatePressureDialog from "../../../../components/update-pressure-dialog";
import PressureChart from "../../../../components/pressure-chart";
import QRCodeDialog from "../../../../components/qr-code-dialog";
import { Cylinder } from "../../../../types";
import { supabase } from "../../../../lib/supabase";
import Link from "next/link";

export default function CylinderDetailPage() {
  const params = useParams();
  const pathname = usePathname();
  const { id } = params as { id: string };
  const [cylinder, setCylinder] = useState<Cylinder | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);

  // 戻るURL生成
  const pathSegments = pathname.split("/");
  const managementBaseUrl = pathSegments.slice(0, 3).join("/");
  const backUrl = `${managementBaseUrl}/cylinders`;

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("cylinders").select("*").eq("id", id).single();
      if (!error && data) setCylinder(data);
      setLoading(false);
    };
    if (id) fetchDetail();
  }, [id]);

  // 状態ロジック
  const getPressureStatus = () => {
    if (!cylinder) return { status: "-", color: "default" };
    const percentage = (cylinder.current_pressure / cylinder.initial_pressure) * 100;
    if (percentage < 30) return { status: "危険", color: "destructive" };
    if (percentage < 60) return { status: "警告", color: "secondary" };
    return { status: "正常", color: "default" };
  };
  const getExpiryStatus = () => {
    if (!cylinder) return { status: "-", color: "default", days: 0 };
    const deadline = new Date(cylinder.return_deadline);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntilExpiry < 0) return { status: "期限切れ", color: "destructive", days: daysUntilExpiry };
    if (daysUntilExpiry <= 7) return { status: "緊急", color: "destructive", days: daysUntilExpiry };
    if (daysUntilExpiry <= 30) return { status: "注意", color: "secondary", days: daysUntilExpiry };
    return { status: "正常", color: "default", days: daysUntilExpiry };
  };
  const pressureStatus = getPressureStatus();
  const expiryStatus = getExpiryStatus();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded animate-pulse w-1/3" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-96 bg-muted rounded animate-pulse" />
            <div className="h-64 bg-muted rounded animate-pulse" />
          </div>
          <div className="h-96 bg-muted rounded animate-pulse" />
        </div>
      </div>
    );
  }
  if (!cylinder) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          ボンベが見つかりません
        </Alert>
        <Link href={backUrl}>
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            ボンベ一覧に戻る
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href={backUrl}>
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{cylinder.container_number}</h1>
            <p className="text-muted-foreground">
              {cylinder.gas_type} - {cylinder.location}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {cylinder.qr_number && (
            <Button variant="outline" onClick={() => setShowQR(true)}>
              <QrCode className="h-4 w-4 mr-2" />
              QRコード
            </Button>
          )}
        </div>
      </div>
      {/* メインコンテンツ */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* 左側：グラフと基本情報 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 残圧推移グラフ */}
          <Card>
            <PressureChart cylinderId={cylinder.id} />
          </Card>
          {/* 基本情報 */}
          <Card>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">設置場所</p>
                    <p className="font-medium">{cylinder.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">ガス種類</p>
                    <p className="font-medium">{cylinder.gas_type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">登録日</p>
                    <p className="font-medium">{cylinder.register_date}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">残圧状態</span>
                  <Badge variant={pressureStatus.color as any}>{pressureStatus.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">返却期限</span>
                  <div className="text-right">
                    <Badge variant={expiryStatus.color as any}>{expiryStatus.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {expiryStatus.days > 0 ? `${expiryStatus.days}日後` : `${Math.abs(expiryStatus.days)}日経過`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">最終更新</p>
                    <p className="font-medium">{cylinder.last_updated}</p>
                  </div>
                </div>
                {cylinder.qr_number && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">QRコード</span>
                    <Badge variant="outline">#{cylinder.qr_number}</Badge>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
        {/* 右側：残圧更新・編集 */}
        <div className="space-y-6">
          <Card>
            <div className="p-4">
              <h3 className="font-semibold mb-3 text-lg">残圧をすぐに更新</h3>
              <UpdatePressureDialog cylinderId={cylinder.id} />
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <h3 className="font-semibold mb-3 text-lg">登録情報の編集</h3>
              <EditCylinderDialog cylinder={cylinder} />
            </div>
          </Card>
        </div>
      </div>
      {/* QRコードダイアログ */}
      {showQR && (
        <QRCodeDialog open={showQR} onClose={() => setShowQR(false)} url={typeof window !== 'undefined' ? window.location.href : ''} />
      )}
    </div>
  );
}
