import { Note } from "@/note/list/domain/entities";
import { useEffect, useState } from "react";
import { NoteListRepositoryImpl } from "@/note/list/data/repositories/notelist.repository";
import { NoteListRepository } from "@/note/list/domain/repositories";

export const useGetNoteList = () => {
  // I'm not using usecase because it will not have a significant use, and repository is enough
  const repository: NoteListRepository = new NoteListRepositoryImpl();

  const [noteList, setNoteList] = useState<Array<Note>>([]);

  useEffect(() => {
    const subscription = repository.observeNoteList().subscribe((state) => {
      setNoteList(state.data || []);
    });
    return () => subscription.unsubscribe();
  }, []);

  return {
    getNote: () => {
      repository.execute();
    },
    noteList,
  };
};
