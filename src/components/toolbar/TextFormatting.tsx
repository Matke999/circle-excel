import React from 'react';

interface TextFormattingProps {
  onBold?: () => void;
  onItalic?: () => void;
  onUnderline?: () => void;
}

export function TextFormatting({ onBold, onItalic, onUnderline }: TextFormattingProps) {
  return (
    <div className="flex items-center gap-0.5">
      <button
        className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 text-sm font-bold hover:bg-gray-100 active:bg-gray-200"
        onClick={onBold}
        title="Bold"
      >
        B
      </button>
      <button
        className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 text-sm italic hover:bg-gray-100 active:bg-gray-200"
        onClick={onItalic}
        title="Italic"
      >
        I
      </button>
      <button
        className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 text-sm underline hover:bg-gray-100 active:bg-gray-200"
        onClick={onUnderline}
        title="Underline"
      >
        U
      </button>
    </div>
  );
}
