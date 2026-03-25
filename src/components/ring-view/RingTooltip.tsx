import React from 'react';
import type { Cell } from '../../types';

interface RingTooltipProps {
  cell: Cell;
  x: number;
  y: number;
  visible: boolean;
}

export function RingTooltip({ cell, x, y, visible }: RingTooltipProps) {
  if (!visible) return null;
  return (
    <div
      className="fixed z-50 bg-gray-900 text-white text-xs rounded px-2 py-1 pointer-events-none shadow-lg"
      style={{ left: x + 10, top: y - 30 }}
    >
      <div>Ring {cell.ringIndex}, Cell {cell.cellIndex}</div>
      {cell.content.plainText && (
        <div className="max-w-32 truncate">{cell.content.plainText}</div>
      )}
    </div>
  );
}
