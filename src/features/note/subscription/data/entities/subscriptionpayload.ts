import { RemoteNote } from "@/features/note/common/entities";

export interface SubscriptionPayload {
  type: ChangeType;
  id: number;
  note?: RemoteNote;
}

export enum ChangeType {
  CREATED = "CREATED",
  UPDATED = "UPDATED",
  DELETED = "DELETED",
}
