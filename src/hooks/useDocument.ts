import { useDocumentStore } from '../store/documentStore';

export function useDocument() {
  const {
    document,
    addRing,
    removeLastRing,
    toggleRingExpanded,
    expandAllRings,
    collapseAllRings,
    updateDocumentName,
    updateSettings,
    saveToLocal,
    loadFromLocal,
  } = useDocumentStore();

  return {
    document,
    rings: document.rings,
    settings: document.settings,
    addRing,
    removeLastRing,
    toggleRingExpanded,
    expandAllRings,
    collapseAllRings,
    updateDocumentName,
    updateSettings,
    saveToLocal,
    loadFromLocal,
  };
}
