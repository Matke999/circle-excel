import React, { useRef, useState, useCallback } from 'react';
import { useSelectionStore } from '../../store/selectionStore';
import { useDocumentStore } from '../../store/documentStore';

const COLOR_PRESETS = [
  '#ffffff', '#000000', '#ef4444', '#f97316', '#eab308',
  '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280',
  '#fecaca', '#fed7aa', '#fef08a', '#bbf7d0', '#bfdbfe',
  '#ddd6fe', '#fbcfe8', '#e5e7eb', '#fef2f2', '#f0fdf4',
];

export function ColorPicker() {
  const bgColorRef = useRef<HTMLInputElement>(null);
  const textColorRef = useRef<HTMLInputElement>(null);
  const [showBgPresets, setShowBgPresets] = useState(false);
  const [showTextPresets, setShowTextPresets] = useState(false);

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

  const applyPreset = (color: string, type: 'bg' | 'text') => {
    const { ringIndex, cellIndex } = selection;
    if (ringIndex !== null && cellIndex !== null) {
      if (type === 'bg') {
        updateCellStyle(ringIndex, cellIndex, { backgroundColor: color });
        setShowBgPresets(false);
      } else {
        updateCellStyle(ringIndex, cellIndex, { textColor: color });
        setShowTextPresets(false);
      }
    }
  };

  const handleToggleBgPresets = useCallback(() => {
    setShowBgPresets((prev) => !prev);
    setShowTextPresets(false);
  }, []);

  const handleToggleTextPresets = useCallback(() => {
    setShowTextPresets((prev) => !prev);
    setShowBgPresets(false);
  }, []);

  return (
    <div className="flex items-center gap-1">
      <div className="relative flex items-center gap-0.5" title="Background Color">
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
        <button
          className="w-5 h-5 flex items-center justify-center rounded border border-gray-300 text-[10px] hover:bg-gray-100"
          onClick={handleToggleBgPresets}
          disabled={!cell}
          title="Background color presets"
        >
          ▾
        </button>
        {showBgPresets && (
          <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-300 rounded shadow-lg p-1.5 grid grid-cols-5 gap-1 w-[130px]">
            {COLOR_PRESETS.map((color) => (
              <button
                key={color}
                className="w-5 h-5 rounded border border-gray-300 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => applyPreset(color, 'bg')}
                title={color}
              />
            ))}
          </div>
        )}
      </div>
      <div className="relative flex items-center gap-0.5" title="Text Color">
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
        <button
          className="w-5 h-5 flex items-center justify-center rounded border border-gray-300 text-[10px] hover:bg-gray-100"
          onClick={handleToggleTextPresets}
          disabled={!cell}
          title="Text color presets"
        >
          ▾
        </button>
        {showTextPresets && (
          <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-gray-300 rounded shadow-lg p-1.5 grid grid-cols-5 gap-1 w-[130px]">
            {COLOR_PRESETS.map((color) => (
              <button
                key={color}
                className="w-5 h-5 rounded border border-gray-300 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => applyPreset(color, 'text')}
                title={color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
