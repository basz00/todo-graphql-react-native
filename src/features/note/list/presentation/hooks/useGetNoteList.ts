import { NoteSubscriptionRepositoryImpl } from "@/features/note/subscription/data/repositories";
import { NoteSubscriptionRepository } from "@/features/note/subscription/domain/repositories";
import { Note } from "@/note/common/entities";
import { NoteListRepositoryImpl } from "@/note/list/data/repositories/notelist.repository";
import { NoteListRepository } from "@/note/list/domain/repositories";
import { useEffect, useState } from "react";

const noteListRepository: NoteListRepository = new NoteListRepositoryImpl();
const noteUpdateSubscription: NoteSubscriptionRepository =
  new NoteSubscriptionRepositoryImpl();

export const useGetNoteList = () => {
  const [noteList, setNoteList] = useState<Array<Note>>([]);

  useEffect(() => {
    const subscription = noteListRepository
      .observeNoteList()
      .subscribe((state) => {
        setNoteList(state.data || []);
      });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = noteUpdateSubscription
      .subscribeToNoteChange()
      .subscribe((state) => {
        if (state.type === "created") {
          handleCreate(state.note);
        }

        if (state.type === "updated") {
          handleUpdate(state.note);
        }

        if (state.type === "deleted") {
          handleDelete(state.id);
        }
      });
    return () => subscription.unsubscribe();
  }, []);

  const handleCreate = (note: Note) => {
    setNoteList((prevNotes) => [note, ...prevNotes]);
  };

  const handleUpdate = (note: Note) => {
    setNoteList((prevNotes) => {
      const index = prevNotes.findIndex((n) => n.id === note.id);
      prevNotes[index] = note;
      return [...prevNotes];
    });
  };

  const handleDelete = (id: number) => {
    setNoteList((prevNotes) => {
      const index = prevNotes.findIndex((n) => n.id === id);

      prevNotes.splice(index, 1);
      return [...prevNotes];
    });
  };

  return {
    getNote: () => {
      noteListRepository.execute();
    },
    noteList,
  };
};
