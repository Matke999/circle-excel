import React from 'react';
import { FontControls } from '../toolbar/FontControls';
import { TextFormatting } from '../toolbar/TextFormatting';
import { ColorPicker } from '../toolbar/ColorPicker';
import { AlignmentControls } from '../toolbar/AlignmentControls';
import { ImageInsert } from '../toolbar/ImageInsert';
import { RingControls } from '../toolbar/RingControls';
import { useExport } from '../../hooks/useExport';
import { useSelectionStore } from '../../store/selectionStore';
import { useDocumentStore } from '../../store/documentStore';

function RotationControl() {
  const selection = useSelectionStore((state) => state.selection);
  const cell = useDocumentStore((state) => {
    const { ringIndex, cellIndex } = selection;
    if (ringIndex === null || cellIndex === null) return null;
    return state.document.rings[ringIndex]?.cells[cellIndex] ?? null;
  });
  const updateCellStyle = useDocumentStore((state) => state.updateCellStyle);

  const rotation = cell?.style.rotation ?? 0;

  const setRotation = (value: number) => {
    const { ringIndex, cellIndex } = selection;
    if (ringIndex !== null && cellIndex !== null) {
      updateCellStyle(ringIndex, cellIndex, { rotation: value });
    }
  };

  return (
    <div className="flex items-center gap-1" title="Rotation">
      <span className="text-xs text-gray-500">↻</span>
      <input
        type="number"
        className="w-14 text-xs border rounded px-1 py-0.5 bg-white"
        value={rotation}
        min={-360}
        max={360}
        step={15}
        onChange={(e) => setRotation(Number(e.target.value))}
        disabled={!cell}
        title="Rotation angle in degrees"
      />
      <span className="text-[10px] text-gray-400">°</span>
    </div>
  );
}

function ImageScaleControl() {
  const selection = useSelectionStore((state) => state.selection);
  const cell = useDocumentStore((state) => {
    const { ringIndex, cellIndex } = selection;
    if (ringIndex === null || cellIndex === null) return null;
    return state.document.rings[ringIndex]?.cells[cellIndex] ?? null;
  });
  const updateCellStyle = useDocumentStore((state) => state.updateCellStyle);

  const scale = cell?.style.imageScale ?? 1;
  const hasImages = (cell?.content.images?.length ?? 0) > 0;

  const setScale = (value: number) => {
    const { ringIndex, cellIndex } = selection;
    if (ringIndex !== null && cellIndex !== null) {
      updateCellStyle(ringIndex, cellIndex, { imageScale: value });
    }
  };

  if (!hasImages) return null;

  return (
    <div className="flex items-center gap-1" title="Image Scale">
      <span className="text-xs text-gray-500">🖼</span>
      <input
        type="range"
        className="w-16"
        value={scale}
        min={0.25}
        max={3}
        step={0.25}
        onChange={(e) => setScale(Number(e.target.value))}
        disabled={!cell}
        title={`Image scale: ${Math.round(scale * 100)}%`}
      />
      <span className="text-[10px] text-gray-400">{Math.round(scale * 100)}%</span>
    </div>
  );
}

export function Toolbar() {
  const { exportAsPNG, exportAsPDF } = useExport();

  return (
    <div className="toolbar flex items-center gap-2 px-3 py-2 bg-gray-100 border-b border-gray-300 overflow-x-auto flex-shrink-0">
      <FontControls />
      <div className="w-px h-6 bg-gray-300" />
      <TextFormatting />
      <div className="w-px h-6 bg-gray-300" />
      <ColorPicker />
      <div className="w-px h-6 bg-gray-300" />
      <AlignmentControls />
      <div className="w-px h-6 bg-gray-300" />
      <RotationControl />
      <div className="w-px h-6 bg-gray-300" />
      <ImageInsert />
      <ImageScaleControl />
      <div className="w-px h-6 bg-gray-300" />
      <RingControls />
      <div className="w-px h-6 bg-gray-300" />
      <div className="flex items-center gap-1">
        <button
          className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100"
          onClick={() => exportAsPNG('ring-view-container')}
          title="Export as PNG"
        >
          📸 PNG
        </button>
        <button
          className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100"
          onClick={() => exportAsPDF('ring-view-container')}
          title="Export as PDF"
        >
          📄 PDF
        </button>
      </div>
    </div>
  );
}
