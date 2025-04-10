import { GraphQLOp } from "@/core/graphql/GraphQLOp";
import {
  ApolloClient,
  DocumentNode,
  FetchPolicy,
  OperationVariables,
} from "@apollo/client";
import { from, Observable } from "rxjs";

export class QueryGraphQLOp<T> extends GraphQLOp<T> {
  constructor(
    private client: ApolloClient<any>,
    private query: DocumentNode,
    dataMapper: (rawData: any) => T,
    private fetchPolicy: FetchPolicy = "network-only"
  ) {
    super(dataMapper);
  }

  operationModule(variables?: OperationVariables): Observable<any> {
    return from(
      this.client.query({
        query: this.query,
        variables,
        fetchPolicy: this.fetchPolicy,
      })
    );
  }
}
