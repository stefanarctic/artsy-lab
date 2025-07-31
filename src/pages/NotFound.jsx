import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-icon">
          <AlertTriangle />
        </div>
        <h1 className="not-found-title">404</h1>
        <p className="not-found-description">
          Oops! Pagina pe care o cauți nu există.
        </p>
        <div className="not-found-actions">
          <Button className="not-found-button primary">
            <Home />
            Înapoi la Acasă
          </Button>
          <Button variant="outline" className="not-found-button secondary">
            Contactează Suportul
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 