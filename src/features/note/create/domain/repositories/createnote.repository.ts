import { RemoteState } from "@/core/entities";
import { CreateNote } from "@/note/create/domain/entities";
import { Observable } from "rxjs";

export interface CreateNoteRepository {
  execute(createNote: CreateNote): void;
  observeResult(): Observable<RemoteState<any>>;
}
