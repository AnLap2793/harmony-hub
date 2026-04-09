import { useState } from "react";
import { 
  Users, 
  Search, 
  Plus, 
  Trash2, 
  MoreHorizontal,
  Mail,
  Calendar,
  Building2,
  ShieldCheck,
  Ban,
  MailQuestion
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const MOCK_CUSTOMERS = [
  { 
    id: "u1", 
    display_name: "Nguyễn Văn A", 
    email: "van.a@gmail.com", 
    company: "ABC Corp",
    status: "active", 
    joined_at: "2024-03-10",
    total_licenses: 2,
    domain: "@abc.com"
  },
  { 
    id: "u2", 
    display_name: "Trần Thị B", 
    email: "thi.b@hvn.vn", 
    company: "HVN Group",
    status: "active", 
    joined_at: "2024-01-15",
    total_licenses: 1,
    domain: "@hvn.vn"
  },
  { 
    id: "u3", 
    display_name: "Lê Văn C", 
    email: "le.c@outlook.com", 
    company: "Freelancer",
    status: "inactive", 
    joined_at: "2024-04-01",
    total_licenses: 0,
    domain: "@outlook.com"
  }
];

const AdminUsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = MOCK_CUSTOMERS.filter(u => 
    u.display_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground tracking-tight">Quản lý Khách hàng (Customers)</h2>
          <p className="text-muted-foreground text-xs font-medium">Lưu trữ thông tin hồ sơ và định danh khách hàng.</p>
        </div>
        <Button size="sm" className="gap-1.5 font-bold text-xs px-4 rounded-lg shadow-sm">
          <Plus className="w-3.5 h-3.5" /> Thêm khách hàng mới
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-xl border shadow-sm p-4 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase">Tổng khách hàng</span>
          <span className="text-2xl font-bold tracking-tighter text-foreground">582</span>
        </Card>
        <Card className="rounded-xl border shadow-sm p-4 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-emerald-600 uppercase">Khách hàng mới (30 ngày)</span>
          <span className="text-2xl font-bold tracking-tighter text-emerald-600">+48</span>
        </Card>
        <Card className="rounded-xl border shadow-sm p-4 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-primary uppercase">Tỷ lệ Active</span>
          <span className="text-2xl font-bold tracking-tighter text-primary">94%</span>
        </Card>
      </div>

      <Card className="rounded-xl border shadow-sm overflow-hidden bg-card">
        <CardHeader className="p-5 border-b bg-muted/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              Cơ sở dữ liệu khách hàng
            </CardTitle>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Tìm tên, email, công ty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs rounded-lg"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30 text-[10px] uppercase font-bold">
              <TableRow>
                <TableHead className="px-5">Hồ sơ khách hàng</TableHead>
                <TableHead>Công ty / Tổ chức</TableHead>
                <TableHead>Ngày đăng ký</TableHead>
                <TableHead>Giấy phép</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right px-5">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id} className="group border-b last:border-0 h-16 hover:bg-muted/5 transition-colors">
                  <TableCell className="px-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9 border-2 border-primary/10">
                        <AvatarFallback className="text-[10px] font-bold bg-primary/5 text-primary">{u.display_name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-xs text-foreground uppercase tracking-tight">{u.display_name}</span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Mail className="w-2.5 h-2.5 opacity-50" /> {u.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-foreground/80 flex items-center gap-1.5">
                        <Building2 className="w-3 h-3 opacity-50 text-primary" /> {u.company}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-medium opacity-60">Domain: {u.domain}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                      <Calendar className="w-3 h-3" /> {u.joined_at}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] font-bold px-2 h-5 bg-muted/50 border-primary/20 text-primary">
                      {u.total_licenses} licenses
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={u.status === "active" ? "default" : "secondary"} className={`text-[9px] px-2 h-5 font-black uppercase tracking-tighter ${u.status === "active" ? "bg-emerald-500" : "bg-muted text-muted-foreground"}`}>
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-40 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px] rounded-xl shadow-xl border-primary/10">
                        <DropdownMenuItem className="text-xs font-bold py-2.5 gap-2 cursor-pointer">
                          <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Xem chi tiết Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs font-bold py-2.5 gap-2 cursor-pointer">
                          <MailQuestion className="w-3.5 h-3.5 text-amber-600" /> Gửi email thông báo
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-xs font-bold py-2.5 gap-2 text-destructive cursor-pointer">
                          <Ban className="w-3.5 h-3.5" /> Khóa tài khoản tạm thời
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsersPage;
