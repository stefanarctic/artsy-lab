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
  Award
} from "lucide-react";

import artIcon from "@/assets/art-icon.png";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "Probleme interactive",
      description: "Exerciții și simulări interactive pentru învățarea desenului portretului"
    },
    {
      icon: <Eye className="w-8 h-8 text-primary" />,
      title: "Simulări vizuale",
      description: "Instrumente vizuale pentru a experimenta cu tehnici de desenare"
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Resurse didactice",
      description: "Ghiduri pas cu pas și materiale de referință pentru fiecare lecție"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "Progres monitorizat",
      description: "Urmărește-ți progresul și primește feedback personalizat pentru îmbunătățiri"
    }
  ];

  const simulations = [
    {
      title: "Forma capului",
      description: "Învață proporțiile și structura de bază a craniului uman",
      image: "/api/placeholder/300/200",
      difficulty: "Începător"
    },
    {
      title: "Desenarea ochilor",
      description: "Tehnici avansate pentru reprezentarea realistă a ochilor",
      image: "/api/placeholder/300/200", 
      difficulty: "Intermediar"
    },
    {
      title: "Structura nasului",
      description: "Metode pentru desenarea nasului din diverse unghiuri",
      image: "/api/placeholder/300/200",
      difficulty: "Intermediar"
    },
    {
      title: "Buzele și gura",
      description: "Ghid pentru desenarea expresivă a buzelor și gurii",
      image: "/api/placeholder/300/200",
      difficulty: "Avansat"
    }
  ];

  const problemSets = [
    {
      level: "Începători",
      description: "Probleme simple pentru o primă cunoaștere cu desenul portretului",
      icon: <PenTool className="w-6 h-6" />,
      lessons: 4
    },
    {
      level: "Intermediar", 
      description: "Exerciții mai complexe pentru dezvoltarea tehnicii",
      icon: <Palette className="w-6 h-6" />,
      lessons: 6
    },
    {
      level: "Avansat",
      description: "Provocări artistice pentru perfecționarea abilităților",
      icon: <Award className="w-6 h-6" />,
      lessons: 8
    },
    {
      level: "Concurs",
      description: "Provocări artistice pentru cei mai avansați studenți",
      icon: <Users className="w-6 h-6" />,
      lessons: 5
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "Începător": return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "Intermediar": return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "Avansat": return "bg-red-500/10 text-red-700 dark:text-red-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="backdrop-blur-sm bg-background/80 border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ArtsyLab</h1>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group">
                ACASĂ
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group">
                P.U.L.S
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group">
                PROBLEME
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group">
                SIMULĂRI
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group">
                RESURSE
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
              <Button variant="outline" size="sm">PROFIL</Button>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-3xl"></div>
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Nouă experiență de învățare
              </div>
              <h1 className="text-6xl lg:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                  Descoperă
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  arta desenului
                </span>
                <br />
                <span className="text-foreground">
                  prin practică
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Platformă educațională inovatoare care transformă învățarea desenului artistic printr-o experiență 
                interactivă și captivantă.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/lessons")}
                  className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  Începe aventura
                  <Target className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-2 hover:bg-accent/10"
                >
                  Vezi simulările
                  <Eye className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl transform rotate-6"></div>
                <div className="relative w-80 h-80 bg-gradient-to-br from-card to-muted/50 rounded-3xl border border-border/50 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                  <div className="absolute top-4 left-4 w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="absolute top-4 left-10 w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="absolute top-4 left-16 w-3 h-3 bg-green-400 rounded-full"></div>
                  <img 
                    src={artIcon} 
                    alt="Art Icon"
                    className="w-40 h-40 filter drop-shadow-2xl animate-float"
                  />
                  <div className="absolute bottom-6 left-6 right-6 h-2 bg-primary/20 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Ce îți oferă ArtsyLab?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descoperă instrumentele care îți vor transforma pasiunea pentru artă în abilități concrete
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group relative overflow-hidden border-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative pb-4 pt-8">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Simulations Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5 rounded-3xl"></div>
          <div className="relative text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Simulări interactive
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experimentează cu tehnici avansate de desenare prin simulări realiste
            </p>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
            {simulations.map((sim, index) => (
              <Card key={index} className="group relative overflow-hidden border-2 border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-48 bg-gradient-to-br from-muted/50 to-accent/10 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 blur-xl group-hover:blur-none transition-all duration-500"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <PenTool className="w-10 h-10 text-white" />
                  </div>
                </div>
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl group-hover:text-accent transition-colors">{sim.title}</CardTitle>
                    <Badge className={`${getDifficultyColor(sim.difficulty)} px-3 py-1 font-semibold`}>
                      {sim.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {sim.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <Button variant="outline" className="w-full group-hover:bg-accent/10 group-hover:border-accent transition-colors">
                    <Eye className="w-4 h-4 mr-2" />
                    Explorează simularea
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Problem Sets Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Probleme interactive
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dezvoltă-ți abilitățile pas cu pas prin exerciții structurate pe niveluri
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {problemSets.map((set, index) => (
              <Card key={index} className="group relative text-center border-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      {set.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{set.level}</CardTitle>
                  <CardDescription className="text-base leading-relaxed mt-2">
                    {set.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-sm font-medium">
                      <BookOpen className="w-4 h-4" />
                      {set.lessons} lecții disponibile
                    </span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                    Începe acum
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Despre noi</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Suntem dedicați oferirilor moderne și inovatoare în predarea artei. Platforma noastră oferă simulări interactive și exerciții pentru a transforma 
              învățarea într-o experiență captivantă și practică.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Printr-o cursă în timp real cu o interfață modernă, un pattern fizic de învățământ colaborativ și la distanță cât și o gamă vastă de tehnici pentru 
              toți, ne angajăm să oferim posibilitatea elevilor să învețe la nivelul lor potrivit din multe tipuri de inteligență, precum cea kinesthetic, vizual și 
              de tip strategică pentru deciziile profesionale în carieră și tehnologie.
            </p>
            <Button>Află mai mult</Button>
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