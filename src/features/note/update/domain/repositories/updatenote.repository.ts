import { RemoteState } from "@/core/entities";
import { Observable } from "rxjs";
import { UpdateNote } from "@/note/update/domain/entities";

export interface UpdateNoteRepository {
  execute(note: UpdateNote): void;
  observeResult(): Observable<RemoteState<any>>;
}
