import { RemoteState } from "@/core/entities";
import { remoteNoteToNote } from "@/features/note/common/utils";
import { Note } from "@/note/common/entities";
import { FetchNoteListFromApi } from "@/note/list/data/datasources/notelist.datasource";
import { NoteListRepository } from "@/note/list/domain/repositories";
import { map, Observable } from "rxjs";

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

        const notes = state.data.map((remoteNote) => {
          return remoteNoteToNote(remoteNote);
        });

        return { data: notes, loading: false, error: null };
      })
    );
  }
}
