import { Toaster } from "@/components/ui/toaster.jsx";
import { Toaster as Sonner } from "@/components/ui/sonner.jsx";
import { TooltipProvider } from "@/components/ui/tooltip.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import Index from "./pages/Index.jsx";
import Lessons from "./pages/Lessons.jsx";
import Canvas from "./pages/Canvas.jsx";
import Critique from "./pages/Critique.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Gallery from "./pages/Gallery.jsx";
import Community from "./pages/Community.jsx";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/lessons" element={
              <ProtectedRoute>
                <Lessons />
              </ProtectedRoute>
            } />
            <Route path="/canvas/:lessonId" element={
              <ProtectedRoute>
                <Canvas />
              </ProtectedRoute>
            } />
            <Route path="/critique" element={
              <ProtectedRoute>
                <Critique />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/gallery" element={
              <ProtectedRoute>
                <Gallery />
              </ProtectedRoute>
            } />
            <Route path="/community" element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
