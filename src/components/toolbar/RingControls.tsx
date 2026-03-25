import React from 'react';
import { useDocumentStore } from '../../store/documentStore';

export function RingControls() {
  const addRing = useDocumentStore((state) => state.addRing);
  const removeLastRing = useDocumentStore((state) => state.removeLastRing);
  const expandAllRings = useDocumentStore((state) => state.expandAllRings);
  const collapseAllRings = useDocumentStore((state) => state.collapseAllRings);
  const ringCount = useDocumentStore((state) => state.document.rings.length);
  const maxRings = useDocumentStore((state) => state.document.settings.maxRings);

  return (
    <div className="flex items-center gap-1">
      <button
        className="flex items-center gap-0.5 px-2 py-1 text-xs border border-gray-300 rounded hover:bg-green-50 hover:border-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={addRing}
        disabled={ringCount >= maxRings}
        title="Add Ring"
      >
        + Ring
      </button>
      <button
        className="flex items-center gap-0.5 px-2 py-1 text-xs border border-gray-300 rounded hover:bg-red-50 hover:border-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={removeLastRing}
        disabled={ringCount <= 1}
        title="Remove Last Ring"
      >
        - Ring
      </button>
      <button
        className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100"
        onClick={expandAllRings}
        title="Expand All"
      >
        ⊞ All
      </button>
      <button
        className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100"
        onClick={collapseAllRings}
        title="Collapse All"
      >
        ⊟ All
      </button>
    </div>
  );
}
