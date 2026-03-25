import React from 'react';
import type { RingGeometry, CellArcData, Cell } from '../../types';
import { RingCell } from './RingCell';
import { CenterCell } from './CenterCell';

interface RingBandProps {
  geometry: RingGeometry;
  cx: number;
  cy: number;
  onHover: (cell: CellArcData | null, x: number, y: number) => void;
  onCenterHover: (cell: Cell | null, x: number, y: number) => void;
}

export function RingBand({ geometry, cx, cy, onHover, onCenterHover }: RingBandProps) {
  if (geometry.ringIndex === 0) {
    const centerCell = geometry.cells[0]?.cell;
    if (!centerCell) return null;
    return (
      <CenterCell
        cell={centerCell}
        radius={geometry.outerRadius}
        cx={cx}
        cy={cy}
        onHover={onCenterHover}
      />
    );
  }

  return (
    <g>
      {geometry.cells.map((cellArc) => (
        <RingCell
          key={`${cellArc.ringIndex}-${cellArc.cellIndex}`}
          arcData={cellArc}
          cx={cx}
          cy={cy}
          onHover={onHover}
        />
      ))}
    </g>
  );
}
