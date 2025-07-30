import { useParams, useNavigate } from "react-router-dom";
import { DrawingCanvas } from "@/components/DrawingCanvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Target, Lightbulb } from "lucide-react";

// Import reference images
import headShapeRef from "@/assets/reference-head-shape.png";
import eyesRef from "@/assets/reference-eyes.png";
import noseRef from "@/assets/reference-nose.png";
import mouthRef from "@/assets/reference-mouth.png";

interface LessonData {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  tips: string[];
  referenceImage: string;
}

const Canvas = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const lessonsData: Record<string, LessonData> = {
    "head-shape": {
      id: "head-shape",
      title: "Forma capului și proporțiile",
      description: "Învață structura fundamentală și proporțiile capului uman",
      objectives: [
        "Înțelege proporțiile de bază ale capului",
        "Desenează forma ovală a capului",
        "Marchează liniile directoare pentru trăsăturile faciale",
        "Exersează construcția capului"
      ],
      tips: [
        "Începe cu o formă ovală ușoară",
        "Capul este aproximativ 7-8 lungimi ale capului înălțime",
        "Ochii sunt poziționați la jumătatea capului",
        "Folosește linii ușoare pentru ghidurile inițiale"
      ],
      referenceImage: headShapeRef
    },
    "eyes": {
      id: "eyes",
      title: "Drawing Eyes",
      description: "Master the art of drawing realistic eyes with proper anatomy",
      objectives: [
        "Understand eye anatomy structure",
        "Draw the eye socket and eyelids",
        "Add the iris, pupil, and highlights",
        "Practice different eye expressions"
      ],
      tips: [
        "Eyes are almond-shaped, not perfect ovals",
        "Leave white space for natural highlights",
        "The upper eyelid creates more shadow",
        "Practice both eyes to maintain symmetry"
      ],
      referenceImage: eyesRef
    },
    "nose": {
      id: "nose",
      title: "Nose Structure",
      description: "Understand nose anatomy and learn to draw it from different angles",
      objectives: [
        "Learn nose basic structure",
        "Draw the nose bridge and nostrils",
        "Understand light and shadow on the nose",
        "Practice different nose types"
      ],
      tips: [
        "The nose is like a triangular prism",
        "Focus on the shadow shapes",
        "Nostrils are not perfect circles",
        "The nose tip catches the most light"
      ],
      referenceImage: noseRef
    },
    "mouth": {
      id: "mouth",
      title: "Lips & Mouth",
      description: "Learn to draw lips and mouth expressions with confidence",
      objectives: [
        "Understand lip anatomy and structure",
        "Draw the mouth line and lip shapes",
        "Add dimension with light and shadow",
        "Practice different expressions"
      ],
      tips: [
        "The upper lip is typically darker",
        "The mouth line isn't a straight line",
        "Lower lip catches more light",
        "Practice subtle expressions first"
      ],
      referenceImage: mouthRef
    }
  };

  const currentLesson = lessonId ? lessonsData[lessonId] : null;

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-gradient-canvas flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Lesson Not Found</CardTitle>
            <CardDescription>
              The requested lesson could not be found.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/lessons")}>
              Back to Lessons
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleComplete = (artwork: string) => {
    // Navigate to critique page with the artwork
    navigate("/critique", { state: { artwork, lessonTitle: currentLesson.title } });
  };

  const handleNext = () => {
    const lessonOrder = ["head-shape", "eyes", "nose", "mouth"];
    const currentIndex = lessonOrder.indexOf(currentLesson.id);
    
    if (currentIndex < lessonOrder.length - 1) {
      const nextLessonId = lessonOrder[currentIndex + 1];
      navigate(`/canvas/${nextLessonId}`);
    } else {
      // Last lesson completed
      navigate("/critique", { 
        state: { 
          artwork: null, 
          lessonTitle: "Final Portfolio Review",
          isComplete: true 
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/lessons")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi la lecții
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Lesson Info Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Objectives */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Obiective
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {currentLesson.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      {objective}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Sfaturi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {currentLesson.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      💡 {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Canvas Area */}
          <div className="xl:col-span-4">
            <DrawingCanvas
              referenceImage={currentLesson.referenceImage}
              lessonTitle={currentLesson.title}
              onNext={handleNext}
              onComplete={handleComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;