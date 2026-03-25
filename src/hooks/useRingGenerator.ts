import { useMemo } from 'react';
import { useDocumentStore } from '../store/documentStore';
import { computeRingGeometry, getTotalRadius } from '../lib/ringMath';

export function useRingGenerator() {
  const rings = useDocumentStore((state) => state.document.rings);
  const settings = useDocumentStore((state) => state.document.settings);

  const geometries = useMemo(
    () => computeRingGeometry(rings, settings.centerRadius, settings.ringGap),
    [rings, settings.centerRadius, settings.ringGap]
  );

  const totalRadius = useMemo(
    () => getTotalRadius(rings, settings.centerRadius, settings.ringGap),
    [rings, settings.centerRadius, settings.ringGap]
  );

  return { geometries, totalRadius };
}
