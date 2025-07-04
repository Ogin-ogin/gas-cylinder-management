"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Alert } from "../../components/ui/alert";
import { Cylinder } from "../../types";
import { supabase } from "../../lib/supabase";
import { QrCode, Gauge, MapPin, Calendar, Clock, AlertTriangle } from "lucide-react";

const PRESSURE_THRESHOLD = 5;
const DEADLINE_DAYS = 7;

function daysUntil(dateStr: string) {
  const today = new Date();
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function DashboardPage() {
  const [cylinders, setCylinders] = useState<Cylinder[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "";

  useEffect(() => {
    const fetchCylinders = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("cylinders").select("*");
      if (!error && data) setCylinders(data);
      setLoading(false);
    };
    fetchCylinders();
  }, []);

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

  const lowPressure = cylinders.filter((c: Cylinder) => c.current_pressure < PRESSURE_THRESHOLD).length;
  const nearDeadline = cylinders.filter((c: Cylinder) => daysUntil(c.return_deadline) <= DEADLINE_DAYS).length;

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">ダッシュボード</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="text-center">
          <div className="text-sm text-gray-500 mb-1">総ボンベ数</div>
          <div className="text-3xl font-bold">{cylinders.length}</div>
        </Card>
        <Card className="text-center">
          <div className="text-sm text-gray-500 mb-1">低残圧ボンベ数</div>
          <div className="text-3xl font-bold text-red-500">{lowPressure}</div>
        </Card>
        <Card className="text-center">
          <div className="text-sm text-gray-500 mb-1">期限間近ボンベ数</div>
          <div className="text-3xl font-bold text-orange-500">{nearDeadline}</div>
        </Card>
      </div>
      <h3 className="text-lg font-semibold mb-4 tracking-tight">ボンベ一覧</h3>
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
                className="cursor-pointer"
                onClick={() => router.push(`/${token}/cylinder/${c.id}`)}
              >
                <Card className="transition-transform duration-200 hover:scale-[1.025] hover:shadow-md p-6 rounded-2xl border border-[#e5e7eb] shadow-sm bg-white flex flex-col gap-2">
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
