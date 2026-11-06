import { Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AppProvider } from "../context/AppContext";
import { PromoBanner } from "./PromoBanner";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <AppProvider>
      <div className="flex min-h-screen flex-col bg-[#f4f1e9] text-[#121313] transition-colors dark:bg-[#11110f] dark:text-[#f4f1e9]">
        <PromoBanner />
        <Header />
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </AppProvider>
  );
}
