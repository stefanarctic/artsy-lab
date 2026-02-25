import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Circle, Clock, Lock, Play } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { useAuth } from "@/lib/AuthContext.jsx";
import { LESSONS_CATALOG } from "@/lib/lessonsCatalog.js";
import { getUserLessonState } from "@/lib/progressService.js";

const Lessons = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [lessonState, setLessonState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const progress = await getUserLessonState(user?.uid);
        setLessonState(progress);
      } finally {
        setLoading(false);
      }
    };
    loadProgress();
  }, [user?.uid]);

  const lessons = useMemo(() => {
    const stateById = lessonState.reduce((acc, lesson) => {
      acc[lesson.id] = lesson;
      return acc;
    }, {});
    return LESSONS_CATALOG.map((lesson) => ({
      ...lesson,
      completed: Boolean(stateById[lesson.id]?.completed),
      locked: Boolean(stateById[lesson.id]?.locked),
    }));
  }, [lessonState]);

  const completedLessons = lessons.filter((lesson) => lesson.completed).length;
  const progressPercentage = lessons.length ? (completedLessons / lessons.length) * 100 : 0;

  const handleStartLesson = (lessonId) => {
    navigate(`/canvas/${lessonId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-muted-foreground">Se încarcă progresul...</div>
      </div>
    );
  }

  return (
    <div className="lessons-page">
      <header className="lessons-header">
        <div className="lessons-header-container">
          <Button variant="ghost" onClick={() => navigate("/")} className="lessons-back-button">
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
              <p>Progresează prin lecții structurate pentru a stăpâni desenul portretului</p>
            </div>

            <div className="lessons-progress">
              <div className="progress-info">
                <span className="progress-text">Completate</span>
                <span className="progress-percentage">
                  {completedLessons}/{lessons.length} lecții
                </span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
              </div>
              <p className="text-xs text-muted-foreground">{Math.round(progressPercentage)}% complet</p>
            </div>
          </div>

          <div className="lessons-grid">
            {lessons.map((lesson, index) => (
              <Card key={lesson.id} className={`lesson-card ${lesson.locked ? "opacity-60" : ""}`}>
                <CardHeader className="lesson-header">
                  <div className="lesson-status">
                    {lesson.completed ? (
                      <CheckCircle className="completed" />
                    ) : lesson.locked ? (
                      <Lock className="locked" />
                    ) : (
                      <Circle className="available" />
                    )}
                    <div className="text-sm text-muted-foreground">Lecția {index + 1}</div>
                  </div>
                  <Badge className={`lesson-difficulty ${lesson.difficulty.toLowerCase()}`}>{lesson.difficulty}</Badge>
                </CardHeader>

                <CardContent className="lesson-content">
                  <CardTitle className="lesson-title">{lesson.title}</CardTitle>
                  <CardDescription className="lesson-description mb-4">{lesson.description}</CardDescription>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Obiective:</h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      {lesson.objectives.map((objective) => (
                        <li key={objective}>{objective}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Sfaturi:</h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                      {lesson.tips.map((tip) => (
                        <li key={tip}>{tip}</li>
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

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl">Gata să începi să desenezi?</CardTitle>
                <CardDescription className="text-lg">
                  Începe cu fundamentele și avansează prin fiecare lecție în ritmul tău.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" className="text-lg px-8 py-3" onClick={() => handleStartLesson("head-shape")}>
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

