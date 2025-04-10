import { RemoteState } from "@/core/entities";
import { apolloClient } from "@/core/graphql";
import { SubscriptionGraphQLOp } from "@/core/graphql/subscription";
import { RemoteNote } from "@/features/note/common/entities";
import { gql } from "@apollo/client";
import { Observable, tap } from "rxjs";

const SUBSCRIPTION_UPDATED_TODOS = gql`
  subscription TodoUpdated {
    todoUpdated {
      id
      title
      note
      status
      updatedAt
    }
  }
`;

export class NoteSubscriptionDataSource {
  constructor(
    private operation = new SubscriptionGraphQLOp<RemoteNote>(
      apolloClient,
      SUBSCRIPTION_UPDATED_TODOS,
      (data) => data.todoUpdated
    )
  ) {
    operation.execute();
  }

  observeNotes(): Observable<RemoteState<RemoteNote>> {
    return this.operation.observe();
  }
}
