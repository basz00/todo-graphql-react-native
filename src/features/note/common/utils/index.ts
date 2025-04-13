import { formatIsoDateTime } from "@/core/datetime";
import { Note, NoteStatus, RemoteNote } from "@/note/common/entities";

export const remoteNoteToNote = (remoteNote: RemoteNote): Note => {
  const status: NoteStatus =
    remoteNote.status === "pending" ? NoteStatus.Pending : NoteStatus.Completed;

  const note: Note = {
    id: remoteNote.id,
    title: remoteNote.title,
    note: remoteNote.note,
    createdAt: formatIsoDateTime("" + remoteNote.createdAt, "dd MMM"),
    updatedAt: formatIsoDateTime("" + remoteNote.updatedAt, "dd MMM"),
    status: status,
  };
  return note;
};
