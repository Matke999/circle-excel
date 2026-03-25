import React, { useState, useRef, useCallback } from 'react';
import { useRingGenerator } from '../../hooks/useRingGenerator';
import { RingBand } from './RingBand';
import { RingTooltip } from './RingTooltip';
import type { CellArcData, Cell } from '../../types';

export function RingView() {
  const { geometries, totalRadius } = useRingGenerator();
  const [tooltip, setTooltip] = useState<{
    cell: Cell | null;
    x: number;
    y: number;
  }>({ cell: null, x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const padding = 30;
  const size = (totalRadius + padding) * 2;
  const cx = size / 2;
  const cy = size / 2;

  const handleCellHover = useCallback((arcData: CellArcData | null, x: number, y: number) => {
    setTooltip({ cell: arcData?.cell ?? null, x, y });
  }, []);

  const handleCenterHover = useCallback((cell: Cell | null, x: number, y: number) => {
    setTooltip({ cell, x, y });
  }, []);

  return (
    <div className="ring-view h-full flex flex-col bg-gray-50">
      <div className="sticky top-0 bg-gray-100 border-b border-gray-300 px-3 py-2 z-10">
        <h2 className="text-sm font-bold text-gray-700">Ring View</h2>
        <p className="text-xs text-gray-500">Click a segment to select a cell</p>
      </div>
      <div className="flex-1 overflow-auto flex items-center justify-center p-4" id="ring-view-container">
        <svg
          ref={svgRef}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="max-w-full max-h-full"
        >
          <rect width={size} height={size} fill="white" />
          {geometries.map((geo) => (
            <RingBand
              key={geo.ringIndex}
              geometry={geo}
              cx={cx}
              cy={cy}
              onHover={handleCellHover}
              onCenterHover={handleCenterHover}
            />
          ))}
        </svg>
      </div>
      {tooltip.cell && (
        <RingTooltip
          cell={tooltip.cell}
          x={tooltip.x}
          y={tooltip.y}
          visible={!!tooltip.cell}
        />
      )}
    </div>
  );
}
