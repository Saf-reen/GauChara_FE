import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Donate from "./pages/Donate";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Services from "./pages/Services";
import Programs from "./pages/Programs";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ManageBlogs from "./pages/admin/ManageBlogs";
import BlogEditor from "./pages/admin/BlogEditor";
import ManageCauses from "./pages/admin/ManageCauses";
import CauseEditor from "./pages/admin/CauseEditor";
import ManageTestimonials from "./pages/admin/ManageTestimonials";
import TestimonialEditor from "./pages/admin/TestimonialEditor";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/layout/ScrollToTop";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/services" element={<Services />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/causes" element={<Index />} /> {/* Temporary redirect to home section */}

            {/* Admin Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            <Route path="/admin/blogs" element={<ManageBlogs />} />
            <Route path="/admin/blogs/new" element={<BlogEditor />} />
            <Route path="/admin/blogs/edit/:id" element={<BlogEditor />} />

            <Route path="/admin/causes" element={<ManageCauses />} />
            <Route path="/admin/causes/new" element={<CauseEditor />} />
            <Route path="/admin/causes/edit/:id" element={<CauseEditor />} />

            <Route path="/admin/testimonials" element={<ManageTestimonials />} />
            <Route path="/admin/testimonials/new" element={<TestimonialEditor />} />
            <Route path="/admin/testimonials/edit/:id" element={<TestimonialEditor />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
