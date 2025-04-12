import { RemoteState } from "@/core/entities";
import { apolloClient, MutationGraphQLOp } from "@/core/graphql";
import { RemoteNote } from "@/features/note/common/entities";
import { CreateNote } from "@/note/create/data/entities";
import { gql } from "@apollo/client";
import { Observable } from "rxjs";

const CREATE_NOTE = gql`
  mutation CreateNote($title: String, $note: String!, $creatorId: ID) {
    createNote(title: $title, note: $note, creatorId: $creatorId) {
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
      CREATE_NOTE,
      (data) => data.createNote
    )
  ) {}

  createNote(createNote: CreateNote) {
    this.reactiveMutation.execute(createNote);
  }

  observeNotes(): Observable<RemoteState<RemoteNote>> {
    return this.reactiveMutation.observe();
  }
}
