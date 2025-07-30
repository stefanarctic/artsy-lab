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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">ArtsyLab</h1>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">ACASĂ</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">P.U.L.S</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">PROBLEME</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">SIMULĂRI</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">RESURSE</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">PROFIL</a>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-foreground mb-6">
                Descoperă fizica prin
                exerciții și simulări
                interactive
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                ArtsyLab - Platforma educațională pentru studiul conceptelor de desen artistic, 
                unde descoperi și înveți prin probleme și simulări interactive.
              </p>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/lessons")}
                  className="px-8"
                >
                  Explorează problemele
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8"
                >
                  Încearcă simulările
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center">
                  <img 
                    src={artIcon} 
                    alt="Art Icon"
                    className="w-32 h-32 opacity-60"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Ce îți oferă ArtsyLab?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border border-border shadow-card hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Simulations Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Explorează simulările noastre</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {simulations.map((sim, index) => (
              <Card key={index} className="overflow-hidden border border-border shadow-card hover:shadow-lg transition-shadow">
                <div className="h-48 bg-muted"></div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{sim.title}</CardTitle>
                    <Badge className={getDifficultyColor(sim.difficulty)}>
                      {sim.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {sim.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm">
                    Explorează
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Problem Sets Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Probleme interactive</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problemSets.map((set, index) => (
              <Card key={index} className="text-center border border-border shadow-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                      {set.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{set.level}</CardTitle>
                  <CardDescription className="text-sm">
                    {set.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {set.lessons} lecții disponibile
                  </p>
                  <Button className="w-full">
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