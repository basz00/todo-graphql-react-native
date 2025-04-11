import { Note } from "@/features/note/common/entities";
import { UpdateNoteRepositoryImpl } from "@/note/update/data/repositories";
import { UpdateNoteRepository } from "@/note/update/domain/repositories";
import { useEffect, useState } from "react";
import { skip } from "rxjs";

export const useUpdatenote = () => {
  const repository: UpdateNoteRepository = new UpdateNoteRepositoryImpl();
  const [state, setState] = useState({ loading: false, success: false });

  useEffect(() => {
    const subscription = repository
      .observeResult()
      .pipe(skip(1))
      .subscribe((repoState) => {
        setState({
          loading: repoState.loading,
          success: repoState.error === null,
        });
      });
    return () => subscription.unsubscribe();
  }, []);

  const execute = (note: Note) => {
    repository.execute({
      id: note.id,
      title: note.title,
      note: note.note,
      status: note.status,
    });
  };

  return { execute, state };
};
