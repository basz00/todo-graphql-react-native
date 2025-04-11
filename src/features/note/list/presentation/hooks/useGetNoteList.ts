import { Note, NoteStatus } from "@/note/common/entities";
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
      .subscribeToNoteChange()
      .subscribe((state) => {
        if (state.type === "created") {
          setNoteList((prevNotes) => [
            ...prevNotes,
            {
              id: state.note.id,
              createdAt: state.note.createdAt,
              note: state.note.note,
              title: state.note.title,
              status: NoteStatus.Completed,
              updatedAt: state.note.updatedAt,
            },
          ]);
        }

        if (state.type === "updated") {
          setNoteList((prevNotes) => {
            const index = prevNotes.findIndex((note) => {
              return note.id === state.note.id;
            });

            prevNotes[index] = {
              id: state.note.id,
              createdAt: state.note.createdAt,
              note: state.note.note,
              title: state.note.title,
              status: NoteStatus.Completed,
              updatedAt: state.note.updatedAt,
            };
            return [...prevNotes];
          });
        }

        if (state.type === "deleted") {
          setNoteList((prevNotes) => {
            const index = prevNotes.findIndex((note) => {
              return note.id === state.id;
            });

            prevNotes.splice(index, 1);
            return [...prevNotes];
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
