import { RemoteState } from "@/core/entities";
import { apolloClient, MutationGraphQLOp } from "@/core/graphql";
import { RemoteNote } from "@/features/note/common/entities";
import { gql } from "@apollo/client";
import { Observable } from "rxjs";
import { UpdateRemoteNote } from "@/note/update/data/entities";

const UPDATE_TODO = gql`
  mutation UpdateTodo(
    $id: ID!
    $title: String
    $note: String
    $status: String
  ) {
    updateTodo(id: $id, title: $title, note: $note, status: $status) {
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

export class UpdateNoteOnRemote {
  constructor(
    private reactiveMutation = new MutationGraphQLOp<RemoteNote>(
      apolloClient,
      UPDATE_TODO,
      (data) => data.todos
    )
  ) {}

  updateNote(note: UpdateRemoteNote) {
    this.reactiveMutation.execute(note);
  }

  observeNotes(): Observable<RemoteState<RemoteNote>> {
    return this.reactiveMutation.observe();
  }
}
