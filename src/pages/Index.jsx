import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Target, 
  BarChart3, 
  Users,
  Eye,
  Palette,
  PenTool,
  Award,
  Brush,
  Sparkles,
  Star,
  Heart,
  ArrowRight,
  Play
} from "lucide-react";

import artIcon from "@/assets/art-icon.png";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brush className="w-6 h-6" />,
      title: "Tehnici Interactive",
      description: "Învață prin practică cu exerciții hands-on și feedback instant"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Vizualizare 3D",
      description: "Explorează anatomia și proporțiile cu modele interactive 3D"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Feedback",
      description: "Primește sugestii personalizate pentru îmbunătățirea desenelor"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Progres Gamificat",
      description: "Urmărește-ți evoluția prin sistemul nostru de realizări"
    }
  ];

  const artStyles = [
    {
      title: "Portrete Realiste",
      description: "Masterizează tehnicile de redare foto-realistă",
      color: "from-rose-500 to-pink-600",
      difficulty: "Avansat"
    },
    {
      title: "Schițe Rapide",
      description: "Dezvoltă-ți viteza și precizia în capturarea esenței",
      color: "from-blue-500 to-cyan-600", 
      difficulty: "Începător"
    },
    {
      title: "Expresii Faciale",
      description: "Învață să redai emoțiile prin detalii subtile",
      color: "from-purple-500 to-indigo-600",
      difficulty: "Intermediar"
    },
    {
      title: "Anatomie Artistică",
      description: "Înțelege structura pentru o redare autentică",
      color: "from-amber-500 to-orange-600",
      difficulty: "Intermediar"
    }
  ];

  const masterClasses = [
    {
      title: "Fundamentele Portretului",
      instructor: "Prof. Maria Ionescu",
      duration: "2h 30min",
      students: 1240,
      level: "Începător"
    },
    {
      title: "Lumină și Umbră Avansată",
      instructor: "Prof. Alexandru Pop", 
      duration: "3h 15min",
      students: 890,
      level: "Avansat"
    },
    {
      title: "Texturi și Materiale",
      instructor: "Prof. Elena Radu",
      duration: "2h 45min", 
      students: 670,
      level: "Intermediar"
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
                <p>Creative Learning Studio</p>
              </div>
            </div>
            
            <div className="header-nav-links">
              <a href="#">Studio</a>
              <a href="#">Galerie</a>
              <a href="#">Masterclass</a>
              <a href="#">Comunitate</a>
              <Button size="sm" className="header-button">
                Contul Meu
              </Button>
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
                  Demo Live
                </Button>
              </div>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <p className="stat-number">2.5K+</p>
                  <p className="stat-label">Artiști Activi</p>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <p className="stat-number">15K+</p>
                  <p className="stat-label">Opere Create</p>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <p className="stat-number">98%</p>
                  <p className="stat-label">Satisfacție</p>
                </div>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="hero-canvas-container">
                {/* Floating Art Elements */}
                <div className="floating-element-1">
                  <Brush />
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
                <div className={art-style-header bg-gradient-to-br ${style.color}}>
                  <div className="art-style-icon">
                    <Brush />
                  </div>
                </div>
                <CardHeader className="art-style-content">
                  <div className="art-style-header-content">
                    <CardTitle className="art-style-title">{style.title}</CardTitle>
                    <Badge className={art-style-badge ${style.difficulty.toLowerCase()}}>
                      {style.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="art-style-description">
                    {style.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="art-style-content">
                  <Button variant="outline" className="art-style-button">
                    <Brush />
                    Începe să practici
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Master Classes Section */}
        <section className="master-classes">
          <div className="master-classes-header">
            <h2 className="master-classes-title">
              <span>Masterclass-uri Exclusive</span>
            </h2>
            <p className="master-classes-description">
              Învață de la cei mai buni artiști și profesori de artă din România
            </p>
          </div>
          <div className="master-classes-grid">
            {masterClasses.map((masterClass, index) => (
              <Card key={index} className="master-class-card">
                <CardHeader className="master-class-header">
                  <div className="master-class-icon">
                    <Award />
                  </div>
                  <CardTitle className="master-class-title">{masterClass.title}</CardTitle>
                  <p className="master-class-instructor">{masterClass.instructor}</p>
                </CardHeader>
                <CardContent className="master-class-content">
                  <div className="master-class-details">
                    <div className="detail-item">
                      <span className="detail-label">Durată:</span>
                      <span className="detail-value">{masterClass.duration}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Studenți:</span>
                      <span className="detail-value">{masterClass.students.toLocaleString()}</span>
                    </div>
                  </div>
                  <Badge className={master-class-badge ${masterClass.level.toLowerCase()}}>
                    {masterClass.level}
                  </Badge>
                  <Button className="master-class-button">
                    <Play />
                    Începe Masterclass-ul
                  </Button>
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