import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

// Định nghĩa schema validation bằng Zod
const formSchema = z.object({
  name: z.string().min(2, "Tên script phải có ít nhất 2 ký tự"),
  description: z.string().optional(),
  script_id: z.string().min(10, "Script ID không hợp lệ"),
  deployment_id: z.string().optional(),
  category: z.string().min(1, "Vui lòng chọn phòng ban/phân loại"),
  status: z.enum(["active", "inactive", "deprecated"]).default("active"),
});

type ScriptFormValues = z.infer<typeof formSchema>;

interface ScriptFormProps {
  initialData?: Partial<ScriptFormValues>;
  onSubmit: (values: ScriptFormValues) => void;
  isLoading?: boolean;
}

export function ScriptForm({ initialData, onSubmit, isLoading }: ScriptFormProps) {
  const form = useForm<ScriptFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      script_id: initialData?.script_id || "",
      deployment_id: initialData?.deployment_id || "",
      category: initialData?.category || "Chung",
      status: initialData?.status || "active",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên App Script</FormLabel>
              <FormControl>
                <Input placeholder="Ví dụ: Tự động gửi báo cáo doanh thu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phân loại / Phòng ban</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phòng ban" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Tài chính">Tài chính</SelectItem>
                    <SelectItem value="Nhân sự">Nhân sự</SelectItem>
                    <SelectItem value="Kinh doanh">Kinh doanh</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="IT">IT / Kỹ thuật</SelectItem>
                    <SelectItem value="Chung">Chung</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Tạm dừng</SelectItem>
                    <SelectItem value="deprecated">Ngừng hỗ trợ</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="script_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Google Script ID</FormLabel>
              <FormControl>
                <Input placeholder="ID từ Google Apps Script Editor" {...field} />
              </FormControl>
              <FormDescription className="text-[11px]">
                Lấy từ URL: script.google.com/home/projects/<b>[ID]</b>/edit
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deployment_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deployment ID (Tùy chọn)</FormLabel>
              <FormControl>
                <Input placeholder="ID khi triển khai dưới dạng Web App" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả ngắn</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Mô tả chức năng và cách sử dụng cho người dùng cuối..." 
                  className="resize-none"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Cập nhật" : "Đăng ký ngay"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
