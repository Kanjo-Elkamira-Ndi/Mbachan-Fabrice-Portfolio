import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider, useTheme } from "@/lib/theme-context";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminCerts from "@/pages/admin/AdminCerts";
import AdminExperience from "@/pages/admin/AdminExperience";
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import AdminMessages from "@/pages/admin/AdminMessages";
import AdminTechStack from "@/pages/admin/AdminTechStack";

function AppContent() {
  const { theme } = useTheme();
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/certifications" element={<AdminCerts />} />
        <Route path="/admin/experience" element={<AdminExperience />} />
        <Route path="/admin/testimonials" element={<AdminTestimonials />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/tech-stack" element={<AdminTechStack />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster theme={theme} position="bottom-right" />
    </AuthProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
