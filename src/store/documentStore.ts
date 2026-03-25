import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Cell, Ring, RingDocument, DocumentSettings } from '../types';
import { saveDocument, loadDocument } from '../lib/db';

function createEmptyCell(ringIndex: number, cellIndex: number): Cell {
  const totalInRing = Math.pow(2, ringIndex);
  const halfCount = totalInRing / 2;
  let side: Cell['side'] = 'center';
  if (ringIndex === 0) {
    side = 'center';
  } else if (cellIndex < halfCount) {
    side = 'left';
  } else {
    side = 'right';
  }

  return {
    id: crypto.randomUUID(),
    ringIndex,
    cellIndex,
    side,
    content: {
      html: '',
      plainText: '',
      images: [],
    },
    style: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      fontFamily: 'Inter, sans-serif',
      fontSize: 14,
      textAlign: 'center',
      verticalAlign: 'middle',
      borderColor: '#e5e7eb',
      borderWidth: 1,
    },
  };
}

function createEmptyDocument(): RingDocument {
  return {
    id: crypto.randomUUID(),
    name: 'Untitled',
    createdAt: new Date(),
    updatedAt: new Date(),
    rings: [
      {
        index: 0,
        cellCount: 1,
        cells: [createEmptyCell(0, 0)],
        minHeight: 60,
        expanded: true,
      },
    ],
    settings: {
      maxRings: 10,
      centerRadius: 80,
      ringGap: 2,
      defaultBgColor: '#ffffff',
      defaultTextColor: '#000000',
    },
  };
}

interface DocumentState {
  document: RingDocument;
  addRing: () => void;
  removeLastRing: () => void;
  toggleRingExpanded: (ringIndex: number) => void;
  expandAllRings: () => void;
  collapseAllRings: () => void;
  updateCellContent: (
    ringIndex: number,
    cellIndex: number,
    content: Partial<Cell['content']>
  ) => void;
  updateCellStyle: (
    ringIndex: number,
    cellIndex: number,
    style: Partial<Cell['style']>
  ) => void;
  updateDocumentName: (name: string) => void;
  updateSettings: (settings: Partial<DocumentSettings>) => void;
  saveToLocal: () => Promise<void>;
  loadFromLocal: (id: string) => Promise<void>;
}

export const useDocumentStore = create<DocumentState>()(
  immer((set, get) => ({
    document: createEmptyDocument(),

    addRing: () =>
      set((state) => {
        const newIndex = state.document.rings.length;
        if (newIndex >= state.document.settings.maxRings) return;
        const cellCount = Math.pow(2, newIndex);
        const newRing: Ring = {
          index: newIndex,
          cellCount,
          cells: Array.from({ length: cellCount }, (_, i) =>
            createEmptyCell(newIndex, i)
          ),
          minHeight: 60,
          expanded: true,
        };
        state.document.rings.push(newRing);
        state.document.updatedAt = new Date();
      }),

    removeLastRing: () =>
      set((state) => {
        if (state.document.rings.length > 1) {
          state.document.rings.pop();
          state.document.updatedAt = new Date();
        }
      }),

    toggleRingExpanded: (ringIndex) =>
      set((state) => {
        const ring = state.document.rings[ringIndex];
        if (ring) {
          ring.expanded = !ring.expanded;
        }
      }),

    expandAllRings: () =>
      set((state) => {
        state.document.rings.forEach((ring) => {
          ring.expanded = true;
        });
      }),

    collapseAllRings: () =>
      set((state) => {
        state.document.rings.forEach((ring) => {
          ring.expanded = false;
        });
      }),

    updateCellContent: (ringIndex, cellIndex, content) =>
      set((state) => {
        const cell = state.document.rings[ringIndex]?.cells[cellIndex];
        if (cell) {
          Object.assign(cell.content, content);
          state.document.updatedAt = new Date();
        }
      }),

    updateCellStyle: (ringIndex, cellIndex, style) =>
      set((state) => {
        const cell = state.document.rings[ringIndex]?.cells[cellIndex];
        if (cell) {
          Object.assign(cell.style, style);
          state.document.updatedAt = new Date();
        }
      }),

    updateDocumentName: (name) =>
      set((state) => {
        state.document.name = name;
        state.document.updatedAt = new Date();
      }),

    updateSettings: (settings) =>
      set((state) => {
        Object.assign(state.document.settings, settings);
        state.document.updatedAt = new Date();
      }),

    saveToLocal: async () => {
      const doc = get().document;
      await saveDocument(doc);
    },

    loadFromLocal: async (id) => {
      const doc = await loadDocument(id);
      if (doc) {
        set((state) => {
          state.document = doc;
        });
      }
    },
  }))
);
