export interface Note {
  id: number;
  title: string;
  note: string;
  status: NoteStatus;
  createdAt: Date;
  updatedAt: Date;
}
export enum NoteStatus {
  Pending = "pending",
  Completed = "completed",
}
