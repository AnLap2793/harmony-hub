import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import CustomerGuide from "./pages/CustomerGuide.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminUsersPage from "./pages/AdminUsersPage.tsx";
import AdminLicensesPage from "./pages/AdminLicensesPage.tsx";
import AdminAppScriptsPage from "./pages/AdminAppScriptsPage.tsx";
import UserAppScriptDetailPage from "./pages/UserAppScriptDetailPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/guide" element={<CustomerGuide />} />
            <Route path="/app-scripts/:id" element={<UserAppScriptDetailPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="licenses" element={<AdminLicensesPage />} />
              <Route path="app-scripts" element={<AdminAppScriptsPage />} />
              <Route path="settings" element={<div className="p-4 text-xs font-bold">Cài đặt hệ thống (Đang phát triển)</div>} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
