import { RemoteState } from "@/core/entities";
import { apolloClient, MutationGraphQLOp } from "@/core/graphql";
import { Todo } from "@/features/note/list/data/entities";
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
    private reactiveMutation = new MutationGraphQLOp<Todo>(
      apolloClient,
      CREATE_TODO,
      (data) => data.todos
    )
  ) {}

  createNote(createNote: CreateNote) {
    this.reactiveMutation.execute(createNote);
  }

  observeNotes(): Observable<RemoteState<Todo>> {
    return this.reactiveMutation.observe();
  }
}
