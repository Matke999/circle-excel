import { create } from 'zustand';

interface UIState {
  activeView: 'split' | 'table' | 'ring';
  toolbarVisible: boolean;
  statusBarVisible: boolean;
  zoomLevel: number;
  setActiveView: (view: 'split' | 'table' | 'ring') => void;
  setToolbarVisible: (visible: boolean) => void;
  setZoomLevel: (zoom: number) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  activeView: 'split',
  toolbarVisible: true,
  statusBarVisible: true,
  zoomLevel: 1,

  setActiveView: (view) => set({ activeView: view }),
  setToolbarVisible: (visible) => set({ toolbarVisible: visible }),
  setZoomLevel: (zoom) => set({ zoomLevel: zoom }),
}));
