import { useState } from "react";
import { 
  Key, 
  Search, 
  Plus, 
  Trash2, 
  ShieldCheck,
  User,
  Clock,
  Code,
  Globe,
  Send,
  ExternalLink,
  RefreshCw,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const MOCK_LICENSES = [
  { 
    id: "l1", 
    customer: "ABC Company", 
    email: "contact@abc.com", 
    script: "HRM System", 
    licenseKey: "A1B2-C3D4-E5F6-G7H8",
    expiry: "2027-04-08", 
    status: "active",
    deployedSheetsId: "1ABC...xyz",
    deployedScriptId: "AKfyc...",
    allowedDomains: ["abc.com"]
  },
  { 
    id: "l2", 
    customer: "Global Tech", 
    email: "admin@globaltech.vn", 
    script: "Email Marketing", 
    licenseKey: "X9Y8-Z7W6-V5U4-T3S2",
    expiry: "2025-05-20", 
    status: "pending",
    deployedSheetsId: null,
    deployedScriptId: null,
    allowedDomains: ["globaltech.vn"]
  },
];

export default function AdminLicensesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeployDialogOpen, setIsDeployDialogOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<any>(null);
  const [sheetsUrl, setSheetsUrl] = useState("");
  const { toast } = useToast();

  const filtered = MOCK_LICENSES.filter(l => 
    l.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.licenseKey.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeploy = () => {
    // Giả lập gọi API /api/deploy
    toast({
      title: "Đang triển khai...",
      description: `Đang cài đặt script vào Sheets cho ${selectedLicense.customer}`,
    });
    
    setTimeout(() => {
      setIsDeployDialogOpen(false);
      setSheetsUrl("");
      toast({
        title: "Triển khai thành công ✅",
        description: "Menu HRM System sẽ xuất hiện trên Sheets của khách sau khi F5.",
      });
    }, 1500);
  };

  const handleUndeploy = (licenseKey: string) => {
    if (confirm("Bạn có chắc chắn muốn gỡ bỏ script khỏi Sheets của khách hàng này?")) {
      toast({
        title: "Đã gỡ bỏ script thành công",
        description: `License ${licenseKey} đã được ngắt kết nối.`,
      });
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground tracking-tight">Quản lý Giấy phép (Licenses)</h2>
          <p className="text-muted-foreground text-xs font-medium italic">Quy trình: Generate Key → Gửi khách → Nhận Sheets URL → Deploy.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="sm" className="gap-1.5 font-bold text-xs px-4 rounded-lg shadow-sm border-primary/20 text-primary hover:bg-primary/5">
            <RefreshCw className="w-3.5 h-3.5" /> Update Code All
          </Button>
          <Button size="sm" className="gap-1.5 font-bold text-xs px-4 rounded-lg shadow-sm">
            <Plus className="w-3.5 h-3.5" /> Cấp License mới
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="rounded-xl border shadow-sm p-4 flex flex-col gap-1 bg-gradient-to-br from-background to-muted/20">
          <span className="text-[10px] font-bold text-muted-foreground uppercase">Tổng License</span>
          <span className="text-2xl font-bold tracking-tighter">1,248</span>
        </Card>
        <Card className="rounded-xl border shadow-sm p-4 flex flex-col gap-1 bg-gradient-to-br from-background to-emerald-50/30">
          <span className="text-[10px] font-bold text-emerald-600 uppercase">Đã Deploy</span>
          <span className="text-2xl font-bold text-emerald-600 tracking-tighter">1,120</span>
        </Card>
        <Card className="rounded-xl border shadow-sm p-4 flex flex-col gap-1 bg-gradient-to-br from-background to-amber-50/30">
          <span className="text-[10px] font-bold text-amber-600 uppercase">Chờ Setup</span>
          <span className="text-2xl font-bold text-amber-600 tracking-tighter">128</span>
        </Card>
        <Card className="rounded-xl border shadow-sm p-4 flex flex-col gap-1 bg-gradient-to-br from-background to-destructive/5">
          <span className="text-[10px] font-bold text-destructive uppercase">Hết hạn</span>
          <span className="text-2xl font-bold text-destructive tracking-tighter">42</span>
        </Card>
      </div>

      <Card className="rounded-xl border shadow-sm bg-card overflow-hidden">
        <CardHeader className="p-5 border-b bg-muted/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Danh sách License & Deployment
            </CardTitle>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Tìm khách hàng, license key..."
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
                <TableHead className="px-5">Khách hàng / Domain</TableHead>
                <TableHead>License Key / Script</TableHead>
                <TableHead>Trạng thái Setup</TableHead>
                <TableHead>Hết hạn</TableHead>
                <TableHead className="text-right px-5">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lic) => (
                <TableRow key={lic.id} className="h-16 border-b last:border-0 hover:bg-muted/5 transition-colors group">
                  <TableCell className="px-5">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold flex items-center gap-1.5 uppercase tracking-tight">
                        <User className="w-3 h-3 text-primary/60" /> {lic.customer}
                      </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Globe className="w-2.5 h-2.5 opacity-50" /> {lic.allowedDomains.join(", ")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <Key className="w-3 h-3 text-amber-500" />
                        <code className="text-[10px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded border">
                          {lic.licenseKey}
                        </code>
                      </div>
                      <span className="text-[10px] text-primary font-bold mt-1 uppercase tracking-tighter opacity-80">{lic.script}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {lic.deployedSheetsId ? (
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline" className="w-fit text-[9px] font-black uppercase tracking-tighter bg-emerald-50 text-emerald-700 border-emerald-200">
                          Already Deployed
                        </Badge>
                        <a 
                          href={`https://docs.google.com/spreadsheets/d/${lic.deployedSheetsId}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-[9px] text-blue-600 hover:underline flex items-center gap-0.5 font-medium"
                        >
                          <ExternalLink className="w-2.5 h-2.5" /> View Sheet
                        </a>
                      </div>
                    ) : (
                      <Badge variant="outline" className="w-fit text-[9px] font-black uppercase tracking-tighter bg-amber-50 text-amber-700 border-amber-200">
                        Pending Setup
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Clock className="w-3 h-3" /> {lic.expiry}
                    </div>
                  </TableCell>
                  <TableCell className="text-right px-5">
                    <div className="flex items-center justify-end gap-1.5">
                      {!lic.deployedSheetsId ? (
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="h-7 px-3 text-[10px] font-bold gap-1 rounded-md bg-primary hover:bg-primary/90"
                          onClick={() => {
                            setSelectedLicense(lic);
                            setIsDeployDialogOpen(true);
                          }}
                        >
                          <Send className="w-3 h-3" /> Deploy
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 px-3 text-[10px] font-bold gap-1 rounded-md border-destructive/20 text-destructive hover:bg-destructive/5"
                          onClick={() => handleUndeploy(lic.licenseKey)}
                        >
                          <XCircle className="w-3 h-3" /> Undeploy
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="h-8 w-8 rounded-lg text-muted-foreground opacity-30 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog Triển khai */}
      <Dialog open={isDeployDialogOpen} onOpenChange={setIsDeployDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-base font-bold uppercase tracking-tight">Triển khai App Script</DialogTitle>
            <DialogDescription className="text-xs">
              Nhập Sheets URL từ khách hàng để cài đặt hệ thống cho <b>{selectedLicense?.customer}</b>.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="sheets-url" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Google Sheets URL</Label>
              <Input
                id="sheets-url"
                placeholder="https://docs.google.com/spreadsheets/d/..."
                value={sheetsUrl}
                onChange={(e) => setSheetsUrl(e.target.value)}
                className="text-xs h-10 rounded-lg border-primary/20 focus:border-primary shadow-inner"
              />
              <p className="text-[10px] text-muted-foreground italic">
                * Lưu ý: Đảm bảo khách hàng đã share quyền "Editor" cho Service Account.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setIsDeployDialogOpen(false)} className="text-xs font-bold">Hủy</Button>
            <Button size="sm" onClick={handleDeploy} disabled={!sheetsUrl} className="text-xs font-bold px-6 bg-primary hover:bg-primary/90">
              Xác nhận Deploy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
