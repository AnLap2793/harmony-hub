import { useState } from "react";
import { FileSpreadsheet, Mail, BarChart3, Users, FileText, Calendar, Database, Workflow } from "lucide-react";
import ServiceCard, { type Service } from "./ServiceCard";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["Tất cả", "Tài chính", "Nhân sự", "Marketing", "Vận hành", "Báo cáo"];

const MOCK_SERVICES: Service[] = [
  {
    id: "1",
    name: "Tổng hợp Báo cáo Doanh thu",
    description: "Tự động kéo dữ liệu từ nhiều nguồn và tạo báo cáo doanh thu hàng tuần.",
    department: "Phòng Tài chính",
    icon: BarChart3,
    status: "granted",
    category: "Tài chính",
  },
  {
    id: "2",
    name: "Gửi Email Hàng Loạt",
    description: "Gửi email cá nhân hoá từ Google Sheets tới danh sách khách hàng.",
    department: "Phòng Marketing",
    icon: Mail,
    status: "granted",
    category: "Marketing",
  },
  {
    id: "3",
    name: "Quản lý Chấm Công",
    description: "Đồng bộ dữ liệu chấm công từ máy chấm công vào Google Sheets.",
    department: "Phòng Nhân sự",
    icon: Users,
    status: "no_access",
    category: "Nhân sự",
  },
  {
    id: "4",
    name: "Tạo Hợp Đồng Tự Động",
    description: "Tạo hợp đồng PDF từ template và dữ liệu khách hàng trong Sheets.",
    department: "Phòng Vận hành",
    icon: FileText,
    status: "pending",
    category: "Vận hành",
  },
  {
    id: "5",
    name: "Đồng Bộ Lịch & Tasks",
    description: "Đồng bộ lịch họp và công việc giữa Google Calendar và Sheets.",
    department: "Tất cả bộ phận",
    icon: Calendar,
    status: "expiring",
    category: "Vận hành",
  },
  {
    id: "6",
    name: "Xuất Dữ Liệu Kho",
    description: "Xuất báo cáo tồn kho theo thời gian thực từ hệ thống quản lý kho.",
    department: "Phòng Vận hành",
    icon: Database,
    status: "rejected",
    category: "Vận hành",
  },
  {
    id: "7",
    name: "Tổng Hợp KPI Nhân Viên",
    description: "Thu thập và tính toán KPI nhân viên theo quý từ nhiều nguồn dữ liệu.",
    department: "Phòng Nhân sự",
    icon: FileSpreadsheet,
    status: "no_access",
    category: "Nhân sự",
  },
  {
    id: "8",
    name: "Workflow Phê Duyệt",
    description: "Tự động hoá quy trình phê duyệt đơn từ, đề xuất qua email và Sheets.",
    department: "Tất cả bộ phận",
    icon: Workflow,
    status: "granted",
    category: "Báo cáo",
  },
];

interface ServiceCatalogProps {
  searchQuery: string;
}

const ServiceCatalog = ({ searchQuery }: ServiceCatalogProps) => {
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filtered = MOCK_SERVICES.filter((s) => {
    const matchesCategory = activeCategory === "Tất cả" || s.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpen = (service: Service) => {
    console.log("Opening service:", service.id);
  };

  return (
    <section id="services" className="container py-12 md:py-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Danh mục dịch vụ</h2>
        <span className="text-sm text-muted-foreground">{filtered.length} dịch vụ</span>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat)}
            className="shrink-0"
          >
            {cat}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium mb-1">Không tìm thấy dịch vụ</p>
          <p className="text-sm">Thử thay đổi bộ lọc hoặc từ khoá tìm kiếm.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              onOpen={handleOpen}
              className={`animate-fade-in-up-delay-${Math.min(i, 3)}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ServiceCatalog;
