import { RemoteState } from "@/core/entities";
import { ApolloClient, DocumentNode, FetchPolicy } from "@apollo/client";
import { cloneDeep } from "@apollo/client/utilities";
import {
  BehaviorSubject,
  catchError,
  from,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from "rxjs";

export class ReactiveQuery<T> {
  private trigger$ = new Subject<void>();
  private result$ = new BehaviorSubject<RemoteState<T>>({
    loading: false,
    data: null,
    error: null,
  });

  constructor(
    private client: ApolloClient<any>,
    private query: DocumentNode,
    private dataMapper: (rawData: any) => T,
    private fetchPolicy: FetchPolicy = "network-only"
  ) {
    this.trigger$
      .pipe(
        tap(() => {
          this.result$.next(
            cloneDeep({ loading: true, data: null, error: null })
          );
        }),
        switchMap(() =>
          from(
            this.client.query({
              query: this.query,
              fetchPolicy: this.fetchPolicy,
            })
          ).pipe(
            tap((res) => {
              const mappedData = this.dataMapper(res.data);
              this.result$.next({
                loading: false,
                data: mappedData,
                error: null,
              });
            }),
            catchError((err) => {
              this.result$.next({ loading: false, data: null, error: err });
              return of(); // emit nothing more
            })
          )
        )
      )
      .subscribe();
  }

  fetch() {
    this.trigger$.next();
  }

  observe(): Observable<RemoteState<T>> {
    return this.result$.asObservable();
  }
}
