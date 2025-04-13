import { Note } from "@/features/note/common/entities";

export interface NoteCreatedEvent {
  type: "created";
  note: Note;
}

export interface NoteUpdatedEvent {
  type: "updated";
  note: Note;
}

export interface NoteDeletedEvent {
  type: "deleted";
  id: number;
}

export interface EmptyEvent {
  type: "empty";
}

export interface ErrorEvent {
  type: "error";
  error: string;
}

export type SubscriptionEvent =
  | NoteCreatedEvent
  | NoteUpdatedEvent
  | NoteDeletedEvent
  | EmptyEvent
  | ErrorEvent;
