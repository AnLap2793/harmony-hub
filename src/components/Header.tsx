import { useState } from "react";
import { Menu, X, Grid3X3, Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-card shadow-md h-[70px] flex items-center">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Grid3X3 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">GAS Portal</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Dịch vụ
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Yêu cầu của tôi
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Hướng dẫn
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">3</span>
          </Button>
          <Button size="sm">
            <Shield className="w-4 h-4 mr-1.5" />
            Đăng nhập
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-card shadow-lg md:hidden border-t border-border">
          <nav className="flex flex-col p-4 gap-3">
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-primary py-2">Dịch vụ</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary py-2">Yêu cầu của tôi</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary py-2">Hướng dẫn</a>
            <Button size="sm" className="mt-2">
              <Shield className="w-4 h-4 mr-1.5" />
              Đăng nhập
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
