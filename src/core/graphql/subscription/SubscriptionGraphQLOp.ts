import { ApolloClient, DocumentNode, OperationVariables } from "@apollo/client";
import { Observable, from } from "rxjs";
import { GraphQLOp } from "../GraphQLOp";

export class SubscriptionGraphQLOp<T> extends GraphQLOp<T> {
  constructor(
    private client: ApolloClient<any>,
    private mutation: DocumentNode,
    dataMapper: (rawData: any) => T
  ) {
    super(dataMapper);
  }

  operationModule(variables?: OperationVariables): Observable<any> {
    return from(
      this.client.subscribe({
        query: this.mutation,
        variables,
      })
    );
  }
}
