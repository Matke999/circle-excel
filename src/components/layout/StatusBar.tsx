import React from 'react';
import { useSelectionStore } from '../../store/selectionStore';
import { useDocumentStore } from '../../store/documentStore';

export function StatusBar() {
  const selection = useSelectionStore((state) => state.selection);
  const document = useDocumentStore((state) => state.document);

  const totalCells = document.rings.reduce((sum, ring) => sum + ring.cellCount, 0);
  const ringCount = document.rings.length;

  return (
    <div className="status-bar flex items-center gap-4 px-3 py-1 bg-gray-100 border-t border-gray-300 text-xs text-gray-600 flex-shrink-0">
      <span>
        {selection.ringIndex !== null && selection.cellIndex !== null
          ? `Selected: Ring ${selection.ringIndex}, Cell ${selection.cellIndex}`
          : 'No selection'}
      </span>
      <span className="text-gray-400">|</span>
      <span>Rings: {ringCount}</span>
      <span className="text-gray-400">|</span>
      <span>Total Cells: {totalCells}</span>
      <span className="text-gray-400">|</span>
      <span>{document.name}</span>
    </div>
  );
}
