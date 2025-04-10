import { Note } from "@/note/common/entities";
import { useEffect, useState } from "react";
import { NoteListRepositoryImpl } from "@/note/list/data/repositories/notelist.repository";
import { NoteListRepository } from "@/note/list/domain/repositories";
import { NoteSubscriptionRepository } from "@/features/note/subscription/domain/repositories";
import { NoteSubscriptionRepositoryImpl } from "@/features/note/subscription/data/repositories";

export const useGetNoteList = () => {
  // I'm not using usecase because it will not have a significant use, and repository is enough
  const noteListRepository: NoteListRepository = new NoteListRepositoryImpl();
  const noteUpdateSubscription: NoteSubscriptionRepository =
    new NoteSubscriptionRepositoryImpl();

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
      .subscribeToNoteUpdate()
      .subscribe((state) => {
        const updatedNote = state.data;
        if (updatedNote) {
          setNoteList((prevNotes) => {
            const index = prevNotes.findIndex((note) => {
              return note.id === updatedNote.id;
            });

            if (index !== -1) {
              prevNotes[index] = updatedNote;
              return [...prevNotes];
            }

            return [...prevNotes, updatedNote];
          });
        }
      });
    return () => subscription.unsubscribe();
  }, []);

  return {
    getNote: () => {
      noteListRepository.execute();
    },
    noteList,
  };
};
