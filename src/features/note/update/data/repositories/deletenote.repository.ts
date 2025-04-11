import { RemoteState } from "@/core/entities";
import { DeleteNoteRepository } from "@/note/update/domain/repositories";
import { Observable } from "rxjs";
import { DeleteNoteOnRemote } from "@/note/update/data/datasources";

export class DeleteNoteRepositoryImpl implements DeleteNoteRepository {
  constructor(
    private remoteDataSource: DeleteNoteOnRemote = new DeleteNoteOnRemote()
  ) {}

  execute(id: number): void {
    this.remoteDataSource.deleteNote(id);
  }
  observeResult(): Observable<RemoteState<any>> {
    return this.remoteDataSource.observeNotes();
  }
}
