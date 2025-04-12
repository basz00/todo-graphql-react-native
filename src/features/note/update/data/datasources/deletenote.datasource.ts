import { RemoteState } from "@/core/entities";
import { apolloClient, MutationGraphQLOp } from "@/core/graphql";
import { gql } from "@apollo/client";
import { Observable } from "rxjs";

const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id) {
      id
      title
      note
      status
      creatorId
      createdAt
      updatedAt
    }
  }
`;

export class DeleteNoteOnRemote {
  constructor(
    private reactiveMutation = new MutationGraphQLOp<number>(
      apolloClient,
      DELETE_NOTE,
      (data) => data.deleteNote
    )
  ) {}

  deleteNote(id: number) {
    this.reactiveMutation.execute({ id });
  }

  observeNotes(): Observable<RemoteState<number>> {
    return this.reactiveMutation.observe();
  }
}
