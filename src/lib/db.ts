import Dexie, { type Table } from 'dexie';
import type { RingDocument } from '../types';

export class RingSheetDatabase extends Dexie {
  documents!: Table<RingDocument & { id: string }, string>;

  constructor() {
    super('RingSheetDB');
    this.version(1).stores({
      documents: 'id, name, updatedAt',
    });
  }
}

export const db = new RingSheetDatabase();

export async function saveDocument(doc: RingDocument): Promise<void> {
  await db.documents.put({ ...doc });
}

export async function loadDocument(id: string): Promise<RingDocument | undefined> {
  return db.documents.get(id);
}

export async function listDocuments(): Promise<RingDocument[]> {
  return db.documents.orderBy('updatedAt').reverse().toArray();
}

export async function deleteDocument(id: string): Promise<void> {
  await db.documents.delete(id);
}
