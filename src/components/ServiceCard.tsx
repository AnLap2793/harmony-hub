import { Eye, Lock, Clock, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

export type AccessStatus =
  | "granted"
  | "no_access"
  | "pending"
  | "syncing"
  | "rejected"
  | "expiring"
  | "expired";

const statusConfig: Record<AccessStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: LucideIcon }> = {
  granted: { label: "Có quyền", variant: "default", icon: CheckCircle2 },
  no_access: { label: "Chưa có quyền", variant: "secondary", icon: Lock },
  pending: { label: "Đang chờ duyệt", variant: "outline", icon: Clock },
  syncing: { label: "Đang đồng bộ", variant: "outline", icon: Clock },
  rejected: { label: "Bị từ chối", variant: "destructive", icon: XCircle },
  expiring: { label: "Sắp hết hạn", variant: "outline", icon: AlertTriangle },
  expired: { label: "Đã hết hạn", variant: "destructive", icon: XCircle },
};

export interface Service {
  id: string;
  name: string;
  description: string;
  department: string;
  icon: LucideIcon;
  status: AccessStatus;
  category: string;
}

interface ServiceCardProps {
  service: Service;
  onOpen: (service: Service) => void;
  className?: string;
}

const ServiceCard = ({ service, onOpen, className = "" }: ServiceCardProps) => {
  const config = statusConfig[service.status];
  const StatusIcon = config.icon;

  return (
    <div
      className={`group bg-card rounded-xl border-2 border-card shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col ${className}`}
    >
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <service.icon className="w-6 h-6 text-secondary" />
          </div>
          <Badge variant={config.variant} className="text-[10px] gap-1 font-bold">
            <StatusIcon className="w-3 h-3" />
            {config.label}
          </Badge>
        </div>

        <h3 className="font-bold text-foreground mb-1.5 text-base">{service.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 flex-1 leading-relaxed">{service.description}</p>

        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
          Phòng ban: <span className="text-foreground/80">{service.department}</span>
        </span>
      </div>

      <div className="border-t border-border px-5 py-3 bg-muted/20">
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 font-bold text-xs border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
          onClick={() => onOpen(service)}
        >
          <Eye className="w-4 h-4" /> Xem chi tiết
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
