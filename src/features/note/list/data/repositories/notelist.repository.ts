import { NoteListRepository } from "@/note/list/domain/repositories";
import { map, Observable, of } from "rxjs";
import { Note, NoteStatus } from "@/note/list/domain/entities";
import { FetchNoteListFromApi } from "@/note/list/data/datasources/notelist.datasource";
import { RemoteState } from "@/core/entities";

export class NoteListRepositoryImpl implements NoteListRepository {
  constructor(
    private remoteDataSource: FetchNoteListFromApi = new FetchNoteListFromApi()
  ) {}

  execute() {
    this.remoteDataSource.fetchNotes();
  }

  observeNoteList(): Observable<RemoteState<Array<Note>>> {
    return this.remoteDataSource.observeNotes().pipe(
      map((state) => {
        if (!state.data) return { data: [], loading: false, error: null };

        if (state.error)
          return { data: [], loading: false, error: state.error };

        const notes = state.data.map((todo) => {
          const status: NoteStatus =
            todo.status === "pending" ? "pending" : "done";
          const note: Note = {
            id: todo.id,
            title: todo.title,
            note: todo.note,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt,
            status: status,
          };
          return note;
        });

        return { data: notes, loading: false, error: null };
      })
    );
  }
}
