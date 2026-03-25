import { create } from 'zustand';
import type { SelectionState } from '../types';

interface SelectionStoreState {
  selection: SelectionState;
  setSelection: (ringIndex: number, cellIndex: number) => void;
  clearSelection: () => void;
  isSelected: (ringIndex: number, cellIndex: number) => boolean;
}

export const useSelectionStore = create<SelectionStoreState>()((set, get) => ({
  selection: { ringIndex: null, cellIndex: null },

  setSelection: (ringIndex, cellIndex) =>
    set({ selection: { ringIndex, cellIndex } }),

  clearSelection: () =>
    set({ selection: { ringIndex: null, cellIndex: null } }),

  isSelected: (ringIndex, cellIndex) => {
    const { selection } = get();
    return selection.ringIndex === ringIndex && selection.cellIndex === cellIndex;
  },
}));
