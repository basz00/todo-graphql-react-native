import { Note, NoteStatus } from "@/features/note/common/entities";
import { NoteSubscriptionDataSource } from "@/note/subscription/data/datasources";
import { NoteSubscriptionRepository } from "@/note/subscription/domain/repositories";
import { map, Observable } from "rxjs";
import {
  EmptyEvent,
  ErrorEvent,
  NoteCreatedEvent,
  NoteDeletedEvent,
  NoteUpdatedEvent,
  SubscriptionEvent,
} from "@/note/subscription/domain/entities";
import { ChangeType } from "@/note/subscription/data/entities";

export class NoteSubscriptionRepositoryImpl
  implements NoteSubscriptionRepository
{
  constructor(
    private remoteDataSource: NoteSubscriptionDataSource = new NoteSubscriptionDataSource()
  ) {}

  subscribeToNoteChange(): Observable<SubscriptionEvent> {
    return this.remoteDataSource.observeNotes().pipe(
      map((state) => {
        // move this to helper class
        if (state.error) {
          return { error: state.error.message, type: "error" } as ErrorEvent;
        }

        if (state.data !== null) {
          if (state.data.type === ChangeType.CREATED) {
            return {
              note: state.data.note,
              type: "created",
            } as NoteCreatedEvent;
          }

          if (state.data.type === ChangeType.UPDATED) {
            return {
              note: state.data.note,
              type: "updated",
            } as NoteUpdatedEvent;
          }

          if (state.data.type === ChangeType.DELETED) {
            return { id: state.data.id, type: "deleted" } as NoteDeletedEvent;
          }
        }

        return {} as EmptyEvent;
      })
    );
  }
}
