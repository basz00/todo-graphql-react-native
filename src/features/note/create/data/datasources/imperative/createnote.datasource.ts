import { RemoteState } from "@/core/entities";
import { apolloClient, MutationGraphQLOp } from "@/core/graphql";
import { RemoteNote } from "@/features/note/common/entities";
import { CreateNote } from "@/note/create/data/entities";
import { Observable } from "rxjs";
import { CREATE_NOTE } from "../query";

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
