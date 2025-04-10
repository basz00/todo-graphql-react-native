export enum RemoteNoteStatus {
  Pending = "pending",
  Completed = "completed",
}

export interface RemoteNote {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  note: string;
  status: RemoteNoteStatus;
  creatorId: number;
}
