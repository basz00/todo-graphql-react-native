import { useEffect, useState } from "react";
import { DeleteNoteRepositoryImpl } from "@/note/update/data/repositories";
import { DeleteNoteRepository } from "@/note/update/domain/repositories";
import { skip } from "rxjs";

export const useDeleteNote = () => {
  const repository: DeleteNoteRepository = new DeleteNoteRepositoryImpl();

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

  const execute = (id: number) => {
    repository.execute(id);
  };

  return { execute, state };
};
