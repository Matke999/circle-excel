export interface ImageAttachment {
  id: string;
  dataUrl: string;
  width: number;
  height: number;
  alt: string;
}

export interface CellContent {
  html: string;
  plainText: string;
  images: ImageAttachment[];
}

export interface CellStyle {
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: number;
  textAlign: 'left' | 'center' | 'right';
  verticalAlign: 'top' | 'middle' | 'bottom';
  borderColor: string;
  borderWidth: number;
}

export interface Cell {
  id: string;
  ringIndex: number;
  cellIndex: number;
  side: 'left' | 'right' | 'center';
  content: CellContent;
  style: CellStyle;
}

export interface Ring {
  index: number;
  cellCount: number;
  cells: Cell[];
  minHeight: number;
  expanded: boolean;
}

export interface DocumentSettings {
  maxRings: number;
  centerRadius: number;
  ringGap: number;
  defaultBgColor: string;
  defaultTextColor: string;
}

export interface RingDocument {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  rings: Ring[];
  settings: DocumentSettings;
}

export interface ArcData {
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
}

export interface CellArcData extends ArcData {
  cell: Cell;
  ringIndex: number;
  cellIndex: number;
}

export interface RingGeometry {
  ringIndex: number;
  innerRadius: number;
  outerRadius: number;
  cells: CellArcData[];
}

export interface SelectionState {
  ringIndex: number | null;
  cellIndex: number | null;
}
