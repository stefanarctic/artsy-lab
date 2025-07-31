import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Progress } from "@/components/ui/progress.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { CheckCircle, Circle, Play, Lock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Lessons = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([
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

  const handleStartLesson = (lessonId) => {
    navigate(`/canvas/${lessonId}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Începător": return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "Intermediar": return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "Avansat": return "bg-red-500/10 text-red-700 dark:text-red-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="lessons-page">
      {/* Header */}
      <header className="lessons-header">
        <div className="lessons-header-container">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="lessons-back-button"
          >
            <ArrowLeft />
            Înapoi la pagina principală
          </Button>
        </div>
      </header>

      <div className="lessons-container">
        <div className="lessons-content">
          <div className="lessons-header-content">
            <div className="lessons-title-section">
              <h1>Curriculum de desen portret</h1>
              <p>
                Progresează prin lecții structurate pentru a stăpâni desenul portretului
              </p>
            </div>
            
            <div className="lessons-progress">
              <div className="progress-info">
                <span className="progress-text">Completate</span>
                <span className="progress-percentage">{completedLessons}/{lessons.length} lecții</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round(progressPercentage)}% complet
              </p>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="lessons-grid">
            {lessons.map((lesson, index) => (
              <Card 
                key={lesson.id} 
                className={`lesson-card ${
                  lesson.locked ? 'opacity-60' : ''
                }`}
              >
                <CardHeader className="lesson-header">
                  <div className="lesson-status">
                    {lesson.completed ? (
                      <CheckCircle className="completed" />
                    ) : lesson.locked ? (
                      <Lock className="locked" />
                    ) : (
                      <Circle className="available" />
                    )}
                    <div className="text-sm text-muted-foreground">
                      Lecția {index + 1}
                    </div>
                  </div>
                  <Badge className={`lesson-difficulty ${lesson.difficulty.toLowerCase()}`}>
                    {lesson.difficulty}
                  </Badge>
                </CardHeader>
                
                <CardContent className="lesson-content">
                  <CardTitle className="lesson-title">{lesson.title}</CardTitle>
                  <CardDescription className="lesson-description">
                    {lesson.description}
                  </CardDescription>
                  <div className="lesson-meta">
                    <span className="lesson-duration">{lesson.duration}</span>
                    <Button 
                      variant={lesson.completed ? "secondary" : "default"}
                      size="sm"
                      disabled={lesson.locked}
                      onClick={() => handleStartLesson(lesson.id)}
                      className="gap-2"
                    >
                      <Play />
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
    </div>
  );
};

export default Lessons;