import { RemoteState } from "@/core/entities";
import { apolloClient } from "@/core/graphql";
import { SubscriptionGraphQLOp } from "@/core/graphql/subscription";
import { SubscriptionPayload } from "@/note/subscription/data/entities";
import { gql } from "@apollo/client";
import { Observable } from "rxjs";

const SUBSCRIPTION_UPDATED_TODOS = gql`
  subscription Subscription {
    noteChanged {
      type
      id
      note {
        id
        title
        note
        status
        updatedAt
      }
    }
  }
`;

export class NoteSubscriptionDataSource {
  constructor(
    private operation = new SubscriptionGraphQLOp<SubscriptionPayload>(
      apolloClient,
      SUBSCRIPTION_UPDATED_TODOS,
      (data) => {
        return data.noteChanged;
      }
    )
  ) {
    operation.execute();
  }

  observeNotes(): Observable<RemoteState<SubscriptionPayload>> {
    return this.operation.observe();
  }
}
