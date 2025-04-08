import { apolloClient } from "@/core/graphql";
import { ReactiveQuery } from "@/core/graphql/query/ReactiveQuery";
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
    private reactiveQuery = new ReactiveQuery<Array<Todo>>(
      apolloClient,
      GET_TODOS,
      (data) => data.todos
    )
  ) {}

  fetchNotes() {
    this.reactiveQuery.fetch();
  }

  observeNotes(): Observable<RemoteState<Array<Todo>>> {
    return this.reactiveQuery.observe();
  }
}
