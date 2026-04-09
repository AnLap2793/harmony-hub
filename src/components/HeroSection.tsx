import { Search, Zap, ShieldCheck, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const HeroSection = ({ searchQuery, onSearchChange }: HeroSectionProps) => {
  return (
    <section className="relative pt-[120px] pb-[80px] overflow-hidden bg-slate-950">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/30 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="relative container px-4 mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Badge className="bg-primary hover:bg-primary text-[10px] font-black uppercase px-2 py-0.5">Mới</Badge>
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Hệ thống HRM đã sẵn sàng triển khai</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.9] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          Tự động hóa <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Google Sheets</span>
        </h1>
        
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mb-10 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          Biến các trang tính của bạn thành những hệ thống quản trị mạnh mẽ. 
          Triển khai nhanh chóng, bảo mật tuyệt đối và làm chủ 100% dữ liệu của bạn.
        </p>

        <div className="max-w-xl mx-auto relative mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            placeholder="Tìm kiếm công cụ tự động hóa..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 h-14 bg-white/5 border-white/10 backdrop-blur-xl text-white placeholder:text-slate-500 rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-2xl"
          />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 animate-in fade-in duration-1000 delay-500">
          <div className="flex items-center gap-2 text-white">
            <Zap className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Deploy 2 phút</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Bảo mật Apps Script</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Globe className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Nền tảng Cloud</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
