import React, { useState, useCallback, useRef } from 'react';
import type { Cell } from '../../types';
import { CellEditor } from './CellEditor';
import { useDocumentStore } from '../../store/documentStore';
import { useSelectionStore } from '../../store/selectionStore';

interface CellCardProps {
  cell: Cell;
  compact?: boolean;
}

export function CellCard({ cell, compact = false }: CellCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const updateCellContent = useDocumentStore((state) => state.updateCellContent);
  const isSelected = useSelectionStore((state) =>
    state.isSelected(cell.ringIndex, cell.cellIndex)
  );
  const setSelection = useSelectionStore((state) => state.setSelection);

  const handleClick = useCallback(() => {
    setSelection(cell.ringIndex, cell.cellIndex);
  }, [cell.ringIndex, cell.cellIndex, setSelection]);

  const handleDoubleClick = useCallback(() => {
    setSelection(cell.ringIndex, cell.cellIndex);
    setIsEditing(true);
  }, [cell.ringIndex, cell.cellIndex, setSelection]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleUpdate = useCallback(
    (content: Partial<Cell['content']>) => {
      updateCellContent(cell.ringIndex, cell.cellIndex, content);
    },
    [cell.ringIndex, cell.cellIndex, updateCellContent]
  );

  const minWidth = compact ? 80 : 120;
  const minHeight = compact ? 50 : 80;
  const rotation = cell.style.rotation ?? 0;

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      className={`cell-card relative cursor-pointer rounded transition-all duration-150 ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      style={{
        minWidth,
        minHeight,
        backgroundColor: cell.style.backgroundColor,
        color: cell.style.textColor,
        fontFamily: cell.style.fontFamily,
        fontSize: cell.style.fontSize,
        textAlign: cell.style.textAlign,
        border: `${cell.style.borderWidth}px solid ${cell.style.borderColor}`,
        padding: '4px',
        display: 'flex',
        alignItems:
          cell.style.verticalAlign === 'top'
            ? 'flex-start'
            : cell.style.verticalAlign === 'bottom'
            ? 'flex-end'
            : 'center',
        justifyContent:
          cell.style.textAlign === 'left'
            ? 'flex-start'
            : cell.style.textAlign === 'right'
            ? 'flex-end'
            : 'center',
        fontWeight: cell.style.bold ? 'bold' : 'normal',
        fontStyle: cell.style.italic ? 'italic' : 'normal',
        textDecoration: cell.style.underline ? 'underline' : 'none',
      }}
    >
      {isEditing ? (
        <CellEditor cell={cell} onUpdate={handleUpdate} autoFocus />
      ) : (
        <div
          ref={contentRef}
          className="w-full"
          style={{
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            transform: rotation ? `rotate(${rotation}deg)` : undefined,
          }}
        >
          {cell.content.html ? (
            <div
              dangerouslySetInnerHTML={{ __html: cell.content.html }}
              className="text-sm"
            />
          ) : (
            <span className="text-gray-400 text-xs">Double-click to edit</span>
          )}
        </div>
      )}
    </div>
  );
}
