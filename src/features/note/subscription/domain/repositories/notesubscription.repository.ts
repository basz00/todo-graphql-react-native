import { RemoteState } from "@/core/entities";
import { Note } from "@/features/note/common/entities";
import { Observable } from "rxjs";

export interface NoteSubscriptionRepository {
  subscribeToNoteUpdate(): Observable<RemoteState<Note>>;
}
