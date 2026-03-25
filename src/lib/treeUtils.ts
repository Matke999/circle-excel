import type { Cell, Ring } from '../types';

export function getParentCell(rings: Ring[], ringIndex: number, cellIndex: number): Cell | null {
  if (ringIndex === 0) return null;
  const parentRing = rings[ringIndex - 1];
  if (!parentRing) return null;
  const parentCellIndex = Math.floor(cellIndex / 2);
  return parentRing.cells[parentCellIndex] ?? null;
}

export function getChildCells(rings: Ring[], ringIndex: number, cellIndex: number): Cell[] {
  const childRing = rings[ringIndex + 1];
  if (!childRing) return [];
  const child1Index = cellIndex * 2;
  const child2Index = cellIndex * 2 + 1;
  const children: Cell[] = [];
  if (childRing.cells[child1Index]) children.push(childRing.cells[child1Index]);
  if (childRing.cells[child2Index]) children.push(childRing.cells[child2Index]);
  return children;
}

export function getSiblingCells(rings: Ring[], ringIndex: number, cellIndex: number): Cell[] {
  const ring = rings[ringIndex];
  if (!ring) return [];
  return ring.cells.filter((_, i) => i !== cellIndex);
}

export function getCellPath(rings: Ring[], ringIndex: number, cellIndex: number): Cell[] {
  const path: Cell[] = [];
  let currentRingIndex = ringIndex;
  let currentCellIndex = cellIndex;

  while (currentRingIndex >= 0) {
    const ring = rings[currentRingIndex];
    if (ring && ring.cells[currentCellIndex]) {
      path.unshift(ring.cells[currentCellIndex]);
    }
    if (currentRingIndex === 0) break;
    currentCellIndex = Math.floor(currentCellIndex / 2);
    currentRingIndex--;
  }

  return path;
}
