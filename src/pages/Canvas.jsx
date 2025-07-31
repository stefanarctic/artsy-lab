import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { DrawingCanvas } from "@/components/DrawingCanvas.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { ArrowLeft, Target, Lightbulb, Eye, EyeOff, RefreshCw, Download, Palette, Settings, Pencil, Eraser } from "lucide-react";

// Import reference images
import headShapeRef from "@/assets/reference-head-shape.png";
import eyesRef from "@/assets/reference-eyes.png";
import noseRef from "@/assets/reference-nose.png";
import mouthRef from "@/assets/reference-mouth.png";

const Canvas = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [showReference, setShowReference] = useState(true);
  const [brushSize, setBrushSize] = useState(2);
  const [activeColor, setActiveColor] = useState("#000000");
  const [currentTool, setCurrentTool] = useState('brush'); // 'brush' or 'eraser'
  const drawingCanvasRef = useRef(null);

  const lessonsData = {
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

  const handleComplete = (artwork) => {
    // Navigate to critique page with the artwork and lesson info
    navigate("/critique", { 
      state: { 
        artwork, 
        lessonTitle: currentLesson.title,
        lessonId: currentLesson.id
      } 
    });
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

  const handleClearCanvas = () => {
    if (drawingCanvasRef.current) {
      drawingCanvasRef.current.handleClear();
    }
  };

  const handleDownloadCanvas = () => {
    if (drawingCanvasRef.current) {
      drawingCanvasRef.current.handleDownload();
    }
  };

  const handleCompleteLesson = () => {
    if (drawingCanvasRef.current) {
      drawingCanvasRef.current.handleComplete();
    }
  };

  const handleNextLesson = () => {
    handleNext();
  };

  const handleColorChange = (color) => {
    setActiveColor(color);
  };

  const handleToolChange = (tool) => {
    setCurrentTool(tool);
    if (drawingCanvasRef.current) {
      drawingCanvasRef.current.setTool(tool);
    }
  };

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return; // Don't handle shortcuts when typing in input fields
      }
      
      switch (event.key.toLowerCase()) {
        case 'b':
          handleToolChange('brush');
          break;
        case 'e':
          handleToolChange('eraser');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="canvas-page">
      {/* Header */}
      <header className="canvas-header">
        <div className="canvas-header-container">
          <div className="canvas-title-section">
            <h1 className="canvas-title">{currentLesson.title}</h1>
            <p className="canvas-subtitle">Interactive Drawing Canvas</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="hide-reference-btn"
            onClick={() => setShowReference(!showReference)}
          >
            {showReference ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
            {showReference ? "Hide" : "Show"} Reference
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
              Înapoi la lecții
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
                  ref={drawingCanvasRef}
                  referenceImage={currentLesson.referenceImage}
                  lessonTitle={currentLesson.title}
                  onNext={handleNext}
                  onComplete={handleComplete}
                  showReference={showReference}
                  onToggleReference={() => setShowReference(!showReference)}
                  activeColor={activeColor}
                  brushSize={brushSize}
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
                <div className="tool-selection">
                  <Button 
                    variant={currentTool === 'brush' ? 'default' : 'outline'}
                    size="sm"
                    className="tool-btn"
                    onClick={() => handleToolChange('brush')}
                    title="Brush tool (B)"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Brush
                    {/* <span className="ml-1 text-xs opacity-60">(B)</span> */}
                  </Button>
                  <Button 
                    variant={currentTool === 'eraser' ? 'default' : 'outline'}
                    size="sm"
                    className="tool-btn"
                    onClick={() => handleToolChange('eraser')}
                    title="Eraser tool (E)"
                  >
                    <Eraser className="w-4 h-4 mr-2" />
                    Eraser
                    {/* <span className="ml-1 text-xs opacity-60">(E)</span> */}
                  </Button>
                </div>
                <div className="tool-control">
                  <label>{currentTool === 'brush' ? 'Brush' : 'Eraser'} Size: {brushSize}px</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="20" 
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="brush-slider" 
                  />
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
                  <div 
                    className={`color-swatch black ${activeColor === '#000000' ? 'active' : ''}`}
                    onClick={() => handleColorChange('#000000')}
                  ></div>
                  <div 
                    className={`color-swatch dark-grey ${activeColor === '#444444' ? 'active' : ''}`}
                    onClick={() => handleColorChange('#444444')}
                  ></div>
                  <div 
                    className={`color-swatch medium-grey ${activeColor === '#888888' ? 'active' : ''}`}
                    onClick={() => handleColorChange('#888888')}
                  ></div>
                  <div 
                    className={`color-swatch light-grey ${activeColor === '#cccccc' ? 'active' : ''}`}
                    onClick={() => handleColorChange('#cccccc')}
                  ></div>
                  <div 
                    className={`color-swatch white ${activeColor === '#ffffff' ? 'active' : ''}`}
                    onClick={() => handleColorChange('#ffffff')}
                  ></div>
                  <div 
                    className={`color-swatch very-light-grey ${activeColor === '#f0f0f0' ? 'active' : ''}`}
                    onClick={() => handleColorChange('#f0f0f0')}
                  ></div>
                  <div 
                    className={`color-swatch dark-brown ${activeColor === '#8B4513' ? 'active' : ''}`}
                    onClick={() => handleColorChange('#8B4513')}
                  ></div>
                  <div 
                    className={`color-swatch orange ${activeColor === '#D2691E' ? 'active' : ''}`}
                    onClick={() => handleColorChange('#D2691E')}
                  ></div>
                  <div 
                    className={`color-swatch light-brown ${activeColor === '#CD853F' ? 'active' : ''}`}
                    onClick={() => handleColorChange('#CD853F')}
                  ></div>
                  <div 
                    className={`color-swatch light-orange ${activeColor === '#F4A460' ? 'active' : ''}`}
                    onClick={() => handleColorChange('#F4A460')}
                  ></div>
                  <div 
                    className={`color-swatch teal ${activeColor === '#4ECDC4' ? 'active' : ''}`}
                    onClick={() => handleColorChange('#4ECDC4')}
                  ></div>
                  <div 
                    className={`color-swatch light-blue ${activeColor === '#45B7D1' ? 'active' : ''}`}
                    onClick={() => handleColorChange('#45B7D1')}
                  ></div>
                </div>
                <div className="custom-color">
                  <label>Custom Color</label>
                  <input
                    type="color"
                    value={activeColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="custom-color-input"
                  />
                  {/* <div 
                    className="custom-color-swatch"
                    style={{ backgroundColor: activeColor }}
                  ></div> */}
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="action-btn"
                    onClick={handleClearCanvas}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear Canvas
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="action-btn"
                    onClick={handleDownloadCanvas}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </Button>
                  <Button 
                    className="action-btn primary"
                    onClick={handleCompleteLesson}
                  >
                    Complete Lesson
                  </Button>
                  <Button 
                    className="action-btn primary"
                    onClick={handleNextLesson}
                  >
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