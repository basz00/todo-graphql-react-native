import { RemoteState } from "@/core/entities/state";
import { RemoteNote } from "@/features/note/common/entities";
import { CreateNote } from "@/note/create/domain/entities";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { CREATE_NOTE } from "../query";

export const useCreateNoteDataSource = () => {
  const [createNote, { loading, error, data }] = useMutation<
    RemoteNote,
    CreateNote
  >(CREATE_NOTE);
  const [state, setState] = useState<RemoteState<RemoteNote>>({
    loading: false,
    data: null,
    error: null,
  });

  useEffect(() => {
    setState({
      loading,
      error: error ? new Error(error.message) : null,
      data: data ? data : null,
    });
  }, [loading, error, data]);

  const execute = (note: CreateNote) => {
    return createNote({ variables: note });
  };

  return {
    execute,
    state,
  };
};
