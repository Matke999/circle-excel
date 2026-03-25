import React, { useRef } from 'react';
import { useSelectionStore } from '../../store/selectionStore';
import { useDocumentStore } from '../../store/documentStore';
import type { ImageAttachment } from '../../types';

export function ImageInsert() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selection = useSelectionStore((state) => state.selection);
  const updateCellContent = useDocumentStore((state) => state.updateCellContent);
  const cell = useDocumentStore((state) => {
    const { ringIndex, cellIndex } = selection;
    if (ringIndex === null || cellIndex === null) return null;
    return state.document.rings[ringIndex]?.cells[cellIndex] ?? null;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !cell) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const attachment: ImageAttachment = {
          id: crypto.randomUUID(),
          dataUrl,
          width: img.naturalWidth,
          height: img.naturalHeight,
          alt: file.name,
        };
        const { ringIndex, cellIndex } = selection;
        if (ringIndex !== null && cellIndex !== null) {
          const newImages = [...(cell.content.images ?? []), attachment];
          const imgHtml = `<img src="${dataUrl}" alt="${file.name}" style="max-width:100%;max-height:60px;" />`;
          updateCellContent(ringIndex, cellIndex, {
            images: newImages,
            html: (cell.content.html ?? '') + imgHtml,
          });
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div>
      <button
        className="flex items-center gap-1 px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => fileInputRef.current?.click()}
        disabled={!cell}
        title="Insert Image"
      >
        📷 Img
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
