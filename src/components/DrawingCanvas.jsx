import { 
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas as FabricCanvas, FabricImage, PencilBrush } from "fabric";
import { toast } from "sonner";

const HISTORY_LIMIT = 80;

const toRgba = (hexColor, opacity) => {
  const hex = (hexColor || "#000000").replace("#", "");
  const safe = hex.length === 3 ? hex.split("").map((c) => `${c}${c}`).join("") : hex.padEnd(6, "0");
  const r = Number.parseInt(safe.substring(0, 2), 16) || 0;
  const g = Number.parseInt(safe.substring(2, 4), 16) || 0;
  const b = Number.parseInt(safe.substring(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0.01, Math.min(1, opacity))})`;
};

const genLayerId = () => `layer_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const defaultLayer = () => ({
  id: genLayerId(),
  name: "Layer 1",
  visible: true,
  locked: false,
  opacity: 1,
});

export const DrawingCanvas = forwardRef(
  (
    {
  referenceImage, 
  lessonTitle, 
      lessonId,
  onComplete,
      showReference,
      activeColor,
      brushSize,
      brushOpacity = 1,
      brushHardness = 0.9,
      brushSmoothing = 0.4,
      currentTool = "brush",
      onPickColor,
      onLayersChange,
      onHistoryChange,
      onZoomChange,
    },
    ref
  ) => {
    const canvasElRef = useRef(null);
    const canvasWrapRef = useRef(null);
    const fabricRef = useRef(null);
    const isRestoringRef = useRef(false);
    const isPanningRef = useRef(false);
    const panLastPosRef = useRef({ x: 0, y: 0 });
    const spacePressedRef = useRef(false);
    const saveTimerRef = useRef(null);
    const scheduleAutosaveRef = useRef(() => {});
    const currentToolRef = useRef(currentTool);
    const onPickColorRef = useRef(onPickColor);
    const showReferenceRef = useRef(showReference);
    const referenceImageRef = useRef(referenceImage);
    const historyRef = useRef([]);
    const historyIndexRef = useRef(-1);

    const [layers, setLayers] = useState([defaultLayer()]);
    const [activeLayerId, setActiveLayerId] = useState(null);
    const activeLayerIdRef = useRef(activeLayerId);
    const [historyEntries, setHistoryEntries] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [zoomPercent, setZoomPercent] = useState(100);

    const activeLayer = useMemo(
      () => layers.find((layer) => layer.id === activeLayerId) || layers[0] || null,
      [layers, activeLayerId]
    );

    const draftStorageKey = useMemo(
      () => `canvas_draft_${lessonId || lessonTitle || "default"}`,
      [lessonId, lessonTitle]
    );

    const syncHistoryState = useCallback(() => {
      setHistoryEntries([...historyRef.current]);
      setHistoryIndex(historyIndexRef.current);
      onHistoryChange?.({
        entries: [...historyRef.current],
        index: historyIndexRef.current,
      });
    }, [onHistoryChange]);

    const pushHistory = useCallback(
      (label = "Change") => {
        const canvas = fabricRef.current;
        if (!canvas || isRestoringRef.current) return;

        const snapshot = JSON.stringify(canvas.toJSON(["layerId"]));
        const next = historyRef.current.slice(0, historyIndexRef.current + 1);
        next.push({ label, snapshot, at: Date.now() });
        if (next.length > HISTORY_LIMIT) {
          next.shift();
        }

        historyRef.current = next;
        historyIndexRef.current = next.length - 1;
        syncHistoryState();
      },
      [syncHistoryState]
    );

    const restoreHistoryAt = useCallback(
      async (index) => {
        const canvas = fabricRef.current;
        if (!canvas) return;
        const entry = historyRef.current[index];
        if (!entry) return;

        isRestoringRef.current = true;
        await canvas.loadFromJSON(entry.snapshot);
        canvas.renderAll();
        historyIndexRef.current = index;
        syncHistoryState();
        isRestoringRef.current = false;
      },
      [syncHistoryState]
    );

    const applyLayerStateToObjects = useCallback(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      const objects = canvas.getObjects();
      objects.forEach((obj) => {
        const layer = layers.find((l) => l.id === obj.layerId);
        if (!layer) return;
        obj.visible = layer.visible;
        obj.opacity = layer.opacity;
        const selectable = !layer.locked && currentTool === "select";
        obj.selectable = selectable;
        obj.evented = selectable;
      });

      // Keep objects stacked in layer order.
      layers.forEach((layer) => {
        objects
          .filter((obj) => obj.layerId === layer.id)
          .forEach((obj) => canvas.bringObjectToFront(obj));
      });

      canvas.renderAll();
    }, [layers, currentTool]);

    const scheduleAutosave = useCallback(() => {
      const canvas = fabricRef.current;
      if (!canvas || isRestoringRef.current) return;
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

      saveTimerRef.current = setTimeout(() => {
        try {
          const payload = {
            layers,
            activeLayerId,
            zoom: canvas.getZoom(),
            viewportTransform: canvas.viewportTransform,
            json: canvas.toJSON(["layerId"]),
          };
          localStorage.setItem(draftStorageKey, JSON.stringify(payload));
        } catch {
          // Best-effort autosave.
        }
      }, 600);
    }, [layers, activeLayerId, draftStorageKey]);

    useEffect(() => {
      scheduleAutosaveRef.current = scheduleAutosave;
    }, [scheduleAutosave]);

    useEffect(() => {
      currentToolRef.current = currentTool;
    }, [currentTool]);

    useEffect(() => {
      onPickColorRef.current = onPickColor;
    }, [onPickColor]);

    useEffect(() => {
      activeLayerIdRef.current = activeLayerId;
    }, [activeLayerId]);

    useEffect(() => {
      showReferenceRef.current = showReference;
      referenceImageRef.current = referenceImage;
    }, [showReference, referenceImage]);

    const updateBrush = useCallback(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const usingSelect = currentTool === "select";
      const usingEyedropper = currentTool === "eyedropper";
      const usingPan = currentTool === "pan";

      canvas.isDrawingMode = !usingSelect && !usingEyedropper && !usingPan;
      canvas.selection = usingSelect;

      if (!canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush = new PencilBrush(canvas);
      }

      const layerLocked = activeLayer?.locked;
      if (layerLocked) {
        canvas.isDrawingMode = false;
      }

      if (currentTool === "eraser") {
        canvas.freeDrawingBrush.color = "rgba(255,255,255,1)";
        canvas.freeDrawingBrush.globalCompositeOperation = "destination-out";
      } else {
        canvas.freeDrawingBrush.color = toRgba(activeColor, brushOpacity);
        canvas.freeDrawingBrush.globalCompositeOperation = "source-over";
      }

      canvas.freeDrawingBrush.width = Math.max(1, brushSize);
      // Higher smoothing means more decimation (fewer points).
      canvas.freeDrawingBrush.decimate = Math.round(brushSmoothing * 12);
      // Approximate hardness by softening edges using shadow blur.
      const blur = Math.max(0, (1 - brushHardness) * brushSize * 1.6);
      canvas.freeDrawingBrush.shadow = blur
        ? { color: toRgba(activeColor, brushOpacity), blur, offsetX: 0, offsetY: 0 }
        : null;

      applyLayerStateToObjects();
    }, [
      currentTool,
      activeLayer,
      activeColor,
      brushOpacity,
      brushSize,
      brushSmoothing,
      brushHardness,
      applyLayerStateToObjects,
    ]);

    const setZoom = useCallback(
      (nextZoom) => {
        const canvas = fabricRef.current;
        if (!canvas) return;
        const clamped = Math.min(4, Math.max(0.2, nextZoom));
        canvas.setZoom(clamped);
        canvas.renderAll();
        const pct = Math.round(clamped * 100);
        setZoomPercent(pct);
        onZoomChange?.(pct);
        scheduleAutosave();
      },
      [onZoomChange, scheduleAutosave]
    );

    const resetZoom = useCallback(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      setZoom(1);
    }, [setZoom]);

    const undo = useCallback(() => {
      if (historyIndexRef.current <= 0) return;
      restoreHistoryAt(historyIndexRef.current - 1);
    }, [restoreHistoryAt]);

    const redo = useCallback(() => {
      if (historyIndexRef.current >= historyRef.current.length - 1) return;
      restoreHistoryAt(historyIndexRef.current + 1);
    }, [restoreHistoryAt]);

    const handleClear = useCallback(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const bgImage = canvas.backgroundImage;
      canvas.clear();
      canvas.backgroundColor = "#ffffff";
      if (bgImage) canvas.backgroundImage = bgImage;
      canvas.renderAll();
      pushHistory("Clear canvas");
      scheduleAutosave();
      toast.success("Desenul a fost golit, schița rămâne.");
    }, [pushHistory, scheduleAutosave]);

    const handleRestart = useCallback(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const bgImage = canvas.backgroundImage;
      canvas.clear();
      canvas.backgroundColor = "#ffffff";
      if (bgImage) canvas.backgroundImage = bgImage;
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      canvas.setZoom(1);
      setZoomPercent(100);
      onZoomChange?.(100);
      canvas.renderAll();
      pushHistory("Restart");
      scheduleAutosave();
      toast.success("Canvas resetat la starea inițială.");
    }, [pushHistory, scheduleAutosave, onZoomChange]);

    const exportPngWithoutReference = useCallback(() => {
      const canvas = fabricRef.current;
      if (!canvas) return null;
      const currentBackground = canvas.backgroundImage;
      canvas.backgroundImage = null;
      canvas.renderAll();
      const dataURL = canvas.toDataURL({ format: "png", quality: 1, multiplier: 2 });
      if (showReference && currentBackground) {
        canvas.backgroundImage = currentBackground;
        canvas.renderAll();
      }
      return dataURL;
    }, [showReference]);

    const handleDownload = useCallback(() => {
      const dataURL = exportPngWithoutReference();
      if (!dataURL) return;
      const link = document.createElement("a");
      link.download = `${(lessonTitle || "artwork").replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Lucrarea a fost descărcată!");
    }, [exportPngWithoutReference, lessonTitle]);

    const handleComplete = useCallback(() => {
      const dataURL = exportPngWithoutReference();
      if (!dataURL) return;
      onComplete?.(dataURL);
      toast.success("Lecția completată!");
    }, [exportPngWithoutReference, onComplete]);

    const deleteSelection = useCallback(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const active = canvas.getActiveObjects();
      if (!active.length) return;
      active.forEach((obj) => canvas.remove(obj));
      canvas.discardActiveObject();
      canvas.renderAll();
      pushHistory("Delete selection");
      scheduleAutosave();
    }, [pushHistory, scheduleAutosave]);

    const addLayer = useCallback(() => {
      const layer = {
        id: genLayerId(),
        name: `Layer ${layers.length + 1}`,
        visible: true,
        locked: false,
        opacity: 1,
      };
      setLayers((prev) => [...prev, layer]);
      setActiveLayerId(layer.id);
    }, [layers.length]);

    const deleteLayer = useCallback(
      (layerId) => {
        const canvas = fabricRef.current;
        if (!canvas || layers.length <= 1) return;

        canvas.getObjects().forEach((obj) => {
          if (obj.layerId === layerId) canvas.remove(obj);
        });

        const filtered = layers.filter((layer) => layer.id !== layerId);
        setLayers(filtered);
        if (activeLayerId === layerId) {
          setActiveLayerId(filtered[filtered.length - 1]?.id || filtered[0]?.id || null);
        }
        pushHistory("Delete layer");
        scheduleAutosave();
      },
      [layers, activeLayerId, pushHistory, scheduleAutosave]
    );

    const renameLayer = useCallback((layerId, name) => {
      setLayers((prev) => prev.map((layer) => (layer.id === layerId ? { ...layer, name: name || layer.name } : layer)));
    }, []);

    const moveLayer = useCallback((layerId, direction) => {
      setLayers((prev) => {
        const index = prev.findIndex((layer) => layer.id === layerId);
        if (index < 0) return prev;
        const target = direction === "up" ? index + 1 : index - 1;
        if (target < 0 || target >= prev.length) return prev;
        const next = [...prev];
        [next[index], next[target]] = [next[target], next[index]];
        return next;
      });
    }, []);

    const toggleLayerVisibility = useCallback((layerId) => {
      setLayers((prev) => prev.map((layer) => (layer.id === layerId ? { ...layer, visible: !layer.visible } : layer)));
    }, []);

    const toggleLayerLock = useCallback((layerId) => {
      setLayers((prev) => prev.map((layer) => (layer.id === layerId ? { ...layer, locked: !layer.locked } : layer)));
    }, []);

    const setLayerOpacity = useCallback((layerId, opacity) => {
      setLayers((prev) =>
        prev.map((layer) => (layer.id === layerId ? { ...layer, opacity: Math.max(0, Math.min(1, opacity)) } : layer))
      );
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        handleClear,
        handleRestart,
        handleDownload,
        handleComplete,
        undo,
        redo,
        deleteSelection,
        resetZoom,
        addLayer,
        deleteLayer,
        renameLayer,
        moveLayer,
        toggleLayerVisibility,
        toggleLayerLock,
        setLayerOpacity,
        setActiveLayer: setActiveLayerId,
        zoomIn: () => setZoom((fabricRef.current?.getZoom() || 1) * 1.1),
        zoomOut: () => setZoom((fabricRef.current?.getZoom() || 1) / 1.1),
      }),
      [
    handleClear,
    handleRestart,
    handleDownload,
    handleComplete,
        undo,
        redo,
        deleteSelection,
        resetZoom,
        addLayer,
        deleteLayer,
        renameLayer,
        moveLayer,
        toggleLayerVisibility,
        toggleLayerLock,
        setLayerOpacity,
        setZoom,
      ]
    );

    useEffect(() => {
      onLayersChange?.({ layers, activeLayerId });
    }, [layers, activeLayerId, onLayersChange]);

  useEffect(() => {
      if (!canvasElRef.current) return undefined;

      const containerEl = canvasWrapRef.current;
      const w = containerEl ? Math.max(200, Math.floor(containerEl.clientWidth)) : 600;
      const h = containerEl ? Math.max(200, Math.floor(containerEl.clientHeight)) : 500;

      const canvas = new FabricCanvas(canvasElRef.current, {
        width: w,
        height: h,
        backgroundColor: "#ffffff",
        selection: currentTool === "select",
      });
      fabricRef.current = canvas;

      const scaleBackgroundToCanvas = () => {
        const c = fabricRef.current;
        if (!c || !c.backgroundImage) return;
        const w = c.getWidth();
        const h = c.getHeight();
        const img = c.backgroundImage;
        const iw = img.width || 1;
        const ih = img.height || 1;
        if (w <= 0 || h <= 0) return;
        const scaleToFit = Math.min(w / iw, h / ih);
        const scaledW = iw * scaleToFit;
        const scaledH = ih * scaleToFit;
        img.set({
          scaleX: scaleToFit,
          scaleY: scaleToFit,
          left: (w - scaledW) / 2,
          top: (h - scaledH) / 2,
          originX: "left",
          originY: "top",
        });
        c.renderAll();
      };

      const resizeCanvas = () => {
        const el = canvasWrapRef.current;
        if (!el || !fabricRef.current) return;
        const cw = Math.max(200, Math.floor(el.clientWidth));
        const ch = Math.max(200, Math.floor(el.clientHeight));
        fabricRef.current.setDimensions({ width: cw, height: ch });
        if (showReferenceRef.current && fabricRef.current.backgroundImage) {
          scaleBackgroundToCanvas();
        } else {
          fabricRef.current.renderAll();
        }
      };

      let resizeObserver = null;
      if (containerEl) {
        resizeCanvas();
        resizeObserver = new ResizeObserver(resizeCanvas);
        resizeObserver.observe(containerEl);
      }

      const firstLayerId = layers[0].id;
      setActiveLayerId(firstLayerId);

      const handlePathCreated = (event) => {
        if (isRestoringRef.current) return;
        if (!event.path) return;
        event.path.layerId = activeLayerIdRef.current || firstLayerId;
        pushHistory(currentToolRef.current === "eraser" ? "Erase stroke" : "Brush stroke");
        scheduleAutosaveRef.current();
      };

      const handleObjectChanged = () => {
        if (isRestoringRef.current) return;
        pushHistory("Object transform");
        scheduleAutosaveRef.current();
      };

      const handleWheelZoom = (opt) => {
        const delta = opt.e.deltaY;
        let zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        zoom = Math.max(0.2, Math.min(4, zoom));
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
        const pct = Math.round(zoom * 100);
        setZoomPercent(pct);
        onZoomChange?.(pct);
        scheduleAutosaveRef.current();
      };

      const handleMouseDown = (opt) => {
        const { e, target } = opt;

        if (currentToolRef.current === "eyedropper" || e.altKey) {
          const color = target?.stroke || target?.fill;
          if (color) onPickColorRef.current?.(color);
          return;
        }

        if (currentToolRef.current === "pan" || spacePressedRef.current) {
          isPanningRef.current = true;
          panLastPosRef.current = { x: e.clientX, y: e.clientY };
          canvas.selection = false;
        }
      };

      const handleMouseMove = (opt) => {
        if (!isPanningRef.current) return;
        const e = opt.e;
        const vpt = canvas.viewportTransform;
        if (!vpt) return;
        vpt[4] += e.clientX - panLastPosRef.current.x;
        vpt[5] += e.clientY - panLastPosRef.current.y;
        panLastPosRef.current = { x: e.clientX, y: e.clientY };
        canvas.requestRenderAll();
      };

      const handleMouseUp = () => {
        if (isPanningRef.current) {
          isPanningRef.current = false;
          canvas.selection = currentToolRef.current === "select";
          scheduleAutosaveRef.current();
        }
      };

      const handleKeyDown = (event) => {
        if (event.code === "Space") spacePressedRef.current = true;
      };

      const handleKeyUp = (event) => {
        if (event.code === "Space") spacePressedRef.current = false;
      };

      canvas.on("path:created", handlePathCreated);
      canvas.on("object:modified", handleObjectChanged);
      canvas.on("object:removed", handleObjectChanged);
      canvas.on("mouse:wheel", handleWheelZoom);
      canvas.on("mouse:down", handleMouseDown);
      canvas.on("mouse:move", handleMouseMove);
      canvas.on("mouse:up", handleMouseUp);
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      const restoreDraft = async () => {
        try {
          const raw = localStorage.getItem(draftStorageKey);
          if (!raw) {
            pushHistory("Initial");
            return;
          }
          const payload = JSON.parse(raw);
          isRestoringRef.current = true;
          if (Array.isArray(payload.layers) && payload.layers.length) {
            setLayers(payload.layers);
            setActiveLayerId(payload.activeLayerId || payload.layers[0].id);
          }
          if (payload.json) {
            await canvas.loadFromJSON(payload.json);
          }
          if (Array.isArray(payload.viewportTransform)) {
            canvas.setViewportTransform(payload.viewportTransform);
          }
          if (payload.zoom) {
            canvas.setZoom(payload.zoom);
            const pct = Math.round(payload.zoom * 100);
            setZoomPercent(pct);
            onZoomChange?.(pct);
          }
          canvas.renderAll();
          isRestoringRef.current = false;
          pushHistory("Restore autosave");
        } catch {
          isRestoringRef.current = false;
          pushHistory("Initial");
        }
      };

      restoreDraft();

    return () => {
        if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
        if (resizeObserver && canvasWrapRef.current) resizeObserver.disconnect();
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
        canvas.dispose();
      };
    }, [draftStorageKey, pushHistory, onZoomChange]);

  useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas || !referenceImage) return;

      if (!showReference) {
        canvas.backgroundImage = null;
        canvas.backgroundColor = "#ffffff";
        canvas.renderAll();
        return;
      }

      FabricImage.fromURL(referenceImage).then((img) => {
        const w = canvas.getWidth();
        const h = canvas.getHeight();
        const iw = img.width || 1;
        const ih = img.height || 1;
        if (w <= 0 || h <= 0) {
          canvas.backgroundImage = img;
          canvas.renderAll();
          return;
        }
        const scaleToFit = Math.min(w / iw, h / ih);
        const scaleX = scaleToFit;
        const scaleY = scaleToFit;
        const scaledW = iw * scaleX;
        const scaledH = ih * scaleY;
        img.set({
          opacity: 0.35,
          scaleX,
          scaleY,
          left: (w - scaledW) / 2,
          top: (h - scaledH) / 2,
          originX: "left",
          originY: "top",
          selectable: false,
          evented: false,
        });
        canvas.backgroundImage = img;
        canvas.renderAll();
      });
    }, [referenceImage, showReference]);

    useEffect(() => {
      applyLayerStateToObjects();
      scheduleAutosave();
    }, [layers, activeLayerId, applyLayerStateToObjects, scheduleAutosave]);

    useEffect(() => {
      updateBrush();
    }, [updateBrush]);

  return (
      <div className="h-full w-full min-h-0 min-w-0 flex flex-col">
        <div ref={canvasWrapRef} className="flex-1 min-h-0 min-w-0 w-full h-full border-2 border-border rounded-lg bg-canvas overflow-hidden">
          <canvas ref={canvasElRef} className="block" />
        </div>
        <div className="mt-1 flex-shrink-0 text-xs text-muted-foreground flex justify-between">
          <span>Zoom: {zoomPercent}%</span>
          <span>Autosave activ</span>
        </div>
      </div>
    );
  }
  );

