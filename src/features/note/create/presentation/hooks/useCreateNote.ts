import { useEffect, useState } from "react";
import { useCreateNoteRepository } from "@/note/create/data/repositories";

export const useCreateNote = () => {
  const { execute, state: remoteNoteState } = useCreateNoteRepository();
  const [state, setState] = useState({ loading: false, success: false });

  useEffect(() => {
    setState({
      loading: remoteNoteState.loading,
      success:
        remoteNoteState.error === null &&
        remoteNoteState.loading === false &&
        remoteNoteState.data !== null,
    });
  }, [remoteNoteState]);

  return { execute, state };
};
