import { CreateNote } from "@/note/create/domain/entities";
import { CreateNoteRepository } from "@/note/create/domain/repositories";
import { CreateNoteRepositoryImpl } from "@/note/create/data/repositories";
import { useEffect, useState } from "react";
import { skip } from "rxjs";

export const useCreateNote = () => {
  //TODO: this will be invoked every time a state is updated
  const repository: CreateNoteRepository = new CreateNoteRepositoryImpl();

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

  const execute = (createNote: CreateNote) => {
    repository.execute(createNote);
  };

  return { execute, state };
};
