import React from 'react';
import type { Ring } from '../../types';
import { CellCard } from './CellCard';
import { useDocumentStore } from '../../store/documentStore';

interface RingRowProps {
  ring: Ring;
}

export function RingRow({ ring }: RingRowProps) {
  const toggleRingExpanded = useDocumentStore((state) => state.toggleRingExpanded);

  const leftCells = ring.index === 0 ? ring.cells : ring.cells.slice(ring.cellCount / 2);
  const rightCells = ring.index === 0 ? [] : ring.cells.slice(0, ring.cellCount / 2);
  const compact = ring.cellCount >= 8;

  return (
    <div className="ring-row border-b border-gray-200">
      <div
        className="flex items-center gap-2 px-3 py-1 bg-gray-50 cursor-pointer hover:bg-gray-100 select-none"
        onClick={() => toggleRingExpanded(ring.index)}
      >
        <span className="text-xs text-gray-500 font-medium">
          {ring.expanded ? '▼' : '▶'}
        </span>
        <span className="text-sm font-semibold text-gray-700">
          {ring.index === 0 ? 'Ring 0 (center)' : `Ring ${ring.index}`}
        </span>
        <span className="text-xs text-gray-400">
          ({ring.cellCount} {ring.cellCount === 1 ? 'cell' : 'cells'})
        </span>
      </div>

      {ring.expanded && (
        <div className="flex items-start gap-4 px-3 py-2 overflow-x-auto">
          {ring.index === 0 ? (
            <div className="flex gap-2">
              {leftCells.map((cell) => (
                <CellCard key={cell.id} cell={cell} compact={compact} />
              ))}
            </div>
          ) : (
            <>
              <div className="flex gap-1 flex-wrap">
                <span className="text-xs text-gray-400 w-full mb-1">Left</span>
                {leftCells.map((cell) => (
                  <CellCard key={cell.id} cell={cell} compact={compact} />
                ))}
              </div>
              <div className="w-px bg-gray-300 self-stretch" />
              <div className="flex gap-1 flex-wrap">
                <span className="text-xs text-gray-400 w-full mb-1">Right</span>
                {rightCells.map((cell) => (
                  <CellCard key={cell.id} cell={cell} compact={compact} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
