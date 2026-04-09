import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Globe, 
  Star,
  MessageCircle,
  PlayCircle,
  ChevronRight,
  ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";

const MOCK_SCRIPTS_DETAILS: Record<string, any> = {
  "1": {
    name: "HRM System - Quản lý nhân sự",
    category: "Nhân sự",
    price: "4.500.000 VNĐ",
    description: "Hệ thống quản lý chấm công, tính lương và hồ sơ nhân viên tự động trên Google Sheets. Giải pháp toàn diện cho doanh nghiệp vừa và nhỏ.",
    features: [
      "Quản lý hồ sơ nhân viên tập trung",
      "Chấm công tự động từ máy vân tay/App",
      "Tính lương tự động theo công thức tùy chỉnh",
      "Quản lý nghỉ phép và tăng ca",
      "Hệ thống báo cáo nhân sự Dashboard trực quan"
    ],
    stats: { users: "1.2k+", rating: "4.9", reviews: "128" },
    demoUrl: "#"
  },
  "2": {
    name: "Email Automation Pro",
    category: "Marketing",
    price: "2.900.000 VNĐ",
    description: "Tự động hóa quy trình gửi email cá nhân hóa hàng loạt từ danh sách khách hàng. Tích hợp Gmail API tốc độ cao.",
    features: [
      "Gửi email cá nhân hóa (Mail Merge)",
      "Theo dõi lượt mở và click link",
      "Lên lịch gửi tự động",
      "Tích hợp tệp đính kèm động",
      "Trình biên soạn mẫu email chuyên nghiệp"
    ],
    stats: { users: "850+", rating: "4.8", reviews: "94" },
    demoUrl: "#"
  },
  "3": {
    name: "Financial Reporting Tool",
    category: "Tài chính",
    price: "3.200.000 VNĐ",
    description: "Tổng hợp dữ liệu thu chi và tạo báo cáo tài chính tự động dưới dạng dashboard trực quan trên Google Sheets.",
    features: [
      "Tự động lấy dữ liệu từ nhiều nguồn",
      "Dashboard biểu đồ trực quan",
      "Báo cáo P&L tự động",
      "Cảnh báo vượt ngân sách qua Telegram",
      "Xuất báo cáo PDF/Excel định kỳ"
    ],
    stats: { users: "2.1k+", rating: "5.0", reviews: "215" },
    demoUrl: "#"
  }
};

export default function UserAppScriptDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const script = MOCK_SCRIPTS_DETAILS[id || "1"] || MOCK_SCRIPTS_DETAILS["1"];

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />
      
      <main className="container max-w-6xl mx-auto pt-28 pb-16 px-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/")}
          className="mb-8 gap-2 text-muted-foreground hover:text-primary transition-colors font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh mục
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black uppercase tracking-widest px-3 py-1">
                {script.category}
              </Badge>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight uppercase">
                {script.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-500" /> {script.stats.rating}
                  <span className="text-slate-400 font-medium ml-1">({script.stats.reviews} đánh giá)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 font-bold">
                  <Globe className="w-4 h-4" /> {script.stats.users} người tin dùng
                </div>
              </div>
            </div>

            <div className="aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative group cursor-pointer border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" 
                alt="Demo" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform shadow-2xl">
                  <PlayCircle className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <span className="text-xs font-bold uppercase tracking-widest bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">Xem Video Demo</span>
                <span className="text-xs font-bold opacity-80">2:45 min</span>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Chi tiết sản phẩm</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                {script.description} 
                Nền tảng của chúng tôi tận dụng tối đa sức mạnh của Google Apps Script để mang lại hiệu năng cao nhất, 
                đảm bảo tính bảo mật và sự linh hoạt tối đa trên nền tảng đám mây của Google.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {script.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-[13px] font-bold text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Pricing & CTAs */}
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 delay-150">
            <Card className="rounded-3xl border-none shadow-2xl overflow-hidden sticky top-28">
              <CardContent className="p-8">
                <div className="mb-8">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Giá trọn gói</p>
                  <p className="text-4xl font-black text-primary tracking-tighter">{script.price}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                    <Zap className="w-4 h-4 text-amber-500" /> Triển khai trong 2 phút
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> Bảo hành trọn đời
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                    <Clock className="w-4 h-4 text-blue-500" /> Support 24/7
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full h-14 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase">
                    <ShoppingCart className="w-4 h-4" /> Mua ngay bây giờ
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-14 rounded-2xl font-black text-sm gap-2 border-slate-200 hover:bg-slate-50 transition-all uppercase"
                    onClick={() => navigate("/guide")}
                  >
                    Xem hướng dẫn cài đặt
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-primary text-white text-[10px] flex items-center justify-center font-bold">+12</div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Đang xem trang này</span>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-primary" />
                <h4 className="font-bold text-sm">Cần tư vấn thêm?</h4>
              </div>
              <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                Đội ngũ kỹ thuật của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn về sản phẩm.
              </p>
              <Button variant="link" className="text-primary p-0 h-auto font-black text-xs uppercase tracking-widest gap-1 hover:no-underline group">
                Trò chuyện ngay <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
