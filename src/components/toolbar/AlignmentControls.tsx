import React from 'react';
import { useSelectionStore } from '../../store/selectionStore';
import { useDocumentStore } from '../../store/documentStore';

export function AlignmentControls() {
  const selection = useSelectionStore((state) => state.selection);
  const cell = useDocumentStore((state) => {
    const { ringIndex, cellIndex } = selection;
    if (ringIndex === null || cellIndex === null) return null;
    return state.document.rings[ringIndex]?.cells[cellIndex] ?? null;
  });
  const updateCellStyle = useDocumentStore((state) => state.updateCellStyle);

  const setAlign = (textAlign: 'left' | 'center' | 'right') => {
    const { ringIndex, cellIndex } = selection;
    if (ringIndex !== null && cellIndex !== null) {
      updateCellStyle(ringIndex, cellIndex, { textAlign });
    }
  };

  const currentAlign = cell?.style.textAlign ?? 'center';

  return (
    <div className="flex items-center gap-0.5">
      {(['left', 'center', 'right'] as const).map((align) => (
        <button
          key={align}
          className={`w-7 h-7 flex items-center justify-center rounded border text-xs hover:bg-gray-100 ${
            currentAlign === align
              ? 'bg-blue-100 border-blue-400'
              : 'border-gray-300'
          }`}
          onClick={() => setAlign(align)}
          disabled={!cell}
          title={`Align ${align}`}
        >
          {align === 'left' ? '⫷' : align === 'center' ? '☰' : '⫸'}
        </button>
      ))}
    </div>
  );
}
