import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Canvas as FabricCanvas, Circle, Rect, PencilBrush, FabricImage } from "fabric";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Slider } from "@/components/ui/slider.jsx";
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

export const DrawingCanvas = forwardRef(({ 
  referenceImage, 
  lessonTitle, 
  onNext, 
  onComplete,
  showReference: externalShowReference,
  onToggleReference,
  activeColor: externalActiveColor,
  brushSize: externalBrushSize
}, ref) => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [internalActiveColor, setInternalActiveColor] = useState("#000000");
  const [internalBrushSize, setInternalBrushSize] = useState([2]);
  const [internalShowReference, setInternalShowReference] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);

  // Use external state if provided, otherwise use internal state
  const showReference = externalShowReference !== undefined ? externalShowReference : internalShowReference;
  const setShowReference = onToggleReference || setInternalShowReference;
  const activeColor = externalActiveColor !== undefined ? externalActiveColor : internalActiveColor;
  const brushSize = externalBrushSize !== undefined ? [externalBrushSize] : internalBrushSize;

  // Expose methods through ref
  useImperativeHandle(ref, () => ({
    handleClear,
    handleDownload,
    handleComplete
  }));

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
          scaleX: 600 / img.width,
          scaleY: 600 / img.height,
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
    
    // Store the current background image state
    const currentBackgroundImage = fabricCanvas.backgroundImage;
    
    // Clear the canvas
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    
    // Restore the background image if reference should be shown
    if (showReference && currentBackgroundImage) {
      fabricCanvas.backgroundImage = currentBackgroundImage;
    }
    
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
    <div className="h-full">
      {/* Canvas Area */}
      <div className="h-full">
        <div className="border-2 border-border rounded-lg bg-canvas h-full flex items-center justify-center">
          <canvas 
            ref={canvasRef} 
            className="max-w-full" 
          />
        </div>
      </div>
    </div>
  );
}); 