import React from 'react';
import { FontControls } from '../toolbar/FontControls';
import { TextFormatting } from '../toolbar/TextFormatting';
import { ColorPicker } from '../toolbar/ColorPicker';
import { AlignmentControls } from '../toolbar/AlignmentControls';
import { ImageInsert } from '../toolbar/ImageInsert';
import { RingControls } from '../toolbar/RingControls';
import { useExport } from '../../hooks/useExport';

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
      <ImageInsert />
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
