import { arc as d3arc } from 'd3-shape';
import type { ArcData, Ring, RingGeometry } from '../types';

const arcGenerator = d3arc()
  .innerRadius((d: ArcData) => d.innerRadius)
  .outerRadius((d: ArcData) => d.outerRadius)
  .startAngle((d: ArcData) => d.startAngle)
  .endAngle((d: ArcData) => d.endAngle)
  .padAngle(0.02)
  .cornerRadius(3);

export function generateArcPath(data: ArcData): string {
  return arcGenerator(data as Parameters<typeof arcGenerator>[0]) ?? '';
}

export function getArcCentroid(data: ArcData): [number, number] {
  const midAngle = (data.startAngle + data.endAngle) / 2;
  const midRadius = (data.innerRadius + data.outerRadius) / 2;
  return [
    midRadius * Math.sin(midAngle),
    -midRadius * Math.cos(midAngle),
  ];
}

export function getArcBoundingBox(data: ArcData): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  const [cx, cy] = getArcCentroid(data);
  const angleSpan = data.endAngle - data.startAngle;
  const midRadius = (data.innerRadius + data.outerRadius) / 2;
  const chordWidth = 2 * midRadius * Math.sin(angleSpan / 2);
  const radialHeight = data.outerRadius - data.innerRadius;

  return {
    x: cx - chordWidth / 2,
    y: cy - radialHeight / 2,
    width: Math.max(chordWidth * 0.85, 10),
    height: Math.max(radialHeight * 0.85, 10),
  };
}

export function estimateContentHeight(cell: { content: { plainText: string; images?: { height: number }[] }; style?: { fontSize?: number; imageScale?: number } }): number {
  const fontSize = cell.style?.fontSize ?? 14;
  const lineHeight = fontSize * 1.4;
  const charsPerLine = Math.max(10, Math.floor(100 / (fontSize * 0.6)));
  const lines = Math.ceil((cell.content.plainText.length || 1) / charsPerLine);
  let height = Math.max(40, lines * lineHeight + 16);

  // Account for images
  const imageScale = cell.style?.imageScale ?? 1;
  if (cell.content.images && cell.content.images.length > 0) {
    const imgHeight = cell.content.images.reduce(
      (sum, img) => sum + Math.min(img.height * imageScale, 120),
      0
    );
    height += imgHeight;
  }

  return height;
}

export function computeRingThickness(ring: Ring): number {
  const BASE = 60;
  if (ring.cells.length === 0) return BASE;
  const maxContentHeight = Math.max(
    ...ring.cells.map((c) => estimateContentHeight(c))
  );
  return Math.max(BASE, maxContentHeight);
}

export function computeRingGeometry(
  rings: Ring[],
  centerRadius: number,
  ringGap: number
): RingGeometry[] {
  const geometries: RingGeometry[] = [];
  let currentOuterRadius = 0;

  for (const ring of rings) {
    if (!ring.expanded) continue;

    let innerRadius: number;
    let outerRadius: number;

    if (ring.index === 0) {
      innerRadius = 0;
      outerRadius = centerRadius;
    } else {
      innerRadius = currentOuterRadius + ringGap;
      const ringThickness = computeRingThickness(ring);
      outerRadius = innerRadius + ringThickness;
    }

    const cellAngle = (2 * Math.PI) / ring.cellCount;

    geometries.push({
      ringIndex: ring.index,
      innerRadius,
      outerRadius,
      cells: ring.cells.map((cell, i) => ({
        cell,
        ringIndex: ring.index,
        cellIndex: i,
        startAngle: i * cellAngle,
        endAngle: (i + 1) * cellAngle,
        innerRadius: ring.index === 0 ? 0 : innerRadius,
        outerRadius,
      })),
    });

    currentOuterRadius = outerRadius;
  }

  return geometries;
}

export function getTotalRadius(
  rings: Ring[],
  centerRadius: number,
  ringGap: number
): number {
  const geos = computeRingGeometry(rings, centerRadius, ringGap);
  if (geos.length === 0) return centerRadius;
  return geos[geos.length - 1].outerRadius;
}
