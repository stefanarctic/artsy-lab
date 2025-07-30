import { useParams, useNavigate } from "react-router-dom";
import { DrawingCanvas } from "@/components/DrawingCanvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Target, Lightbulb, Eye, RefreshCw, Download, Palette, Settings, Pencil } from "lucide-react";

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
    <div className="canvas-page">
      {/* Header */}
      <header className="canvas-header">
        <div className="canvas-header-container">
          <div className="canvas-title-section">
            <h1 className="canvas-title">{currentLesson.title}</h1>
            <p className="canvas-subtitle">Interactive Drawing Canvas</p>
          </div>
          <Button variant="outline" size="sm" className="hide-reference-btn">
            <Eye className="w-4 h-4 mr-2" />
            Hide Reference
          </Button>
        </div>
      </header>

      <div className="canvas-content">
        <div className="canvas-layout">
          {/* Left Column - Lesson Information */}
          <div className="canvas-sidebar">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/lessons")}
              className="back-button"
            >
              <ArrowLeft />
              ← Înapoi la lecții
            </Button>

            <div className="sidebar-section">
              <div className="sidebar-header">
                <Target className="w-5 h-5" />
                <h3>Obiective</h3>
              </div>
              <div className="sidebar-content">
                <ul className="objectives-list">
                  {currentLesson.objectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-header">
                <Lightbulb className="w-5 h-5" />
                <h3>Sfaturi</h3>
              </div>
              <div className="sidebar-content">
                <ul className="tips-list">
                  {currentLesson.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Center Column - Drawing Canvas */}
          <div className="canvas-main">
            <div className="canvas-container">
              <div className="canvas-area">
                <DrawingCanvas
                  referenceImage={currentLesson.referenceImage}
                  lessonTitle={currentLesson.title}
                  onNext={handleNext}
                  onComplete={handleComplete}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Tools and Actions */}
          <div className="canvas-tools-sidebar">
            <div className="sidebar-section">
              <div className="sidebar-header">
                <Pencil className="w-5 h-5" />
                <h3>Drawing Tools</h3>
              </div>
              <div className="sidebar-content">
                <div className="tool-control">
                  <label>Brush Size: 2px</label>
                  <input type="range" min="1" max="20" defaultValue="2" className="brush-slider" />
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-header">
                <Palette className="w-5 h-5" />
                <h3>Colors</h3>
              </div>
              <div className="sidebar-content">
                <div className="color-palette">
                  <div className="color-swatch black"></div>
                  <div className="color-swatch dark-grey"></div>
                  <div className="color-swatch medium-grey"></div>
                  <div className="color-swatch light-grey"></div>
                  <div className="color-swatch white"></div>
                  <div className="color-swatch very-light-grey"></div>
                  <div className="color-swatch dark-brown"></div>
                  <div className="color-swatch orange"></div>
                  <div className="color-swatch light-brown"></div>
                  <div className="color-swatch light-orange"></div>
                  <div className="color-swatch teal"></div>
                  <div className="color-swatch light-blue"></div>
                </div>
                <div className="custom-color">
                  <label>Custom Color</label>
                  <div className="custom-color-swatch"></div>
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-header">
                <Settings className="w-5 h-5" />
                <h3>Actions</h3>
              </div>
              <div className="sidebar-content">
                <div className="action-buttons">
                  <Button variant="outline" size="sm" className="action-btn">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear Canvas
                  </Button>
                  <Button variant="outline" size="sm" className="action-btn">
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </Button>
                  <Button className="action-btn primary">
                    Complete Lesson
                  </Button>
                  <Button className="action-btn primary">
                    Next Lesson
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;