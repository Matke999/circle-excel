import React from 'react';
import type { CellArcData } from '../../types';
import { generateArcPath, getArcBoundingBox } from '../../lib/ringMath';
import { useSelectionStore } from '../../store/selectionStore';

interface RingCellProps {
  arcData: CellArcData;
  cx: number;
  cy: number;
  onHover: (cell: CellArcData | null, x: number, y: number) => void;
}

export function RingCell({ arcData, cx, cy, onHover }: RingCellProps) {
  const { cell, ringIndex, cellIndex } = arcData;
  const isSelected = useSelectionStore((state) =>
    state.isSelected(ringIndex, cellIndex)
  );
  const setSelection = useSelectionStore((state) => state.setSelection);

  const pathD = generateArcPath(arcData);
  const bbox = getArcBoundingBox(arcData);

  const handleClick = () => {
    setSelection(ringIndex, cellIndex);
  };

  const rotation = cell.style.rotation ?? 0;
  const imageScale = cell.style.imageScale ?? 1;

  // Compute available space along the rotated axis for wrapping
  const radians = (Math.abs(rotation) * Math.PI) / 180;
  const effectiveWidth =
    bbox.width * Math.cos(radians) + bbox.height * Math.sin(radians);

  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <path
        d={pathD}
        fill={cell.style.backgroundColor}
        stroke={isSelected ? '#3b82f6' : cell.style.borderColor}
        strokeWidth={isSelected ? 2 : 0.5}
        className={`ring-segment ${isSelected ? 'selected' : ''}`}
        onClick={handleClick}
        onMouseEnter={(e) => onHover(arcData, e.clientX, e.clientY)}
        onMouseLeave={() => onHover(null, 0, 0)}
      />
      {bbox.width > 15 && bbox.height > 8 && (
        <foreignObject
          x={bbox.x}
          y={bbox.y}
          width={bbox.width}
          height={bbox.height}
          className="pointer-events-none overflow-hidden"
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
              fontSize: cell.style.fontSize,
              color: cell.style.textColor,
              textAlign: 'center',
              padding: '2px',
              fontWeight: cell.style.bold ? 'bold' : 'normal',
              fontStyle: cell.style.italic ? 'italic' : 'normal',
              textDecoration: cell.style.underline ? 'underline' : 'none',
              transform: rotation ? `rotate(${rotation}deg)` : undefined,
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: cell.content.html || '' }}
              style={{
                overflow: 'hidden',
                maxWidth: effectiveWidth,
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
              }}
              className={imageScale !== 1 ? 'scaled-images' : ''}
              data-image-scale={imageScale}
            />
          </div>
        </foreignObject>
      )}
    </g>
  );
}
