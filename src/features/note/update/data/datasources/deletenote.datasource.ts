import { RemoteState } from "@/core/entities";
import { apolloClient, MutationGraphQLOp } from "@/core/graphql";
import { RemoteNote } from "@/features/note/common/entities";
import { gql } from "@apollo/client";
import { Observable } from "rxjs";

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
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
      DELETE_TODO,
      (data) => data.todos
    )
  ) {}

  deleteNote(id: number) {
    this.reactiveMutation.execute({ id });
  }

  observeNotes(): Observable<RemoteState<number>> {
    return this.reactiveMutation.observe();
  }
}
