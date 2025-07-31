import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Heart, Target, Users, BookOpen, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  const handleBackToMain = () => {
    navigate("/");
    // Scroll to about section after navigation
    setTimeout(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView();
      }
    }, 100);
  };

  return (
    <div className="about-us">
      {/* Header */}
      <header className="about-header-nav">
        <div className="about-header-container">
          <Button 
            variant="ghost" 
            onClick={handleBackToMain}
            className="about-back-button"
          >
            <ArrowLeft />
            Înapoi la pagina principală
          </Button>
        </div>
      </header>

      <div className="about-container">
        <div className="about-content">
          {/* Header Section */}
          <div className="about-header">
            <div className="about-badge">
              <Sparkles />
              <span>Despre noi</span>
            </div>
            <h1>Despre noi</h1>
            <p className="about-text">
              Suntem dedicați educației moderne și inovării în predarea desenului. 
              Platforma noastră oferă lecții interactive și exerciții practice pentru a transforma 
              învățarea desenului într-o experiență captivantă și accesibilă.
            </p>
            <p className="about-text">
              Povestea noastră a început cu o simplă întrebare: cum putem face ca arta desenului 
              să prindă viață și să devină mai ușor de înțeles pentru toți cei care o studiază? 
              Ne-am propus să construim un spațiu digital unde utilizatorii să poată vedea cu ochii 
              lor cum se construiește un portret, cum se înțeleg proporțiile sau cum expresiile 
              prind viață pe hârtie.
            </p>
          </div>

          {/* Features Section */}
          <div className="about-features">
            <div className="feature-item">
              <div className="feature-icon">
                <Heart />
              </div>
              <h3>Pasiune pentru Artă</h3>
              <p>Credem că fiecare persoană are potențialul de a crea artă remarcabilă</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <Target />
              </div>
              <h3>Tehnologie Avansată</h3>
              <p>Combinăm expertiza cu puterea tehnologiei moderne pentru o experiență optimă</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <Users />
              </div>
              <h3>Comunitate Activată</h3>
              <p>Construim o comunitate de artiști pasionați de învățare și dezvoltare</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <BookOpen />
              </div>
              <h3>Învățare Continuă</h3>
              <p>Oferim resurse și metode inovatoare pentru dezvoltarea abilităților artistice</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="about-cta">
            <Button className="about-button">
              Începe să desenezi
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 