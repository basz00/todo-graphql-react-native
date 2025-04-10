import { apolloClient, QueryGraphQLOp } from "@/core/graphql";
import { gql } from "@apollo/client";
import { Observable, of } from "rxjs";
import { Todo } from "../entities";
import { RemoteState } from "@/core/entities";

const GET_TODOS = gql`
  query GetTodos {
    todos {
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
    private operation = new QueryGraphQLOp<Array<Todo>>(
      apolloClient,
      GET_TODOS,
      (data) => data.todos
    )
  ) {}

  fetchNotes() {
    this.operation.execute();
  }

  observeNotes(): Observable<RemoteState<Array<Todo>>> {
    return this.operation.observe();
  }
}
