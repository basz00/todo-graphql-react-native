export interface Note {
  id: number;
  title: string;
  note: string;
  status: NoteStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type NoteStatus = "pending" | "done";
