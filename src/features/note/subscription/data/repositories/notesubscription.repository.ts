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
          return { error: state.error.message } as ErrorEvent;
        }

        if (state.data !== null) {
          if (state.data.type === ChangeType.CREATED) {
            return { note: state.data.note } as NoteCreatedEvent;
          }

          if (state.data.type === ChangeType.UPDATED) {
            return { note: state.data.note } as NoteUpdatedEvent;
          }

          if (state.data.type === ChangeType.DELETED) {
            return { id: state.data.id } as NoteDeletedEvent;
          }
        }
        // status: NoteStatus =
        //   state.data.status === "pending" ? "pending" : "done";
        // const note: Note = {
        //   id: state.data.id,
        //   title: state.data.title,
        //   note: state.data.note,
        //   createdAt: state.data.createdAt,
        //   updatedAt: state.data.updatedAt,
        //   status: status,
        // };

        return {} as EmptyEvent;
      })
    );
  }
}
