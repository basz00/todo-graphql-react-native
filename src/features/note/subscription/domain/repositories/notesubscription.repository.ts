import { SubscriptionEvent } from "@/note/subscription/domain/entities";
import { Observable } from "rxjs";

export interface NoteSubscriptionRepository {
  subscribeToNoteChange(): Observable<SubscriptionEvent>;
}
