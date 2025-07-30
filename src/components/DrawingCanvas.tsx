import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, PencilBrush, FabricImage } from "fabric";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Palette, 
  Eraser, 
  RotateCcw, 
  Download, 
  Eye, 
  EyeOff,
  Pencil
} from "lucide-react";
import { toast } from "sonner";

interface DrawingCanvasProps {
  referenceImage?: string;
  lessonTitle: string;
  onNext?: () => void;
  onComplete?: (artwork: string) => void;
}

export const DrawingCanvas = ({ 
  referenceImage, 
  lessonTitle, 
  onNext, 
  onComplete 
}: DrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState([2]);
  const [showReference, setShowReference] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);

  const colors = [
    "#000000", "#444444", "#888888", "#cccccc",
    "#8B4513", "#D2691E", "#CD853F", "#F4A460",
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 600,
      height: 600,
      backgroundColor: "#ffffff",
    });

    // Initialize the freeDrawingBrush
    canvas.freeDrawingBrush = new PencilBrush(canvas);
    canvas.freeDrawingBrush.color = activeColor;
    canvas.freeDrawingBrush.width = brushSize[0];
    canvas.isDrawingMode = true;

    setFabricCanvas(canvas);
    toast.success("Canvas ready! Start drawing!");

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    if (fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = brushSize[0];
    }
  }, [activeColor, brushSize, fabricCanvas]);

  useEffect(() => {
    if (!fabricCanvas || !referenceImage) return;

    if (showReference) {
      // Load and add reference image as background
      FabricImage.fromURL(referenceImage).then((img) => {
        img.set({
          opacity: 0.3,
          scaleX: 600 / img.width!,
          scaleY: 600 / img.height!,
          selectable: false,
          evented: false
        });
        fabricCanvas.backgroundImage = img;
        fabricCanvas.renderAll();
      });
    } else {
      fabricCanvas.backgroundImage = null;
      fabricCanvas.backgroundColor = "#ffffff";
      fabricCanvas.renderAll();
    }
  }, [showReference, referenceImage, fabricCanvas]);

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.backgroundImage = null;
    fabricCanvas.renderAll();
    toast.success("Canvas cleared!");
  };

  const handleDownload = () => {
    if (!fabricCanvas) return;
    
    const dataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2
    });
    
    const link = document.createElement('a');
    link.download = `${lessonTitle.replace(/\s+/g, '-').toLowerCase()}-artwork.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Artwork downloaded!");
  };

  const handleComplete = () => {
    if (!fabricCanvas) return;
    
    const dataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2
    });
    
    onComplete?.(dataURL);
    toast.success("Lesson completed!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
      {/* Canvas Area */}
      <div className="lg:col-span-3">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{lessonTitle}</CardTitle>
                <Badge variant="secondary" className="mt-2">
                  Interactive Drawing Canvas
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowReference(!showReference)}
                  className="gap-2"
                >
                  {showReference ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showReference ? "Hide" : "Show"} Reference
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="border-2 border-border rounded-lg p-4 bg-canvas">
              <canvas 
                ref={canvasRef} 
                className="border border-border rounded shadow-canvas max-w-full" 
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tools Panel */}
      <div className="space-y-6">
        {/* Drawing Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Pencil className="w-5 h-5" />
              Drawing Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Brush Size */}
            <div>
              <label className="text-sm font-medium">Brush Size: {brushSize[0]}px</label>
              <Slider
                value={brushSize}
                onValueChange={setBrushSize}
                min={1}
                max={20}
                step={1}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Colors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    activeColor === color ? 'border-primary scale-110' : 'border-border'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setActiveColor(color)}
                />
              ))}
            </div>
            
            <div className="mt-4">
              <label className="text-sm font-medium">Custom Color</label>
              <input
                type="color"
                value={activeColor}
                onChange={(e) => setActiveColor(e.target.value)}
                className="w-full h-8 rounded border border-border mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClear}
              className="w-full gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Clear Canvas
            </Button>
            
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={handleDownload}
              className="w-full gap-2"
            >
              <Download className="w-4 h-4" />
              Download PNG
            </Button>
            
            {onComplete && (
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleComplete}
                className="w-full"
              >
                Complete Lesson
              </Button>
            )}
            
            {onNext && (
              <Button 
                variant="default" 
                size="sm" 
                onClick={onNext}
                className="w-full"
              >
                Next Lesson
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};