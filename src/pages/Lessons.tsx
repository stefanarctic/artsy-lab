import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Play, Lock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: "Începător" | "Intermediar" | "Avansat";
  duration: string;
  completed: boolean;
  locked: boolean;
}

const Lessons = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: "head-shape",
      title: "Forma capului și proporțiile",
      description: "Învață structura fundamentală și proporțiile capului uman",
      difficulty: "Începător",
      duration: "15 min",
      completed: false,
      locked: false
    },
    {
      id: "eyes",
      title: "Desenarea ochilor",
      description: "Stăpânește arta desenării ochilor realiști cu anatomie corectă",
      difficulty: "Începător",
      duration: "20 min",
      completed: false,
      locked: true
    },
    {
      id: "nose",
      title: "Structura nasului",
      description: "Înțelege anatomia nasului și învață să-l desenezi din diferite unghiuri",
      difficulty: "Intermediar",
      duration: "18 min",
      completed: false,
      locked: true
    },
    {
      id: "mouth",
      title: "Buzele și gura",
      description: "Învață să desenezi buzele și expresiile gurii cu încredere",
      difficulty: "Intermediar",
      duration: "22 min",
      completed: false,
      locked: true
    }
  ]);

  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  const handleStartLesson = (lessonId: string) => {
    navigate(`/canvas/${lessonId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
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
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi la pagina principală
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Curriculum de desen portret</h1>
            <p className="text-muted-foreground text-lg">
              Progresează prin lecții structurate pentru a stăpâni desenul portretului
            </p>
          </div>
          
          <Card className="lg:w-80 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Progresul tău</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completate</span>
                  <span>{completedLessons}/{lessons.length} lecții</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {Math.round(progressPercentage)}% complet
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => (
            <Card 
              key={lesson.id} 
              className={`transition-all duration-300 shadow-card hover:shadow-lg ${
                lesson.locked ? 'opacity-60' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {lesson.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : lesson.locked ? (
                      <Lock className="w-6 h-6 text-muted-foreground" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground" />
                    )}
                    <div className="text-sm text-muted-foreground">
                      Lecția {index + 1}
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(lesson.difficulty)}>
                    {lesson.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{lesson.title}</CardTitle>
                <CardDescription className="text-base">
                  {lesson.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {lesson.duration}
                  </span>
                  <Button 
                    variant={lesson.completed ? "secondary" : "default"}
                    size="sm"
                    disabled={lesson.locked}
                    onClick={() => handleStartLesson(lesson.id)}
                    className="gap-2"
                    >
                      <Play className="w-4 h-4" />
                      {lesson.completed ? "Revizuiește" : lesson.locked ? "Blocat" : "Începe"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Steps */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Gata să începi să desenezi?</CardTitle>
              <CardDescription className="text-lg">
                Începe cu fundamentele și avansează prin fiecare lecție în ritmul tău.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg" 
                className="text-lg px-8 py-3"
                onClick={() => handleStartLesson("head-shape")}
              >
                Începe prima lecție
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Lessons;