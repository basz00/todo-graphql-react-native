import { NoteSubscriptionRepository } from "@/note/subscription/domain/repositories";
import { NoteSubscriptionDataSource } from "@/note/subscription/data/datasources";
import { map, Observable } from "rxjs";
import { RemoteState } from "@/core/entities";
import { Note, NoteStatus } from "@/features/note/common/entities";

export class NoteSubscriptionRepositoryImpl
  implements NoteSubscriptionRepository
{
  constructor(
    private remoteDataSource: NoteSubscriptionDataSource = new NoteSubscriptionDataSource()
  ) {}

  subscribeToNoteUpdate(): Observable<RemoteState<Note>> {
    return this.remoteDataSource.observeNotes().pipe(
      map((state) => {
        if (!state.data) return { data: null, loading: false, error: null };

        if (state.error)
          return { data: null, loading: false, error: state.error };

        const status: NoteStatus =
          state.data.status === "pending" ? "pending" : "done";
        const note: Note = {
          id: state.data.id,
          title: state.data.title,
          note: state.data.note,
          createdAt: state.data.createdAt,
          updatedAt: state.data.updatedAt,
          status: status,
        };

        return { data: note, loading: false, error: null };
      })
    );
  }
}
