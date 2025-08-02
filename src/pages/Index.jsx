import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "sonner";
import ConfigTest from "@/components/ConfigTest";
import { 
  Target, 
  Eye,
  Palette,
  Pencil,
  Sparkles,
  Star,
  Heart,
  ArrowRight,
  Play,
  User,
  LogOut,
  Save
} from "lucide-react";

import artIcon from "@/assets/art-icon.png";

const Index = () => {
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

  const features = [
    {
      icon: <Pencil className="w-6 h-6" />,
      title: "Canvas Interactiv",
      description: "Desenează direct în browser cu instrumente profesionale de desen"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Imagini de Referință",
      description: "Studiază și desenează folosind imagini de referință de înaltă calitate"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Feedback AI",
      description: "Primește feedback personalizat pentru fiecare desen realizat"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Progres Structurat",
      description: "Avansează prin lecții organizate pentru învățare graduală"
    }
  ];

  const artStyles = [
    {
      title: "Forma Capului",
      description: "Învață proporțiile și structura de bază a capului",
      color: "from-rose-500 to-pink-600",
      difficulty: "Începător"
    },
    {
      title: "Desenarea Ochilor",
      description: "Stăpânește tehnicile de desenare a ochilor realiști",
      color: "from-blue-500 to-cyan-600", 
      difficulty: "Începător"
    },
    {
      title: "Structura Nasului",
      description: "Înțelege și desenează nasul din diferite unghiuri",
      color: "from-purple-500 to-indigo-600",
      difficulty: "Intermediar"
    },
    {
      title: "Buzele și Gura",
      description: "Creează buze expresive și naturale",
      color: "from-amber-500 to-orange-600",
      difficulty: "Intermediar"
    }
  ];

  const toolFeatures = [
    {
      title: "Instrumente de Desen",
      description: "Creion și radieră cu dimensiune ajustabilă",
      icon: <Pencil className="w-6 h-6" />,
      highlight: "Precizie"
    },
    {
      title: "Paletă de Culori",
      description: "Selectează din culori predefinite sau personalizate",
      icon: <Palette className="w-6 h-6" />,
      highlight: "Versatilitate"
    },
    {
      title: "Salvare Automată",
      description: "Progresul tău este salvat automat",
      icon: <Save className="w-6 h-6" />,
      highlight: "Siguranță"
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case "Începător": return "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
      case "Intermediar": return "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30";
      case "Avansat": return "bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Artistic Header */}
      <header className="header">
        <div className="header-container">
          <nav className="header-nav">
            <div className="header-brand">
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
              <a href="/lessons">Lectii</a>
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

      {/* Artistic Hero Section */}
      <section className="hero">
        {/* Background Art Elements */}
        <div className="hero-background">
          <div className="bg-element-1"></div>
          <div className="bg-element-2"></div>
          <div className="bg-element-3"></div>
        </div>
        
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <Star />
                <span>Atelierul Digital de Artă</span>
              </div>
              
              <h1 className="hero-title">
                <span className="title-line-1">Creează</span>
                <span className="title-line-2">Artă Vibrantă</span>
                <span className="title-line-3">prin Tehnologie</span>
              </h1>
              
              <p className="hero-description">
                Transformă-ți pasiunea pentru artă într-o abilitate remarcabilă cu ajutorul 
                tehnologiei moderne și al experților noștri dedicați.
              </p>
              
              <div className="hero-buttons">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/lessons")}
                  className="hero-primary-button"
                >
                  <div className="button-content">
                    Începe Călătoria
                    <ArrowRight />
                  </div>
                  <div className="button-overlay"></div>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="hero-secondary-button"
                >
                  <Play />
                  Vezi Galeria
                </Button>
              </div>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <p className="stat-number">4</p>
                  <p className="stat-label">Lecții Interactive</p>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <p className="stat-number">AI</p>
                  <p className="stat-label">Feedback Instant</p>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <p className="stat-number">100%</p>
                  <p className="stat-label">Gratuit</p>
                </div>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="hero-canvas-container">
                {/* Floating Art Elements */}
                <div className="floating-element-1">
                  <Pencil />
                </div>
                <div className="floating-element-2">
                  <Heart />
                </div>
                <div className="floating-element-3">
                  <Sparkles />
                </div>
                
                {/* Main Canvas */}
                <div className="hero-canvas">
                  {/* Canvas Interface */}
                  <div className="canvas-header">
                    <div className="canvas-dots">
                      <div className="dot red"></div>
                      <div className="dot yellow"></div>
                      <div className="dot green"></div>
                    </div>
                    <div className="canvas-title">ArtsyLab Studio</div>
                  </div>
                  
                  {/* Art Icon */}
                  <div className="canvas-content">
                    <div className="canvas-art">
                      <div className="art-background"></div>
                      <img 
                        src={artIcon} 
                        alt="Art Creation"
                      />
                    </div>
                  </div>
                  
                  {/* Progress Indicators */}
                  <div className="canvas-progress">
                    <div className="progress-info">
                      <span>Creația ta</span>
                      <span>87% completă</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration Test - Remove after testing */}
      {/* <ConfigTest /> */}

      <div className="container mx-auto px-6">
        {/* Features Section */}
        <section className="features">
          <div className="features-header">
            <h2 className="features-title">
              <span>Instrumente Creative</span>
            </h2>
            <p className="features-description">
              Descoperă tehnologiile inovatoare care îți vor accelera progresul artistic
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card">
                <CardHeader className="feature-header">
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <CardTitle className="feature-title">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="feature-content">
                  <CardDescription className="feature-description">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Art Styles Section */}
        <section className="art-styles">
          <div className="art-styles-header">
            <h2 className="art-styles-title">
              <span>Stiluri de Artă</span>
            </h2>
            <p className="art-styles-description">
              Explorează diverse tehnici și stiluri artistice pentru a-ți dezvolta propriul stil unic
            </p>
          </div>
          <div className="art-styles-grid">
            {artStyles.map((style, index) => (
              <Card key={index} className="art-style-card">
                <div className={`art-style-header bg-gradient-to-br ${style.color}`}>
                  <div className="art-style-icon">
                    <Pencil />
                  </div>
                </div>
                <CardHeader className="art-style-content">
                  <div className="art-style-header-content">
                    <CardTitle className="art-style-title">{style.title}</CardTitle>
                    <Badge className={`art-style-badge ${style.difficulty.toLowerCase()}`}>
                      {style.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="art-style-description">
                    {style.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="art-style-content">
                  <Button variant="outline" className="art-style-button">
                    <Pencil />
                    Începe să practici
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tools Section */}
        <section className="tools-section py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Instrumente de Desen
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Tot ce ai nevoie pentru a începe să desenezi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {toolFeatures.map((tool, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    {tool.icon}
                  </div>
                  <CardTitle>{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="mt-2">
                    {tool.highlight}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Misiunea Noastră
              </span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Democratizăm accesul la educația artistică prin tehnologie avansată și metodologii 
              inovatoare de predare.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Credem că fiecare persoană are potențialul de a crea artă remarcabilă. Platforma noastră 
              combină expertiza instructorilor cu puterea inteligenței artificiale pentru a oferi 
              o experiență de învățare personalizată și captivantă.
            </p>
            <Button size="lg" variant="outline" className="border-2 border-primary/20 hover:border-primary hover:bg-primary/10">
              Descoperă Povestea Noastră
            </Button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>ArtsyLab</h3>
              <p>
                Platforma educațională pentru învățarea desenului artistic
              </p>
            </div>
            <div className="footer-section">
              <h4>Platformă</h4>
              <ul>
                <li><a href="#">Simulări</a></li>
                <li><a href="#">Probleme</a></li>
                <li><a href="#">Resurse</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Resurse</h4>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Ajutor</a></li>
                <li><a href="#">Documentație</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <ul>
                <li>contact@artsylab.ro</li>
                <li>+40 123 456 789</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;