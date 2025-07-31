import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Progress } from "@/components/ui/progress.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { CheckCircle, Circle, Play, Lock, ArrowLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Lessons = () => {
  const navigate = useNavigate();
  const defaultLessons = [
    {
      id: "head-shape",
      title: "Forma capului și proporțiile",
      description: "Învață structura fundamentală și proporțiile capului uman pentru a crea baza oricărui portret reușit",
      difficulty: "Începător",
      duration: "15 min",
      completed: false,
      locked: false,
      objectives: [
        "Înțelegerea proporțiilor standard ale capului",
        "Construirea formei de bază a craniului",
        "Plasarea corectă a elementelor faciale",
        "Stabilirea liniilor directoare pentru simetrie"
      ],
      tips: [
        "Începe cu forme geometrice simple",
        "Folosește linii ușoare pentru schițare",
        "Verifică constant simetria",
        "Marchează clar liniile mediane"
      ]
    },
    {
      id: "eyes",
      title: "Desenarea ochilor",
      description: "Stăpânește arta desenării ochilor realiști cu anatomie corectă și expresivitate naturală",
      difficulty: "Începător",
      duration: "20 min",
      completed: false,
      locked: true,
      objectives: [
        "Înțelegerea structurii anatomice a ochiului",
        "Desenarea corectă a pleoapelor și genelor",
        "Redarea expresivității prin detalii fine",
        "Crearea iluziei de profunzime și strălucire"
      ],
      tips: [
        "Observă forma alungită a ochiului",
        "Acordă atenție reflexiilor din iris",
        "Nu uita de umbrele sub pleoapa superioară",
        "Adaugă detalii gradual, de la general la specific"
      ]
    },
    {
      id: "nose",
      title: "Structura nasului",
      description: "Înțelege anatomia nasului și învață să-l desenezi corect din orice unghi pentru un portret convingător",
      difficulty: "Intermediar",
      duration: "18 min",
      completed: false,
      locked: true,
      objectives: [
        "Studierea structurii cartilaginoase a nasului",
        "Înțelegerea jocului de lumini și umbre",
        "Desenarea corectă a nărilor și punții nazale",
        "Redarea volumului prin tehnici de umbrire"
      ],
      tips: [
        "Începe cu forma de bază triunghiulară",
        "Observă cum lumina afectează formele",
        "Acordă atenție proporțiilor relative",
        "Folosește umbre subtile pentru volum"
      ]
    },
    {
      id: "mouth",
      title: "Buzele și gura",
      description: "Învață să desenezi buze expresive și naturale, stăpânind anatomia și textura acestora",
      difficulty: "Intermediar",
      duration: "22 min",
      completed: false,
      locked: true,
      objectives: [
        "Înțelegerea anatomiei buzelor",
        "Desenarea corectă a arcului lui Cupidon",
        "Redarea texturii și volumului",
        "Crearea expresiilor faciale prin poziția buzelor"
      ],
      tips: [
        "Observă forma de M a buzei superioare",
        "Buza inferioară este de obicei mai plină",
        "Folosește umbre pentru a sugera volumul",
        "Adaugă mici detalii pentru textura naturală"
      ]
    }
  ];

  const [lessons, setLessons] = useState(() => {
    // Try to get saved lessons state from localStorage
    const savedLessons = localStorage.getItem('lessons');
    if (savedLessons) {
      const parsed = JSON.parse(savedLessons);
      // Merge saved state with default lessons to ensure all properties exist
      return defaultLessons.map(defaultLesson => {
        const savedLesson = parsed.find(l => l.id === defaultLesson.id);
        return savedLesson ? { ...defaultLesson, ...savedLesson } : defaultLesson;
      });
    }

    return defaultLessons;
  });

  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  // Save lessons state whenever it changes
  useEffect(() => {
    localStorage.setItem('lessons', JSON.stringify(lessons));
  }, [lessons]);

  const completeLesson = (lessonId) => {
    setLessons(prevLessons => {
      const newLessons = prevLessons.map(lesson => {
        if (lesson.id === lessonId) {
          // Mark current lesson as completed
          return { ...lesson, completed: true };
        } else if (
          // Find the next lesson in sequence and unlock it
          prevLessons.findIndex(l => l.id === lessonId) + 1 === 
          prevLessons.findIndex(l => l.id === lesson.id)
        ) {
          return { ...lesson, locked: false };
        }
        return lesson;
      });
      return newLessons;
    });
  };

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
                  <CardDescription className="lesson-description mb-4">
                    {lesson.description}
                  </CardDescription>

                  {/* Objectives */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Obiective:</h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      {lesson.objectives.map((objective, idx) => (
                        <li key={idx}>{objective}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Tips */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Sfaturi:</h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      {lesson.tips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="lesson-meta mt-6 pt-4 border-t flex items-center justify-between">
                    <span className="lesson-duration flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
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
    </div>
  );
};

export default Lessons;