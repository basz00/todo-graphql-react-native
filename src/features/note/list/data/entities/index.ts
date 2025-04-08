export enum TodoStatus {
  Pending = "pending",
  Completed = "completed",
}

export interface Todo {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  note: string;
  status: TodoStatus;
  creatorId: number;
}
