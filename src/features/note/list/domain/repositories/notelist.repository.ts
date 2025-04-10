import { Observable } from "rxjs";
import { Note } from "@/features/note/common/entities/note";
import { RemoteState } from "@/core/entities";

export interface NoteListRepository {
  execute(): void;
  observeNoteList(): Observable<RemoteState<Array<Note>>>;
}
