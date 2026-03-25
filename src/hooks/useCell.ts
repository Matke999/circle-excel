import { useDocumentStore } from '../store/documentStore';
import { useSelectionStore } from '../store/selectionStore';
import type { Cell } from '../types';

export function useCell(ringIndex: number, cellIndex: number) {
  const cell = useDocumentStore(
    (state) => state.document.rings[ringIndex]?.cells[cellIndex]
  );
  const updateCellContent = useDocumentStore((state) => state.updateCellContent);
  const updateCellStyle = useDocumentStore((state) => state.updateCellStyle);
  const isSelected = useSelectionStore((state) =>
    state.isSelected(ringIndex, cellIndex)
  );
  const setSelection = useSelectionStore((state) => state.setSelection);

  const updateContent = (content: Partial<Cell['content']>) => {
    updateCellContent(ringIndex, cellIndex, content);
  };

  const updateStyle = (style: Partial<Cell['style']>) => {
    updateCellStyle(ringIndex, cellIndex, style);
  };

  const select = () => {
    setSelection(ringIndex, cellIndex);
  };

  return { cell, isSelected, updateContent, updateStyle, select };
}
