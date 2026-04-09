import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Star,
  Users,
  Code2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const MOCK_SERVICES = [
  { 
    id: "1", 
    name: "HRM System", 
    category: "Nhân sự", 
    description: "Quản lý chấm công, tính lương và hồ sơ nhân sự tự động 100% trên Google Sheets.",
    price: "4.5M VNĐ",
    rating: "4.9",
    users: "1.2k",
    featured: true
  },
  { 
    id: "2", 
    name: "Email Automation", 
    category: "Marketing", 
    description: "Gửi email cá nhân hóa hàng loạt từ danh sách khách hàng tích hợp Gmail API.",
    price: "2.9M VNĐ",
    rating: "4.8",
    users: "850",
    featured: false
  },
  { 
    id: "3", 
    name: "Finance Tool", 
    category: "Tài chính", 
    description: "Tổng hợp báo cáo thu chi và Dashboard tài chính trực quan từ nhiều nguồn dữ liệu.",
    price: "3.2M VNĐ",
    rating: "5.0",
    users: "2.1k",
    featured: true
  },
  { 
    id: "4", 
    name: "Inventory Sync", 
    category: "Vận hành", 
    description: "Đồng bộ tồn kho đa kênh và cảnh báo hàng tồn tự động qua Telegram/Email.",
    price: "3.8M VNĐ",
    rating: "4.7",
    users: "420",
    featured: false
  },
  { 
    id: "5", 
    name: "CRM Lite", 
    category: "Kinh doanh", 
    description: "Quản lý quy trình bán hàng và chăm sóc khách hàng đơn giản, hiệu quả trên trang tính.",
    price: "2.5M VNĐ",
    rating: "4.8",
    users: "1.5k",
    featured: false
  },
  { 
    id: "6", 
    name: "Contract Generator", 
    category: "Pháp lý", 
    description: "Tự động tạo file PDF hợp đồng từ dữ liệu khách hàng chỉ với 1 click.",
    price: "1.8M VNĐ",
    rating: "4.9",
    users: "600",
    featured: false
  }
];

interface ServiceCatalogProps {
  searchQuery: string;
}

export default function ServiceCatalog({ searchQuery }: ServiceCatalogProps) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const categories = ["Tất cả", ...new Set(MOCK_SERVICES.map(s => s.category))];

  const filtered = MOCK_SERVICES.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Tất cả" || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase mb-4">Danh mục công cụ</h2>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Khám phá bộ sưu tập các giải pháp tự động hóa được thiết kế tối ưu cho từng phòng ban. 
              Mọi công cụ đều được triển khai an toàn và nhanh chóng.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={`h-9 px-4 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all ${
                  activeCategory === cat ? "shadow-lg shadow-primary/20" : "border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((service, idx) => (
            <Card 
              key={service.id} 
              className="group rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/app-scripts/${service.id}`)}
            >
              <CardContent className="p-0">
                <div className="aspect-[16/9] bg-slate-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/5 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-none text-[9px] font-black uppercase tracking-tighter shadow-sm">
                      {service.category}
                    </Badge>
                    {service.featured && (
                      <Badge className="bg-amber-500 text-white border-none text-[9px] font-black uppercase tracking-tighter shadow-sm flex gap-1">
                        <Zap className="w-2.5 h-2.5 fill-white" /> Phổ biến
                      </Badge>
                    )}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span className="text-xs font-black">{service.rating}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Users className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold">{service.users} tin dùng</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-2 mb-6 opacity-80">
                    {service.description}
                  </p>

                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Giá trọn gói</p>
                      <p className="text-base font-black text-primary tracking-tighter">{service.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center" title="Bảo mật">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center" title="Triển khai nhanh">
                        <Zap className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Code2 className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Không tìm thấy kết quả</h3>
            <p className="text-slate-400 text-sm font-medium">Thử tìm kiếm với từ khóa khác hoặc phòng ban khác.</p>
          </div>
        )}
      </div>
    </section>
  );
}
