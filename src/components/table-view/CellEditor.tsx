import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import type { Cell } from '../../types';

interface CellEditorProps {
  cell: Cell;
  onUpdate: (content: Partial<Cell['content']>) => void;
  autoFocus?: boolean;
}

export function CellEditor({ cell, onUpdate, autoFocus = false }: CellEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension,
      TextAlign.configure({ types: ['paragraph', 'heading'] }),
      Color,
      TextStyle,
    ],
    content: cell.content.html || '',
    autofocus: autoFocus,
    onUpdate: ({ editor }) => {
      onUpdate({
        html: editor.getHTML(),
        plainText: editor.getText(),
      });
    },
  });

  return (
    <div
      className="cell-editor w-full h-full"
      style={{
        fontFamily: cell.style.fontFamily,
        fontSize: cell.style.fontSize,
        color: cell.style.textColor,
      }}
    >
      <EditorContent editor={editor} />
    </div>
  );
}
