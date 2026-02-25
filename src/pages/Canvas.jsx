import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Eraser,
  Eye,
  EyeOff,
  Hand,
  History,
  Layers,
  Lightbulb,
  Move,
  Palette,
  Pencil,
  Redo2,
  RefreshCw,
  RotateCcw,
  Settings,
  Target,
  Undo2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { DrawingCanvas } from "@/components/DrawingCanvas.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { LESSON_ORDER } from "@/lib/appDataModel.js";
import { LESSONS_BY_ID } from "@/lib/lessonsCatalog.js";

const BRUSH_PRESETS = [
  { name: "Sketch", size: 2, opacity: 0.85, hardness: 0.85, smoothing: 0.35 },
  { name: "Ink", size: 3, opacity: 1, hardness: 1, smoothing: 0.2 },
  { name: "Soft", size: 8, opacity: 0.55, hardness: 0.3, smoothing: 0.6 },
  { name: "Marker", size: 10, opacity: 0.75, hardness: 0.7, smoothing: 0.45 },
];

const SHADOW_LIGHT = [
  { name: "Umbră", color: "#2a2a2a", size: 8, opacity: 0.6, hardness: 0.35, smoothing: 0.5 },
  { name: "Lumină", color: "#e8e8e8", size: 6, opacity: 0.55, hardness: 0.3, smoothing: 0.5 },
];

