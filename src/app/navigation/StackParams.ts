import { Note } from "@/features/note/common/entities";

export type StackParams = {
  NoteList: undefined;
  CreateNote: undefined;
  UpdateNote: { note: Note };
};
