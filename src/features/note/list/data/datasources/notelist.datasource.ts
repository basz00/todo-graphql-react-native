import { apolloClient, QueryGraphQLOp } from "@/core/graphql";
import { gql } from "@apollo/client";
import { Observable } from "rxjs";
import { RemoteNote } from "@/note/common/entities";
import { RemoteState } from "@/core/entities";

const GET_NOTES = gql`
  query GetNotes {
    notes {
      id
      note
      title
      status
      updatedAt
    }
  }
`;

export class FetchNoteListFromApi {
  constructor(
    private operation = new QueryGraphQLOp<Array<RemoteNote>>(
      apolloClient,
      GET_NOTES,
      (data) => {
        return data.notes;
      }
    )
  ) {}

  fetchNotes() {
    this.operation.execute();
  }

  observeNotes(): Observable<RemoteState<Array<RemoteNote>>> {
    return this.operation.observe();
  }
}
