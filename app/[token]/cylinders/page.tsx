"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Alert } from "../../../components/ui/alert";
import { Cylinder } from "../../../types";
import { supabase } from "../../../lib/supabase";
import { QrCode, Gauge, MapPin, Calendar, Clock, AlertTriangle, Trash2 } from "lucide-react";
import AddCylinderDialog from "../../../components/add-cylinder-dialog";

const PRESSURE_THRESHOLD = 5;
const DEADLINE_DAYS = 7;

function daysUntil(dateStr: string) {
  const today = new Date();
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function CylindersPage() {
  const [cylinders, setCylinders] = useState<Cylinder[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const router = useRouter();
  const token = typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "";

  // QRコード一覧取得
  const [qrList, setQrList] = useState<any[]>([]);
  useEffect(() => {
    const fetchQRCodes = async () => {
      const { data } = await supabase.from("qr_codes").select("*");
      setQrList(data || []);
    };
    fetchQRCodes();
  }, []);

  useEffect(() => {
    const fetchCylinders = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("cylinders").select("*");
      if (!error && data) setCylinders(data);
      setLoading(false);
    };
    fetchCylinders();
  }, []);

  // 新規登録処理（未紐付けQR自動割当）
  const handleAddCylinder = async (form: any) => {
    // 未紐付けQRを抽出
    const usedQrIds = new Set(cylinders.map(c => c.qr_code_id));
    const unusedQr = qrList.find(qr => !usedQrIds.has(qr.id));
    const insertData = {
      ...form,
      initial_pressure: parseFloat(form.initial_pressure),
      current_pressure: parseFloat(form.current_pressure),
      qr_code_id: unusedQr ? unusedQr.id : null,
      qr_number: unusedQr ? unusedQr.qr_number : null
    };
    await supabase.from("cylinders").insert([insertData]);
    setShowAdd(false);
    // 再取得
    const { data } = await supabase.from("cylinders").select("*");
    setCylinders(data || []);
  };

  // 削除処理
  const handleDelete = async (id: string) => {
    await supabase.from("cylinders").delete().eq("id", id);
    setCylinders(cylinders.filter(c => c.id !== id));
  };

  if (loading) return (
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

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">ボンベ一覧</h2>
        <button className="px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow" onClick={() => setShowAdd(true)}>新規登録</button>
      </div>
      {showAdd && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <AddCylinderDialog onSubmit={handleAddCylinder} onClose={() => setShowAdd(false)} />
          </div>
        </div>
      )}
      {cylinders.length === 0 ? (
        <Alert variant="default">
          <AlertTriangle className="h-4 w-4 mr-2" />
          ボンベがありません
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cylinders.map((c: Cylinder) => {
            const pressurePercent = Math.max(0, Math.min(100, (c.current_pressure / c.initial_pressure) * 100));
            const isLow = c.current_pressure < PRESSURE_THRESHOLD;
            const isNearDeadline = daysUntil(c.return_deadline) <= DEADLINE_DAYS;
            return (
              <div
                key={c.id}
                className="cursor-pointer group relative"
                onClick={() => router.push(`/${token}/cylinder/${c.id}`)}
                style={{ fontFamily: 'Inter, Noto Sans JP, Segoe UI, system-ui, sans-serif' }}
              >
                <Card
                  className="transition-transform duration-200 hover:scale-[1.025] hover:shadow-md p-6 rounded-2xl border border-[#e5e7eb] shadow-sm bg-white flex flex-col gap-2"
                >
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 z-10"
                    onClick={e => { e.stopPropagation(); handleDelete(c.id); }}
                    title="削除"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-lg tracking-tight flex-1">{c.container_number}</span>
                    {c.qr_number && <Badge variant="outline"><QrCode className="h-3 w-3 mr-1 inline" />#{c.qr_number}</Badge>}
                  </div>
                  <div className="text-gray-500 mb-1 flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-muted-foreground" />{c.gas_type}
                    <MapPin className="h-4 w-4 text-muted-foreground ml-2" />{c.location}
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500">残圧</span>
                    <div className="flex-1 h-3 rounded bg-[#e5e7eb] relative min-w-[80px] max-w-[120px]">
                      <div
                        className={`h-3 rounded transition-all ${isLow ? 'bg-red-400' : 'bg-blue-400'}`}
                        style={{ width: `${pressurePercent}%` }}
                      />
                    </div>
                    <Badge variant={isLow ? "destructive" : "default"}>{c.current_pressure} MPa</Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-gray-500">返却期限</span>
                    <Badge variant={isNearDeadline ? "destructive" : "default"}>{c.return_deadline}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-gray-500">最終更新</span>
                    <span className="text-xs text-gray-700">{c.last_updated}</span>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
