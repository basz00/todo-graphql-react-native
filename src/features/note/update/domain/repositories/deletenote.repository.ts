import { RemoteState } from "@/core/entities";
import { Observable } from "rxjs";

export interface DeleteNoteRepository {
  execute(id: number): void;
  observeResult(): Observable<RemoteState<any>>;
}
