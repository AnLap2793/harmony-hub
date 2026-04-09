import { 
  Users, 
  Key, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  AlertCircle,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Monitor,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const STATS = [
  { 
    title: "Tổng khách hàng", 
    value: "1,248", 
    change: "+12.5%", 
    trend: "up", 
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  { 
    title: "License đang chạy", 
    value: "3,120", 
    change: "+8.2%", 
    trend: "up", 
    icon: Key,
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  { 
    title: "Lượt Deployment", 
    value: "452", 
    change: "+18.4%", 
    trend: "up", 
    icon: Zap,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  { 
    title: "Uptime Hệ thống", 
    value: "99.9%", 
    change: "Ổn định", 
    trend: "neutral", 
    icon: ShieldCheck,
    color: "text-primary",
    bg: "bg-primary/5"
  },
];

const RECENT_DEPLOYMENTS = [
  { id: "d1", customer: "ABC Company", script: "HRM System", time: "2 phút trước", status: "success" },
  { id: "d2", customer: "Global Tech", script: "Email Automation", time: "15 phút trước", status: "success" },
  { id: "d3", customer: "Nguyễn Văn A", script: "Finance Tool", time: "1 giờ trước", status: "failed" },
  { id: "d4", customer: "Trần Thị B", script: "HRM System", time: "3 giờ trước", status: "success" },
  { id: "d5", customer: "H-Soft", script: "Inventory Sync", time: "5 giờ trước", status: "success" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-foreground tracking-tight">Bảng điều khiển hệ thống</h2>
        <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest mt-1">Tổng quan hiệu năng và trạng thái vận hành thời gian thực.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, idx) => (
          <Card key={idx} className="rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                {stat.trend === "up" ? (
                  <Badge variant="outline" className="text-[10px] font-bold text-emerald-600 border-emerald-100 bg-emerald-50 gap-1">
                    <ArrowUpRight className="w-3 h-3" /> {stat.change}
                  </Badge>
                ) : stat.trend === "down" ? (
                  <Badge variant="outline" className="text-[10px] font-bold text-destructive border-destructive/10 bg-destructive/5 gap-1">
                    <ArrowDownRight className="w-3 h-3" /> {stat.change}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-[10px] font-bold text-muted-foreground border-muted/20 bg-muted/5">
                    {stat.change}
                  </Badge>
                )}
              </div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.title}</p>
              <p className="text-2xl font-black text-foreground tracking-tighter">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-2xl border shadow-sm">
          <CardHeader className="p-6 border-b">
            <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
              <Activity className="w-4 h-4 text-primary" />
              Triển khai gần đây
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="h-12 border-b">
                  <TableHead className="px-6 text-[10px] font-black uppercase">Khách hàng</TableHead>
                  <TableHead className="text-[10px] font-black uppercase">Sản phẩm</TableHead>
                  <TableHead className="text-[10px] font-black uppercase">Thời gian</TableHead>
                  <TableHead className="text-right px-6 text-[10px] font-black uppercase">Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECENT_DEPLOYMENTS.map((d) => (
                  <TableRow key={d.id} className="h-16 border-b last:border-0 hover:bg-muted/5 transition-colors group">
                    <TableCell className="px-6 font-bold text-xs uppercase tracking-tight">{d.customer}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[9px] font-bold px-2 h-5 border-none bg-primary/5 text-primary uppercase">
                        {d.script}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[10px] text-muted-foreground font-medium italic">{d.time}</TableCell>
                    <TableCell className="text-right px-6">
                      <Badge variant="outline" className={`text-[9px] font-black uppercase tracking-tighter ${
                        d.status === 'success' ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-destructive/5 text-destructive border-destructive/20"
                      }`}>
                        {d.status === 'success' ? "Thành công" : "Thất bại"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border shadow-sm overflow-hidden">
          <CardHeader className="p-6 border-b bg-primary/5">
            <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-primary">
              <Monitor className="w-4 h-4" />
              Sức khỏe hệ thống
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> API Gateway
                </span>
                <Badge variant="outline" className="text-[9px] font-bold bg-emerald-50 text-emerald-700 border-emerald-200">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> License Server
                </span>
                <Badge variant="outline" className="text-[9px] font-bold bg-emerald-50 text-emerald-700 border-emerald-200">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" /> Backup Service
                </span>
                <Badge variant="outline" className="text-[9px] font-bold bg-amber-50 text-amber-700 border-amber-200">Processing</Badge>
              </div>
            </div>

            <div className="pt-6 border-t">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">Hoạt động tải server</p>
              <div className="flex items-end gap-1 h-20">
                {[40, 60, 45, 70, 55, 90, 65, 80, 50, 60, 75, 55].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary transition-colors cursor-help" 
                    style={{ height: `${h}%` }}
                    title={`Load: ${h}%`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
