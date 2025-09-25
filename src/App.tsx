import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import InviteAdmin from "./pages/InviteAdmin";
import CreateWarehouse from "./pages/CreateWarehouse";
import ProductRegistration from "./pages/ProductRegistration";
import AssignProductToWarehouse from "./pages/AssignProductToWarehouse";
import SearchProducts from "./pages/SearchProducts";
import InviteWarehouseAdmin from "./pages/InviteWarehouseAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/invite-admin" element={<InviteAdmin />} />
          <Route path="/create-warehouse" element={<CreateWarehouse />} />
          <Route path="/product-registration" element={<ProductRegistration />} />
          <Route path="/assign-product" element={<AssignProductToWarehouse />} />
          <Route path="/search-products" element={<SearchProducts />} />
          <Route path="/invite-warehouse-admin" element={<InviteWarehouseAdmin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
