import { 
  FileText, 
  Share2, 
  Send, 
  CheckCircle2, 
  RefreshCcw, 
  HelpCircle,
  Copy,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const STEPS = [
  {
    title: "BƯỚC 1: Tạo Google Sheets",
    description: "Truy cập sheets.google.com và tạo một trang tính mới. Đặt tên gợi nhớ cho hệ thống của bạn (ví dụ: HRM System - ABC Corp).",
    icon: FileText,
    link: "https://sheets.new",
    linkText: "Tạo Sheets ngay"
  },
  {
    title: "BƯỚC 2: Chia sẻ quyền truy cập",
    description: "Click nút 'Chia sẻ' (Share). Nhập email Service Account của chúng tôi, chọn quyền 'Người chỉnh sửa' (Editor) và bỏ chọn 'Thông báo cho mọi người'.",
    icon: Share2,
    serviceAccount: "hrm-deploy@your-project.iam.gserviceaccount.com"
  },
  {
    title: "BƯỚC 3: Gửi Sheets URL",
    description: "Copy đường dẫn (URL) của trang tính bạn vừa tạo và gửi lại cho chúng tôi qua email hoặc form đăng ký.",
    icon: Send
  }
];

export default function CustomerGuide() {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Đã sao chép!",
      description: "Email đã được lưu vào bộ nhớ tạm.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />
      
      <main className="container max-w-4xl mx-auto pt-24 pb-16 px-4">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Badge variant="outline" className="mb-3 px-3 py-1 text-[10px] font-bold uppercase tracking-widest border-primary/20 text-primary bg-primary/5">
            Hướng dẫn cài đặt (2 Phút)
          </Badge>
          <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Kích hoạt hệ thống HRM của bạn</h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">
            Hệ thống của chúng tôi hoạt động trực tiếp trên Google Sheets của bạn. 
            Bạn làm chủ 100% dữ liệu, chúng tôi chỉ hỗ trợ cài đặt mã nguồn tự động.
          </p>
        </div>

        <div className="grid gap-8 mb-16 relative">
          <div className="absolute left-6 top-8 bottom-8 w-px bg-slate-200 hidden md:block" />
          
          {STEPS.map((step, idx) => (
            <div key={idx} className="relative flex flex-col md:flex-row gap-6 animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
              <div className="z-10 w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center shadow-sm shrink-0">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              
              <Card className="flex-1 rounded-2xl border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black text-slate-400">0{idx + 1} / 03</span>
                    <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4 font-medium">{step.description}</p>
                  
                  {step.link && (
                    <Button asChild size="sm" variant="outline" className="h-8 text-[10px] font-bold rounded-lg gap-1.5 border-primary/20 text-primary hover:bg-primary/5">
                      <a href={step.link} target="_blank" rel="noreferrer">
                        {step.linkText} <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  )}

                  {step.serviceAccount && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <code className="text-[10px] font-mono font-bold text-slate-600 truncate max-w-full">
                        {step.serviceAccount}
                      </code>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard(step.serviceAccount!)}
                        className="h-7 text-[10px] font-bold gap-1 rounded-md shrink-0 hover:bg-white hover:shadow-sm"
                      >
                        <Copy className="w-3 h-3" /> Copy Email
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <Card className="rounded-3xl border-none shadow-xl shadow-primary/5 bg-gradient-to-br from-primary to-indigo-600 text-white overflow-hidden">
          <CardContent className="p-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
              <RefreshCcw className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold mb-3 tracking-tight">Cài đặt hoàn tất ngay lập tức!</h2>
            <p className="text-white/80 text-[11px] font-medium max-w-md mb-8 leading-relaxed">
              Sau khi nhận được URL, hệ thống sẽ tự động cài đặt mã nguồn vào Sheets của bạn trong vòng 1-2 phút. 
              Refresh Sheets và bạn sẽ thấy menu HRM System xuất hiện.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button className="bg-white text-primary hover:bg-slate-100 h-10 px-6 rounded-xl font-bold text-xs shadow-lg shadow-black/10">
                Tôi đã có License Key
              </Button>
              <Button variant="outline" className="h-10 px-6 rounded-xl font-bold text-xs border-white/20 hover:bg-white/10 text-white">
                Liên hệ hỗ trợ
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <HelpCircle className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Có thắc mắc?</span>
          </div>
          <div className="flex gap-6 text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
            <a href="#" className="hover:text-primary transition-colors">Bảo mật dữ liệu</a>
            <a href="#" className="hover:text-primary transition-colors">Điều khoản dịch vụ</a>
            <a href="#" className="hover:text-primary transition-colors">Câu hỏi thường gặp</a>
          </div>
        </div>
      </main>
    </div>
  );
}
