import { Package, CheckCircle2, Clock, Shield } from "lucide-react";

const stats = [
  { label: "Tổng dịch vụ", value: "24", icon: Package },
  { label: "Đã kích hoạt", value: "8", icon: CheckCircle2 },
  { label: "Đang chờ duyệt", value: "2", icon: Clock },
  { label: "Vai trò của bạn", value: "Nhân viên", icon: Shield },
];

const StatsBar = () => (
  <section className="bg-muted border-b border-border">
    <div className="container py-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
              <stat.icon className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground leading-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;
