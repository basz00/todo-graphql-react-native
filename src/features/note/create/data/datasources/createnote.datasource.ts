import { RemoteState } from "@/core/entities";
import { apolloClient, MutationGraphQLOp } from "@/core/graphql";
import { RemoteNote } from "@/features/note/common/entities";
import { CreateNote } from "@/note/create/data/entities";
import { gql } from "@apollo/client";
import { Observable } from "rxjs";

const CREATE_TODO = gql`
  mutation CreateTodo($title: String, $note: String!, $creatorId: ID) {
    createTodo(title: $title, note: $note, creatorId: $creatorId) {
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

export class CreateNoteOnRemote {
  constructor(
    private reactiveMutation = new MutationGraphQLOp<RemoteNote>(
      apolloClient,
      CREATE_TODO,
      (data) => data.todos
    )
  ) {}

  createNote(createNote: CreateNote) {
    this.reactiveMutation.execute(createNote);
  }

  observeNotes(): Observable<RemoteState<RemoteNote>> {
    return this.reactiveMutation.observe();
  }
}
