import { useCreateNoteDataSource } from "@/features/note/create/data/datasources";

export const useCreateNoteRepository = () => {
  const { execute, state } = useCreateNoteDataSource();

  return {
    execute,
    state,
  };
};
