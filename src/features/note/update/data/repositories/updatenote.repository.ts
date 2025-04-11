import { UpdateNoteRepository } from "@/note/update/domain/repositories";
import { UpdateNoteOnRemote } from "@/note/update/data/datasources";
import { Observable } from "rxjs";
import { RemoteState } from "@/core/entities";
import { UpdateNote } from "@/note/update/domain/entities";

export class UpdateNoteRepositoryImpl implements UpdateNoteRepository {
  constructor(
    private remoteDataSource: UpdateNoteOnRemote = new UpdateNoteOnRemote()
  ) {}

  execute(note: UpdateNote): void {
    this.remoteDataSource.updateNote(note);
  }
  observeResult(): Observable<RemoteState<any>> {
    return this.remoteDataSource.observeNotes();
  }
}
