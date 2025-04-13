export interface Note {
  id: number;
  title: string;
  note: string;
  status: NoteStatus;
  createdAt: string;
  updatedAt: string;
}
export enum NoteStatus {
  Pending = "pending",
  Completed = "completed",
}
