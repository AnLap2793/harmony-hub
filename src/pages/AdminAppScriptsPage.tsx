import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  AlertCircle,
  ExternalLink,
  Code,
  Layout,
  Layers,
  Zap,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScriptForm } from "@/components/admin/ScriptForm";
import { useToast } from "@/hooks/use-toast";

const INITIAL_MOCK_SCRIPTS = [
  { 
    id: "1", 
    name: "HRM System - Quản lý nhân sự", 
    description: "Hệ thống quản lý chấm công, tính lương và hồ sơ nhân viên tự động trên Google Sheets.", 
    category: "Nhân sự", 
    status: "active",
    version: "v2.4.0",
    lastUpdated: "2024-04-05",
    activeDeployments: 142
  },
  { 
    id: "2", 
    name: "Email Automation Pro", 
    description: "Tự động hóa quy trình gửi email cá nhân hóa hàng loạt từ danh sách khách hàng.", 
    category: "Marketing", 
    status: "active",
    version: "v1.8.2",
    lastUpdated: "2024-03-28",
    activeDeployments: 89
  },
  { 
    id: "3", 
    name: "Financial Reporting Tool", 
    description: "Tổng hợp dữ liệu thu chi và tạo báo cáo tài chính tự động dưới dạng dashboard trực quan.", 
    category: "Tài chính", 
    status: "active",
    version: "v3.1.0",
    lastUpdated: "2024-04-08",
    activeDeployments: 256
  },
  { 
    id: "4", 
    name: "Inventory Sync Engine", 
    description: "Đồng bộ kho hàng giữa các sàn TMĐT và Google Sheets theo thời gian thực.", 
    category: "Vận hành", 
    status: "inactive",
    version: "v1.0.5",
    lastUpdated: "2024-02-15",
    activeDeployments: 12
  },
  { 
    id: "5", 
    name: "Survey & Feedback Analytics", 
    description: "Thu thập và phân tích dữ liệu từ Google Forms để đưa ra các nhận định kinh doanh.", 
    category: "Kinh doanh", 
    status: "deprecated",
    version: "v0.9.0",
    lastUpdated: "2023-11-20",
    activeDeployments: 5
  },
];

export default function AdminAppScriptsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [scripts, setScripts] = useState(INITIAL_MOCK_SCRIPTS);
  const { toast } = useToast();

  const filtered = scripts.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn gỡ bỏ App Script này?")) {
      setScripts(scripts.filter(s => s.id !== id));
      toast({ title: "Đã gỡ bỏ sản phẩm thành công" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            <Layout className="w-6 h-6 text-primary" />
            Danh mục App Scripts
          </h2>
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-1">Quản lý các gói công cụ đang cung cấp trên Catalog.</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} size="sm" className="gap-2 font-bold text-xs px-5 h-10 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
          <Plus className="w-4 h-4" /> Đăng ký Script mới
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-2xl border-none shadow-sm bg-gradient-to-br from-primary/5 to-transparent border">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Layers className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Tổng sản phẩm</p>
              <p className="text-2xl font-black text-foreground tracking-tighter">{scripts.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-none shadow-sm bg-gradient-to-br from-emerald-500/5 to-transparent border">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Đang hoạt động</p>
              <p className="text-2xl font-black text-emerald-500 tracking-tighter">
                {scripts.filter(s => s.status === 'active').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-none shadow-sm bg-gradient-to-br from-blue-500/5 to-transparent border">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Tổng lượt Deploy</p>
              <p className="text-2xl font-black text-blue-500 tracking-tighter">1,245</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl border shadow-sm bg-card overflow-hidden">
        <CardHeader className="p-5 border-b bg-muted/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
              <Code className="w-4 h-4 text-primary" />
              Danh mục sản phẩm số
            </CardTitle>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Tìm tên hoặc phân loại..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 text-xs rounded-xl bg-background border-primary/10 focus:border-primary shadow-inner"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30 text-[10px] uppercase font-black">
              <TableRow className="hover:bg-transparent border-b h-12">
                <TableHead className="px-6">Thông tin công cụ</TableHead>
                <TableHead>Phân loại</TableHead>
                <TableHead>Phiên bản</TableHead>
                <TableHead className="text-center">Đang sử dụng</TableHead>
                <TableHead className="text-center">Trạng thái</TableHead>
                <TableHead className="text-right px-6">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((script) => (
                <TableRow key={script.id} className="group border-b last:border-0 h-20 hover:bg-muted/5 transition-colors">
                  <TableCell className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-black text-sm text-foreground uppercase tracking-tight group-hover:text-primary transition-colors">{script.name}</span>
                      <span className="text-[10px] text-muted-foreground line-clamp-1 font-medium italic opacity-70">{script.description}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[9px] px-2 h-5 font-black border-none bg-primary/5 text-primary uppercase tracking-tighter">
                      {script.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-foreground">{script.version}</span>
                      <span className="text-[9px] text-muted-foreground flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> {script.lastUpdated}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-xs font-black text-foreground">{script.activeDeployments}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={`text-[9px] px-2 h-5 font-black uppercase tracking-tighter ${
                      script.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      script.status === "inactive" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      "bg-destructive/5 text-destructive border-destructive/20"
                    }`}>
                      {script.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-3 text-[10px] font-black gap-1.5 rounded-lg border-primary/20 hover:bg-primary hover:text-white transition-all shadow-sm"
                        onClick={() => navigate(`/app-scripts/${script.id}`)}
                      >
                        <ExternalLink className="w-3 h-3" /> Chi tiết
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px] rounded-xl shadow-xl border-primary/10">
                          <DropdownMenuItem className="text-xs font-bold py-2.5 gap-2 cursor-pointer">
                            <Edit className="w-3.5 h-3.5" /> Sửa cấu hình
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-xs font-bold py-2.5 gap-2 text-destructive cursor-pointer"
                            onClick={() => handleDelete(script.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Gỡ bỏ sản phẩm
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-40 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 opacity-50">
                      <AlertCircle className="w-8 h-8 text-muted-foreground" />
                      <p className="text-xs font-bold italic">Không tìm thấy sản phẩm phù hợp.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[480px] rounded-2xl shadow-2xl border-none">
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="text-lg font-black uppercase tracking-tight">Đăng ký App Script mới</DialogTitle>
            <DialogDescription className="text-xs font-medium text-muted-foreground italic">Cung cấp thông tin kỹ thuật để triển khai công cụ cho khách hàng.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <ScriptForm onSubmit={() => {
              setIsFormOpen(false);
              toast({ title: "Đã thêm sản phẩm mới thành công" });
            }} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
