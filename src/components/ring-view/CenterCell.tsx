import React from 'react';
import type { Cell } from '../../types';
import { useSelectionStore } from '../../store/selectionStore';

interface CenterCellProps {
  cell: Cell;
  radius: number;
  cx: number;
  cy: number;
  onHover: (cell: Cell | null, x: number, y: number) => void;
}

export function CenterCell({ cell, radius, cx, cy, onHover }: CenterCellProps) {
  const isSelected = useSelectionStore((state) => state.isSelected(0, 0));
  const setSelection = useSelectionStore((state) => state.setSelection);

  const handleClick = () => {
    setSelection(0, 0);
  };

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={cell.style.backgroundColor}
        stroke={isSelected ? '#3b82f6' : cell.style.borderColor}
        strokeWidth={isSelected ? 3 : cell.style.borderWidth}
        className="ring-segment cursor-pointer"
        onClick={handleClick}
        onMouseEnter={(e) => onHover(cell, e.clientX, e.clientY)}
        onMouseLeave={() => onHover(null, 0, 0)}
      />
      <foreignObject
        x={cx - radius * 0.7}
        y={cy - radius * 0.7}
        width={radius * 1.4}
        height={radius * 1.4}
        className="pointer-events-none"
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            fontFamily: cell.style.fontFamily,
            fontSize: Math.min(cell.style.fontSize, radius * 0.3),
            color: cell.style.textColor,
            textAlign: 'center',
            padding: '4px',
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: cell.content.html || '' }} />
        </div>
      </foreignObject>
    </g>
  );
}
