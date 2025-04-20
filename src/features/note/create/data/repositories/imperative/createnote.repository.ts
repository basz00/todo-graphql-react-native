import { RemoteState } from "@/core/entities";
import { Observable } from "rxjs";
import { CreateNoteRepository } from "@/note/create/domain/repositories";
import { CreateNoteOnRemote } from "@/note/create/data/datasources";
import { CreateNote } from "@/note/create/domain/entities";

export class CreateNoteRepositoryImpl implements CreateNoteRepository {
  constructor(
    private remoteDataSource: CreateNoteOnRemote = new CreateNoteOnRemote()
  ) {}

  execute(createNote: CreateNote) {
    this.remoteDataSource.createNote(createNote);
  }
  observeResult(): Observable<RemoteState<any>> {
    return this.remoteDataSource.observeNotes();
  }
}
