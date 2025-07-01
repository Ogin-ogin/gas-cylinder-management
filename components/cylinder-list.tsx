// ボンベリストコンポーネント
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Cylinder } from "../types";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert } from "./ui/alert";
import { QrCode, Gauge, MapPin, Calendar, Clock, AlertTriangle } from "lucide-react";

const PRESSURE_THRESHOLD = 5;
const DEADLINE_DAYS = 7;

function daysUntil(dateStr: string) {
  const today = new Date();
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function CylinderList() {
  const [cylinders, setCylinders] = useState<Cylinder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCylinders = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("cylinders").select("*");
      if (!error && data) setCylinders(data);
      setLoading(false);
    };
    fetchCylinders();
  }, []);

  if (loading) return <div>読み込み中...</div>;
  if (cylinders.length === 0) return <Alert variant="default"><AlertTriangle className="h-4 w-4 mr-2" />ボンベがありません</Alert>;

  return (
    <div className="grid gap-4">
      {cylinders.map((c) => {
        const pressurePercent = Math.max(0, Math.min(100, (c.current_pressure / c.initial_pressure) * 100));
        const isLow = c.current_pressure < PRESSURE_THRESHOLD;
        const isNearDeadline = daysUntil(c.return_deadline) <= DEADLINE_DAYS;
        return (
          <Card key={c.id} className="p-4 rounded-2xl border border-[#e5e7eb] shadow-sm bg-white flex flex-col gap-2">
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
        );
      })}
    </div>
  );
}
