import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { QrCode, Gauge, MapPin, Calendar, Clock } from "lucide-react";
import { Cylinder } from "../types";

export default function CylinderCard({ cylinder }: { cylinder: Cylinder }) {
  const pressurePercent = Math.max(0, Math.min(100, (cylinder.current_pressure / cylinder.initial_pressure) * 100));
  const isLow = cylinder.current_pressure < 5;
  const isNearDeadline = (() => {
    const today = new Date();
    const target = new Date(cylinder.return_deadline);
    return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) <= 7;
  })();
  return (
    <Card className="p-4 rounded-2xl border border-[#e5e7eb] shadow-sm bg-white flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold text-lg tracking-tight flex-1">{cylinder.container_number}</span>
        {cylinder.qr_number && <Badge variant="outline"><QrCode className="h-3 w-3 mr-1 inline" />#{cylinder.qr_number}</Badge>}
      </div>
      <div className="text-gray-500 mb-1 flex items-center gap-2">
        <Gauge className="h-4 w-4 text-muted-foreground" />{cylinder.gas_type}
        <MapPin className="h-4 w-4 text-muted-foreground ml-2" />{cylinder.location}
      </div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs text-gray-500">残圧</span>
        <div className="flex-1 h-3 rounded bg-[#e5e7eb] relative min-w-[80px] max-w-[120px]">
          <div
            className={`h-3 rounded transition-all ${isLow ? 'bg-red-400' : 'bg-blue-400'}`}
            style={{ width: `${pressurePercent}%` }}
          />
        </div>
        <Badge variant={isLow ? "destructive" : "default"}>{cylinder.current_pressure} MPa</Badge>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-gray-500">返却期限</span>
        <Badge variant={isNearDeadline ? "destructive" : "default"}>{cylinder.return_deadline}</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-gray-500">最終更新</span>
        <span className="text-xs text-gray-700">{cylinder.last_updated}</span>
      </div>
    </Card>
  );
}
