import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Play, Lock, ArrowLeft, Sparkles, BookOpen, Clock, Target } from "lucide-react";
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
      locked: false,
      icon: "🎨"
    },
    {
      id: "eyes",
      title: "Desenarea ochilor",
      description: "Stăpânește arta desenării ochilor realiști cu anatomie corectă",
      difficulty: "Începător",
      duration: "20 min",
      completed: false,
      locked: true,
      icon: "👁️"
    },
    {
      id: "nose",
      title: "Structura nasului",
      description: "Înțelege anatomia nasului și învață să-l desenezi din diferite unghiuri",
      difficulty: "Intermediar",
      duration: "18 min",
      completed: false,
      locked: true,
      icon: "👃"
    },
    {
      id: "mouth",
      title: "Buzele și gura",
      description: "Învață să desenezi buzele și expresiile gurii cu încredere",
      difficulty: "Intermediar",
      duration: "22 min",
      completed: false,
      locked: true,
      icon: "👄"
    }
  ]);

  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  const handleStartLesson = (lessonId) => {
    navigate(`/canvas/${lessonId}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Începător": return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
      case "Intermediar": return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
      case "Avansat": return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="lessons-page">
      {/* Background Elements */}
      <div className="lessons-background">
        <div className="bg-element-1"></div>
        <div className="bg-element-2"></div>
        <div className="bg-element-3"></div>
      </div>

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
              <div className="lessons-badge">
                <Sparkles />
                <span>Curriculum de desen portret</span>
              </div>
              <h1>Învață să desenezi portrete</h1>
              <p>
                Progresează prin lecții structurate pentru a stăpâni arta desenului portretului. 
                Fiecare lecție te va ghida pas cu pas spre realizarea unor portrete realiste.
              </p>
            </div>
            
            <div className="lessons-progress">
              <div className="progress-info">
                <span className="progress-text">Progresul tău</span>
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
                  lesson.locked ? 'lesson-locked' : lesson.completed ? 'lesson-completed' : 'lesson-available'
                }`}
              >
                <CardHeader className="lesson-header">
                  <div className="lesson-status">
                    <div className="lesson-icon">
                      {lesson.icon}
                    </div>
                    <div className="lesson-number">
                      Lecția {index + 1}
                    </div>
                  </div>
                  <Badge className={`lesson-difficulty ${getDifficultyColor(lesson.difficulty)}`}>
                    {lesson.difficulty}
                  </Badge>
                </CardHeader>
                
                <CardContent className="lesson-content">
                  <CardTitle className="lesson-title">{lesson.title}</CardTitle>
                  <CardDescription className="lesson-description">
                    {lesson.description}
                  </CardDescription>
                  <div className="lesson-meta">
                    <div className="lesson-duration">
                      <Clock className="duration-icon" />
                      <span>{lesson.duration}</span>
                    </div>
                    <Button 
                      variant={lesson.completed ? "secondary" : "default"}
                      size="sm"
                      disabled={lesson.locked}
                      onClick={() => handleStartLesson(lesson.id)}
                      className="lesson-button"
                    >
                      {lesson.completed ? (
                        <>
                          <CheckCircle />
                          Revizuiește
                        </>
                      ) : lesson.locked ? (
                        <>
                          <Lock />
                          Blocat
                        </>
                      ) : (
                        <>
                          <Play />
                          Începe
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Next Steps */}
          <div className="lessons-cta">
            <div className="cta-content">
              <div className="cta-text">
                <h2>Gata să începi să desenezi?</h2>
                <p>
                  Începe cu fundamentele și avansează prin fiecare lecție în ritmul tău. 
                  Fiecare pas te aduce mai aproape de a stăpâni arta desenului portretului.
                </p>
              </div>
              <Button 
                size="lg" 
                className="cta-button"
                onClick={() => handleStartLesson("head-shape")}
              >
                <BookOpen />
                Începe prima lecție
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lessons; 