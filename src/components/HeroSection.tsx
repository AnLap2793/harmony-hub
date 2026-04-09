import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const HeroSection = ({ searchQuery, onSearchChange }: HeroSectionProps) => {
  return (
    <section
      className="relative pt-[70px] overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/80 to-foreground/50" />

      <div className="relative container py-16 md:py-24 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-up">
          Cổng Dịch Vụ Số Nội Bộ
        </h1>
        <p className="text-primary-foreground/80 text-base md:text-lg max-w-2xl mx-auto mb-8 animate-fade-in-up-delay-1">
          Truy cập và quản lý các công cụ nghiệp vụ tự động hoá. Đơn giản, nhanh chóng, được phân quyền rõ ràng.
        </p>

        <div className="max-w-lg mx-auto relative animate-fade-in-up-delay-2">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm dịch vụ..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-11 h-12 bg-card/95 backdrop-blur-sm border-none shadow-lg text-foreground placeholder:text-muted-foreground rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