const Canvas = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const drawingCanvasRef = useRef(null);

  const [showReference, setShowReference] = useState(true);
  const [brushSize, setBrushSize] = useState(4);
  const [brushOpacity, setBrushOpacity] = useState(0.9);
  const [brushHardness, setBrushHardness] = useState(0.85);
  const [brushSmoothing, setBrushSmoothing] = useState(0.35);
  const [activeColor, setActiveColor] = useState("#000000");
  const [currentTool, setCurrentTool] = useState("brush");
  const [zoomPercent, setZoomPercent] = useState(100);
  const [layersState, setLayersState] = useState({ layers: [], activeLayerId: null });
  const [historyState, setHistoryState] = useState({ entries: [], index: -1 });

  const currentLesson = lessonId ? LESSONS_BY_ID[lessonId] : null;

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") return;
      const key = event.key.toLowerCase();

      if (event.ctrlKey && key === "z") {
        event.preventDefault();
        if (event.shiftKey) drawingCanvasRef.current?.redo();
        else drawingCanvasRef.current?.undo();
        return;
      }

      if (event.key === "[") {
        setBrushSize((s) => Math.max(1, s - 1));
        return;
      }
      if (event.key === "]") {
        setBrushSize((s) => Math.min(60, s + 1));
        return;
      }

      if (key === "b") setCurrentTool("brush");
      if (key === "e") setCurrentTool("eraser");
      if (key === "v") setCurrentTool("select");
      if (key === "i") setCurrentTool("eyedropper");
      if (key === "h") setCurrentTool("pan");
      if (key === "delete") drawingCanvasRef.current?.deleteSelection();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-gradient-canvas flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Lecția nu a fost găsită</CardTitle>
            <CardDescription>Lecția solicitată nu a putut fi găsită.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/lessons")}>Înapoi la Lecții</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleComplete = (artwork) => {
    navigate("/critique", {
      state: {
        artwork,
        lessonTitle: currentLesson.title,
        lessonId: currentLesson.id,
        referenceImage: currentLesson.referenceImage,
      },
    });
  };

  const handleNextLesson = () => {
    const currentIndex = LESSON_ORDER.indexOf(currentLesson.id);
    if (currentIndex < LESSON_ORDER.length - 1) {
      navigate(`/canvas/${LESSON_ORDER[currentIndex + 1]}`);
      return;
    }
    navigate("/critique", { state: { artwork: null, lessonTitle: "Final Portfolio Review", isComplete: true } });
  };

  const activeLayer = layersState.layers.find((l) => l.id === layersState.activeLayerId);

  return (
    <div className="canvas-page">
      <header className="canvas-header">
        <div className="canvas-header-container">
          <div className="canvas-title-section">
            <h1 className="canvas-title">{currentLesson.title}</h1>
            <p className="canvas-subtitle">Canvas Interactiv de Desen</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowReference((s) => !s)}>
              {showReference ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
              {showReference ? "Ascunde" : "Arată"} Referința
            </Button>
          </div>
        </div>
      </header>

      <div className="canvas-content">
        <div className="canvas-layout">
          <div className="canvas-sidebar">
            <Button variant="ghost" onClick={() => navigate("/lessons")} className="back-button">
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
                  {currentLesson.objectives.map((objective) => (
                    <li key={objective}>{objective}</li>
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
                  {currentLesson.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-header">
                <Settings className="w-5 h-5" />
                <h3>Acțiuni</h3>
              </div>
              <div className="sidebar-content space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => drawingCanvasRef.current?.handleClear()}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Curăță
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => drawingCanvasRef.current?.handleRestart()}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restart
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => drawingCanvasRef.current?.handleDownload()}>
                  <Download className="w-4 h-4 mr-2" />
                  Descarcă PNG
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => drawingCanvasRef.current?.deleteSelection()}>
                  Șterge selecția
                </Button>
                <Button size="sm" className="w-full justify-start bg-primary text-primary-foreground" onClick={() => drawingCanvasRef.current?.handleComplete()}>
                  Finalizează lecția
                </Button>
                <Button size="sm" variant="secondary" className="w-full justify-start" onClick={handleNextLesson}>
                  Lecția următoare
                </Button>
              </div>
            </div>
          </div>

          <div className="canvas-main">
            <div className="canvas-zoom-bar">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-8 shrink-0" onClick={() => drawingCanvasRef.current?.undo()} title="Undo (Ctrl+Z)">
                  <Undo2 className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline text-xs">Undo</span>
                </Button>
                <Button size="sm" variant="outline" className="h-8 shrink-0" onClick={() => drawingCanvasRef.current?.redo()} title="Redo (Ctrl+Shift+Z)">
                  <Redo2 className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline text-xs">Redo</span>
                </Button>
              </div>
              <span className="text-sm font-medium whitespace-nowrap">Zoom: {zoomPercent}%</span>
              <div className="flex items-center gap-1 flex-1 justify-center">
                <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => drawingCanvasRef.current?.zoomOut()} title="Mărește">
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="h-8 px-2 min-w-[4rem]" onClick={() => drawingCanvasRef.current?.resetZoom()}>
                  Reset
                </Button>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => drawingCanvasRef.current?.zoomIn()} title="Micșorează">
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground whitespace-nowrap">Scroll = zoom · Spațiu sau tool Mișcare = pan</p>
            </div>
            <div className="canvas-container">
              <div className="canvas-area">
                <DrawingCanvas
                  ref={drawingCanvasRef}
                  referenceImage={currentLesson.referenceImage}
                  lessonTitle={currentLesson.title}
                  lessonId={currentLesson.id}
                  onComplete={handleComplete}
                  showReference={showReference}
                  activeColor={activeColor}
                  brushSize={brushSize}
                  brushOpacity={brushOpacity}
                  brushHardness={brushHardness}
                  brushSmoothing={brushSmoothing}
                  currentTool={currentTool}
                  onPickColor={(color) => typeof color === "string" && setActiveColor(color)}
                  onLayersChange={setLayersState}
                  onHistoryChange={setHistoryState}
                  onZoomChange={setZoomPercent}
                />
              </div>
            </div>
          </div>

          <div className="canvas-tools-sidebar">
            <div className="sidebar-section">
              <div className="sidebar-header">
                <Pencil className="w-5 h-5" />
                <h3>Drawing Tools</h3>
              </div>
              <div className="sidebar-content space-y-3">
                <div className="tool-selection flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button variant={currentTool === "brush" ? "default" : "outline"} size="sm" className="flex-1 min-w-0" onClick={() => setCurrentTool("brush")}>
                      <Pencil className="w-4 h-4 mr-1 shrink-0" />
                      <span className="truncate">Brush</span>
                    </Button>
                    <Button variant={currentTool === "eraser" ? "default" : "outline"} size="sm" className="flex-1 min-w-0" onClick={() => setCurrentTool("eraser")}>
                      <Eraser className="w-4 h-4 mr-1 shrink-0" />
                      <span className="truncate">Eraser</span>
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant={currentTool === "select" ? "default" : "outline"} size="sm" className="flex-1 min-w-0" onClick={() => setCurrentTool("select")}>
                      <Move className="w-4 h-4 mr-1 shrink-0" />
                      <span className="truncate">Select</span>
                    </Button>
                    <Button variant={currentTool === "eyedropper" ? "default" : "outline"} size="sm" className="flex-1 min-w-0" onClick={() => setCurrentTool("eyedropper")}>
                      <Palette className="w-4 h-4 mr-1 shrink-0" />
                      <span className="truncate">Picker</span>
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant={currentTool === "pan" ? "default" : "outline"} size="sm" className="flex-1 min-w-0" onClick={() => setCurrentTool("pan")} title="Mișcare canvas (H sau Spațiu + drag)">
                      <Hand className="w-4 h-4 mr-1 shrink-0" />
                      <span className="truncate">Mișcare</span>
                    </Button>
                  </div>
                </div>

                <div className="tool-control">
                  <label>Brush Size: {brushSize}px ( [ / ] )</label>
                  <input type="range" min="1" max="60" value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} className="brush-slider" />
                </div>
                <div className="tool-control">
                  <label>Opacity: {Math.round(brushOpacity * 100)}%</label>
                  <input type="range" min="5" max="100" value={Math.round(brushOpacity * 100)} onChange={(e) => setBrushOpacity(Number(e.target.value) / 100)} />
                </div>
                <div className="tool-control">
                  <label>Hardness: {Math.round(brushHardness * 100)}%</label>
                  <input type="range" min="5" max="100" value={Math.round(brushHardness * 100)} onChange={(e) => setBrushHardness(Number(e.target.value) / 100)} />
                </div>
                <div className="tool-control">
                  <label>Smoothing: {Math.round(brushSmoothing * 100)}%</label>
                  <input type="range" min="0" max="100" value={Math.round(brushSmoothing * 100)} onChange={(e) => setBrushSmoothing(Number(e.target.value) / 100)} />
                </div>

                <div className="rounded border p-2">
                  <p className="text-xs text-muted-foreground mb-1">Brush Preview</p>
                  <div className="h-12 flex items-center justify-center">
                    <div
                      style={{
                        width: `${Math.max(4, brushSize * 2)}px`,
                        height: `${Math.max(4, brushSize * 2)}px`,
                        borderRadius: "999px",
                        background: activeColor,
                        opacity: brushOpacity,
                        filter: `blur(${Math.max(0, (1 - brushHardness) * 6)}px)`,
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {BRUSH_PRESETS.map((preset) => (
                    <Button
                      key={preset.name}
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setBrushSize(preset.size);
                        setBrushOpacity(preset.opacity);
                        setBrushHardness(preset.hardness);
                        setBrushSmoothing(preset.smoothing);
                      }}
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-header">
                <Palette className="w-5 h-5" />
                <h3>Colors</h3>
              </div>
              <div className="sidebar-content space-y-3">
                <div className="color-palette flex flex-wrap gap-2">
                  {["#000000", "#444444", "#888888", "#cccccc", "#8B4513", "#D2691E", "#CD853F", "#F4A460", "#4ECDC4", "#45B7D1"].map(
                    (color) => (
                      <button
                        key={color}
                        type="button"
                        className={`w-6 h-6 rounded border ${activeColor === color ? "ring-2 ring-primary" : ""}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setActiveColor(color)}
                        aria-label={`Pick ${color}`}
                      />
                    )
                  )}
                </div>
                <div className="rounded border p-2">
                  <p className="text-xs text-muted-foreground mb-2">Umbră / Lumină</p>
                  <div className="flex gap-2">
                    {SHADOW_LIGHT.map(({ name, color, size, opacity, hardness, smoothing }) => (
                      <Button
                        key={name}
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setActiveColor(color);
                          setBrushSize(size);
                          setBrushOpacity(opacity);
                          setBrushHardness(hardness);
                          setBrushSmoothing(smoothing);
                        }}
                      >
                        <span className="w-3 h-3 rounded-full border border-gray-400 inline-block mr-1" style={{ backgroundColor: color }} />
                        {name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="custom-color">
                  <label className="block text-sm mb-1">Custom Color</label>
                  <input type="color" value={activeColor} onChange={(e) => setActiveColor(e.target.value)} className="custom-color-input" />
                  <p className="text-xs text-muted-foreground mt-1">Eyedropper: `I` sau `ALT + click`</p>
                </div>
              </div>
            </div>

            <div className="sidebar-section layers-panel">
              <div className="sidebar-header">
                <Layers className="w-4 h-4" />
                <h3>Layers</h3>
              </div>
              <div className="sidebar-content space-y-1.5">
                <Button size="sm" variant="outline" className="w-full text-xs h-8" onClick={() => drawingCanvasRef.current?.addLayer()}>
                  + Add
                </Button>
                {layersState.layers.map((layer) => (
                  <div key={layer.id} className={`border rounded p-1.5 ${layer.id === layersState.activeLayerId ? "border-primary" : ""}`}>
                    <div className="flex items-center gap-1">
                      <button type="button" className="text-left text-xs truncate flex-1 min-w-0" onClick={() => drawingCanvasRef.current?.setActiveLayer(layer.id)}>
                        {layer.name}
                      </button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => drawingCanvasRef.current?.moveLayer(layer.id, "up")}>↑</Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => drawingCanvasRef.current?.moveLayer(layer.id, "down")}>↓</Button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Button size="sm" variant="outline" className="h-6 text-xs px-1.5" onClick={() => drawingCanvasRef.current?.toggleLayerVisibility(layer.id)}>{layer.visible ? "Hide" : "Show"}</Button>
                      <Button size="sm" variant="outline" className="h-6 text-xs px-1.5" onClick={() => drawingCanvasRef.current?.toggleLayerLock(layer.id)}>{layer.locked ? "Lock" : "Unlock"}</Button>
                      <Button size="sm" variant="outline" className="h-6 text-xs px-1.5" onClick={() => { const n = window.prompt("Nume", layer.name); if (n) drawingCanvasRef.current?.renameLayer(layer.id, n.trim()); }}>Ren</Button>
                      <Button size="sm" variant="destructive" className="h-6 text-xs px-1.5" onClick={() => drawingCanvasRef.current?.deleteLayer(layer.id)}>Del</Button>
                    </div>
                    <div className="mt-1">
                      <input type="range" min="0" max="100" value={Math.round(layer.opacity * 100)} onChange={(e) => drawingCanvasRef.current?.setLayerOpacity(layer.id, Number(e.target.value) / 100)} className="w-full h-1" title={`Opacitate ${Math.round(layer.opacity * 100)}%`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-section history-panel">
              <div className="sidebar-header">
                <History className="w-4 h-4" />
                <h3>History</h3>
              </div>
              <div className="sidebar-content space-y-1">
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="flex-1 h-7 text-xs" onClick={() => drawingCanvasRef.current?.undo()}>
                    <Undo2 className="w-3 h-3 mr-0.5" />Undo
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 h-7 text-xs" onClick={() => drawingCanvasRef.current?.redo()}>
                    <Redo2 className="w-3 h-3 mr-0.5" />Redo
                  </Button>
                </div>
                <div className="max-h-20 overflow-auto border rounded p-1.5 text-xs">
                  {historyState.entries.slice(-8).map((entry, idx) => {
                    const globalIndex = historyState.entries.length - Math.min(8, historyState.entries.length) + idx;
                    return (
                      <div key={`${entry.at}_${idx}`} className={globalIndex === historyState.index ? "font-semibold truncate" : "text-muted-foreground truncate"}>
                        {entry.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {activeLayer && (
              <p className="text-xs text-muted-foreground">Active layer: {activeLayer.name} {activeLayer.locked ? "(locked)" : ""}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;

