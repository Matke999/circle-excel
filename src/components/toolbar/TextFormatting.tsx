import React from 'react';
import { useSelectionStore } from '../../store/selectionStore';
import { useDocumentStore } from '../../store/documentStore';

export function TextFormatting() {
  const selection = useSelectionStore((state) => state.selection);
  const cell = useDocumentStore((state) => {
    const { ringIndex, cellIndex } = selection;
    if (ringIndex === null || cellIndex === null) return null;
    return state.document.rings[ringIndex]?.cells[cellIndex] ?? null;
  });
  const updateCellStyle = useDocumentStore((state) => state.updateCellStyle);

  const toggle = (prop: 'bold' | 'italic' | 'underline') => {
    const { ringIndex, cellIndex } = selection;
    if (ringIndex !== null && cellIndex !== null && cell) {
      updateCellStyle(ringIndex, cellIndex, { [prop]: !cell.style[prop] });
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      <button
        className={`w-7 h-7 flex items-center justify-center rounded border text-sm font-bold hover:bg-gray-100 active:bg-gray-200 ${
          cell?.style.bold ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
        }`}
        onClick={() => toggle('bold')}
        disabled={!cell}
        title="Bold"
      >
        B
      </button>
      <button
        className={`w-7 h-7 flex items-center justify-center rounded border text-sm italic hover:bg-gray-100 active:bg-gray-200 ${
          cell?.style.italic ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
        }`}
        onClick={() => toggle('italic')}
        disabled={!cell}
        title="Italic"
      >
        I
      </button>
      <button
        className={`w-7 h-7 flex items-center justify-center rounded border text-sm underline hover:bg-gray-100 active:bg-gray-200 ${
          cell?.style.underline ? 'bg-blue-100 border-blue-400' : 'border-gray-300'
        }`}
        onClick={() => toggle('underline')}
        disabled={!cell}
        title="Underline"
      >
        U
      </button>
    </div>
  );
}
