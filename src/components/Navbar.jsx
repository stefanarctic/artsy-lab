import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "sonner";
import { 
  User, 
  LogOut,
  Palette
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Deconectare reușită!");
      navigate("/login");
    } catch (error) {
      toast.error("Eroare la deconectare.");
      console.error(error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <nav className="header-nav">
          <div className="header-brand" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <div className="header-logo">
              <div className="logo-icon">
                <Palette />
              </div>
              <div className="logo-dot"></div>
            </div>
            <div className="header-title">
              <h1>ArtsyLab</h1>
              <p>Studio de Învățare Creativă</p>
            </div>
          </div>
          
          <div className="header-nav-links">
            <a href="/lessons">Studio</a>
            <a href="/gallery">Galerie</a>
            <a href="/community">Comunitate</a>
            {user ? (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/profile")}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profil
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Deconectare
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Autentificare
                </Button>
                <Button 
                  size="sm"
                  onClick={() => navigate("/register")}
                >
                  Înregistrare
                </Button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;