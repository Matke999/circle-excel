import React from 'react';
import { useDocument } from '../../hooks/useDocument';
import { RingRow } from './RingRow';

export function TableView() {
  const { rings } = useDocument();

  return (
    <div className="table-view h-full overflow-y-auto bg-white">
      <div className="sticky top-0 bg-gray-100 border-b border-gray-300 px-3 py-2 z-10">
        <h2 className="text-sm font-bold text-gray-700">Table View</h2>
        <p className="text-xs text-gray-500">Double-click a cell to edit</p>
      </div>
      <div>
        {rings.map((ring) => (
          <RingRow key={ring.index} ring={ring} />
        ))}
      </div>
    </div>
  );
}
