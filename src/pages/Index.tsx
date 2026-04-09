import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ServiceCatalog from "@/components/ServiceCatalog";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <StatsBar />
      <ServiceCatalog searchQuery={searchQuery} />

      <footer className="border-t border-border py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © 2026 GAS Portal — Cổng dịch vụ số nội bộ
        </div>
      </footer>
    </div>
  );
};

export default Index;
