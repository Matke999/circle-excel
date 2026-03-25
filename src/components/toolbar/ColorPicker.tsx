import React, { useRef } from 'react';
import { useSelectionStore } from '../../store/selectionStore';
import { useDocumentStore } from '../../store/documentStore';

export function ColorPicker() {
  const bgColorRef = useRef<HTMLInputElement>(null);
  const textColorRef = useRef<HTMLInputElement>(null);

  const selection = useSelectionStore((state) => state.selection);
  const cell = useDocumentStore((state) => {
    const { ringIndex, cellIndex } = selection;
    if (ringIndex === null || cellIndex === null) return null;
    return state.document.rings[ringIndex]?.cells[cellIndex] ?? null;
  });
  const updateCellStyle = useDocumentStore((state) => state.updateCellStyle);

  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { ringIndex, cellIndex } = selection;
    if (ringIndex !== null && cellIndex !== null) {
      updateCellStyle(ringIndex, cellIndex, { backgroundColor: e.target.value });
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { ringIndex, cellIndex } = selection;
    if (ringIndex !== null && cellIndex !== null) {
      updateCellStyle(ringIndex, cellIndex, { textColor: e.target.value });
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5" title="Background Color">
        <span className="text-xs text-gray-500">Bg</span>
        <div
          className="w-6 h-6 rounded border border-gray-400 cursor-pointer overflow-hidden"
          style={{ backgroundColor: cell?.style.backgroundColor ?? '#ffffff' }}
          onClick={() => bgColorRef.current?.click()}
        >
          <input
            ref={bgColorRef}
            type="color"
            value={cell?.style.backgroundColor ?? '#ffffff'}
            onChange={handleBgChange}
            disabled={!cell}
            className="opacity-0 w-full h-full cursor-pointer"
          />
        </div>
      </div>
      <div className="flex items-center gap-0.5" title="Text Color">
        <span className="text-xs text-gray-500">Txt</span>
        <div
          className="w-6 h-6 rounded border border-gray-400 cursor-pointer overflow-hidden"
          style={{ backgroundColor: cell?.style.textColor ?? '#000000' }}
          onClick={() => textColorRef.current?.click()}
        >
          <input
            ref={textColorRef}
            type="color"
            value={cell?.style.textColor ?? '#000000'}
            onChange={handleTextChange}
            disabled={!cell}
            className="opacity-0 w-full h-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
