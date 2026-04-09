import { useState, useEffect } from "react";
import { 
  Search, 
  UserPlus, 
  Trash2, 
  Loader2, 
  Shield, 
  User as UserIcon 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
}

interface ScriptPermission {
  id: string;
  user_id: string;
  permission_level: string;
  profiles: UserProfile;
}

interface ScriptPermissionsDialogProps {
  scriptId: string | null;
  scriptName: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScriptPermissionsDialog({ 
  scriptId, 
  scriptName, 
  open, 
  onOpenChange 
}: ScriptPermissionsDialogProps) {
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState<ScriptPermission[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  // Lấy danh sách quyền hiện tại của script
  const fetchPermissions = async () => {
    if (!scriptId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("app_script_permissions")
      .select(`
        id,
        user_id,
        permission_level,
        profiles:user_id (user_id, display_name, avatar_url)
      `)
      .eq("app_script_id", scriptId);

    if (error) {
      toast({ title: "Lỗi", description: "Không thể lấy danh sách quyền", variant: "destructive" });
    } else {
      setPermissions(data as any);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (open && scriptId) {
      fetchPermissions();
    }
  }, [open, scriptId]);

  // Tìm kiếm người dùng mới để thêm vào
  const searchUsers = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("user_id, display_name, avatar_url")
      .or(`display_name.ilike.%${query}%,user_id.ilike.%${query}%`)
      .limit(5);

    if (!error && data) {
      // Lọc bỏ những người đã có quyền rồi
      const existingUserIds = permissions.map(p => p.user_id);
      setSearchResults(data.filter(u => !existingUserIds.includes(u.user_id)));
    }
    setIsSearching(false);
  };

  // Thêm quyền cho user
  const addPermission = async (userId: string) => {
    if (!scriptId) return;
    const { error } = await supabase
      .from("app_script_permissions")
      .insert({
        app_script_id: scriptId,
        user_id: userId,
        permission_level: "viewer"
      });

    if (error) {
      toast({ title: "Lỗi", description: "Không thể thêm người dùng này", variant: "destructive" });
    } else {
      toast({ title: "Thành công", description: "Đã cấp quyền truy cập" });
      setSearchQuery("");
      setSearchResults([]);
      fetchPermissions();
    }
  };

  // Xóa quyền
  const removePermission = async (permissionId: string) => {
    const { error } = await supabase
      .from("app_script_permissions")
      .delete()
      .eq("id", permissionId);

    if (error) {
      toast({ title: "Lỗi", description: "Không thể xóa quyền", variant: "destructive" });
    } else {
      toast({ title: "Đã xóa quyền truy cập" });
      fetchPermissions();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground font-bold">
            <Shield className="w-5 h-5 text-primary" />
            Quản lý quyền: {scriptName}
          </DialogTitle>
          <DialogDescription>
            Cấp quyền hoặc gỡ bỏ quyền truy cập của người dùng đối với App Script này.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Ô tìm kiếm thêm User */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Tìm tên hoặc ID người dùng để thêm..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => searchUsers(e.target.value)}
              />
            </div>
            
            {searchResults.length > 0 && (
              <div className="border rounded-md shadow-sm bg-card overflow-hidden absolute z-10 w-full left-0 right-0 mt-1 max-w-[450px] mx-auto">
                {searchResults.map((u) => (
                  <div key={u.user_id} className="flex items-center justify-between p-2 hover:bg-muted/50 transition-colors border-b last:border-0">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={u.avatar_url || ""} />
                        <AvatarFallback><UserIcon className="w-4 h-4" /></AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{u.display_name || "N/A"}</span>
                        <span className="text-[10px] text-muted-foreground">{u.user_id.slice(0, 12)}...</span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => addPermission(u.user_id)}>
                      <UserPlus className="w-4 h-4 text-primary" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {isSearching && <div className="text-center py-2"><Loader2 className="w-4 h-4 animate-spin mx-auto text-muted-foreground" /></div>}
          </div>

          {/* Danh sách User hiện có quyền */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground">
              Người dùng có quyền ({permissions.length})
            </h4>
            <ScrollArea className="h-[250px] pr-4 border rounded-md p-2">
              {loading ? (
                <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
              ) : permissions.length > 0 ? (
                <div className="space-y-3">
                  {permissions.map((p) => (
                    <div key={p.id} className="flex items-center justify-between group py-1 border-b last:border-0 border-dashed">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9 border shadow-sm">
                          <AvatarImage src={p.profiles?.avatar_url || ""} />
                          <AvatarFallback><UserIcon className="w-5 h-5 text-muted-foreground" /></AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">{p.profiles?.display_name || "N/A"}</span>
                          <span className="text-[10px] text-muted-foreground px-1.5 bg-muted w-fit rounded capitalize">
                            {p.permission_level}
                          </span>
                        </div>
                      </div>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        onClick={() => removePermission(p.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                  Chưa có người dùng nào được cấp quyền.
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
