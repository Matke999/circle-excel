import React from 'react';
import { useSelectionStore } from '../../store/selectionStore';
import { useDocumentStore } from '../../store/documentStore';

const FONT_FAMILIES = [
  'Inter, sans-serif',
  'Arial, sans-serif',
  'Georgia, serif',
  'Courier New, monospace',
  'Times New Roman, serif',
  'Verdana, sans-serif',
];

const FONT_SIZES = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48];

export function FontControls() {
  const selection = useSelectionStore((state) => state.selection);
  const updateCellStyle = useDocumentStore((state) => state.updateCellStyle);

  const cell = useDocumentStore((state) => {
    const { ringIndex, cellIndex } = selection;
    if (ringIndex === null || cellIndex === null) return null;
    return state.document.rings[ringIndex]?.cells[cellIndex] ?? null;
  });

  if (!cell) {
    return (
      <div className="flex items-center gap-1">
        <select className="text-xs border rounded px-1 py-0.5 bg-white" disabled>
          <option>Font</option>
        </select>
        <select className="text-xs border rounded px-1 py-0.5 w-14 bg-white" disabled>
          <option>Size</option>
        </select>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <select
        className="text-xs border rounded px-1 py-0.5 bg-white cursor-pointer"
        value={cell.style.fontFamily}
        onChange={(e) => {
          const { ringIndex, cellIndex } = selection;
          if (ringIndex !== null && cellIndex !== null) {
            updateCellStyle(ringIndex, cellIndex, { fontFamily: e.target.value });
          }
        }}
      >
        {FONT_FAMILIES.map((f) => (
          <option key={f} value={f}>
            {f.split(',')[0]}
          </option>
        ))}
      </select>
      <select
        className="text-xs border rounded px-1 py-0.5 w-14 bg-white cursor-pointer"
        value={cell.style.fontSize}
        onChange={(e) => {
          const { ringIndex, cellIndex } = selection;
          if (ringIndex !== null && cellIndex !== null) {
            updateCellStyle(ringIndex, cellIndex, { fontSize: Number(e.target.value) });
          }
        }}
      >
        {FONT_SIZES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
