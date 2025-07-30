import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  const getDifficultyColor = (difficulty: string) => {
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
      <header className="relative border-b border-border/30 backdrop-blur-xl bg-background/95 sticky top-0 z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
        <div className="container mx-auto px-6 py-4 relative">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary via-accent to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  ArtsyLab
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">Creative Learning Studio</p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-all relative group">
                Studio
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></div>
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-all relative group">
                Galerie
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></div>
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-all relative group">
                Masterclass
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></div>
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-all relative group">
                Comunitate
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></div>
              </a>
              <Button size="sm" className="bg-gradient-to-r from-primary to-accent text-white font-medium px-6 shadow-lg hover:shadow-xl transition-all">
                Contul Meu
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Artistic Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Art Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-xl animate-float"></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 max-w-2xl">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <Star className="w-4 h-4 text-primary animate-spin" />
                <span className="text-sm font-medium text-primary">Atelierul Digital de Artă</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black leading-[0.9] tracking-tight">
                <span className="block text-foreground">Creează</span>
                <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Artă Vibrantă
                </span>
                <span className="block text-foreground/80 text-4xl lg:text-5xl">prin Tehnologie</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Transformă-ți pasiunea pentru artă într-o abilitate remarcabilă cu ajutorul 
                tehnologiei moderne și al experților noștri dedicați.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/lessons")}
                  className="group relative bg-gradient-to-r from-primary via-accent to-secondary text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Începe Călătoria
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="group border-2 border-foreground/20 text-foreground font-semibold px-8 py-4 text-lg hover:border-primary hover:text-primary transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
                  Demo Live
                </Button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">2.5K+</p>
                  <p className="text-sm text-muted-foreground">Artiști Activi</p>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">15K+</p>
                  <p className="text-sm text-muted-foreground">Opere Create</p>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">98%</p>
                  <p className="text-sm text-muted-foreground">Satisfacție</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Floating Art Elements */}
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-xl animate-float">
                  <Brush className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center shadow-lg" style={{ animationDelay: '1s' }}>
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-16 -right-8 w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center shadow-md animate-pulse">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                
                {/* Main Canvas */}
                <div className="relative w-96 h-96 bg-gradient-to-br from-card via-background to-muted/30 rounded-3xl border-2 border-border/50 shadow-2xl backdrop-blur-sm overflow-hidden">
                  {/* Canvas Interface */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">ArtsyLab Studio</div>
                  </div>
                  
                  {/* Art Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-xl"></div>
                      <img 
                        src={artIcon} 
                        alt="Art Creation"
                        className="relative w-48 h-48 filter drop-shadow-2xl animate-float"
                      />
                    </div>
                  </div>
                  
                  {/* Progress Indicators */}
                  <div className="absolute bottom-6 left-6 right-6 space-y-3">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Creația ta</span>
                      <span>87% completă</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[87%] bg-gradient-to-r from-primary via-accent to-secondary rounded-full animate-pulse"></div>
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
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Instrumente Creative
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descoperă tehnologiile inovatoare care îți vor accelera progresul artistic
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group relative overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative text-center">
                  <div className="mx-auto w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative text-center">
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Art Styles Section */}
        <section className="py-20 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Stiluri de Artă
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explorează diverse tehnici și stiluri artistice pentru a-ți dezvolta propriul stil unic
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {artStyles.map((style, index) => (
              <Card key={index} className="group relative overflow-hidden border border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:scale-105 bg-card/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className={`relative h-32 bg-gradient-to-br ${style.color} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                  <div className="relative w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform backdrop-blur-sm">
                    <Brush className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl group-hover:text-accent transition-colors">{style.title}</CardTitle>
                    <Badge className={`${getDifficultyColor(style.difficulty)} px-3 py-1 font-semibold border`}>
                      {style.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {style.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <Button variant="outline" className="w-full group-hover:bg-accent/10 group-hover:border-accent transition-colors">
                    <Brush className="w-4 h-4 mr-2" />
                    Începe să practici
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Master Classes Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Masterclass-uri Exclusive
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Învață de la cei mai buni artiști și profesori de artă din România
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {masterClasses.map((masterClass, index) => (
              <Card key={index} className="group relative text-center border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden bg-card/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">{masterClass.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{masterClass.instructor}</p>
                </CardHeader>
                <CardContent className="relative space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Durată:</span>
                    <span className="font-medium">{masterClass.duration}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Studenți:</span>
                    <span className="font-medium">{masterClass.students.toLocaleString()}</span>
                  </div>
                  <Badge className={`${getDifficultyColor(masterClass.level)} px-3 py-1 font-semibold border`}>
                    {masterClass.level}
                  </Badge>
                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity mt-4">
                    <Play className="w-4 h-4 mr-2" />
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
      <footer className="border-t border-border bg-muted/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ArtsyLab</h3>
              <p className="text-sm text-muted-foreground">
                Platforma educațională pentru învățarea desenului artistic
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platformă</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Simulări</a></li>
                <li><a href="#" className="hover:text-foreground">Probleme</a></li>
                <li><a href="#" className="hover:text-foreground">Resurse</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resurse</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">FAQ</a></li>
                <li><a href="#" className="hover:text-foreground">Ajutor</a></li>
                <li><a href="#" className="hover:text-foreground">Documentație</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
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