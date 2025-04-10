import { RemoteState } from "@/core/entities";
import { OperationVariables } from "@apollo/client";
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

export abstract class GraphQLOp<T> {
  private trigger$ = new Subject<OperationVariables | undefined>();
  private result$ = new BehaviorSubject<RemoteState<T>>({
    loading: false,
    data: null,
    error: null,
  });

  constructor(private dataMapper: (rawData: any) => T) {
    this.trigger$
      .pipe(
        tap(() => {
          this.result$.next(
            cloneDeep({ loading: true, data: null, error: null })
          );
        }),
        switchMap((variables) =>
          from(this.operationModule(variables)).pipe(
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

  abstract operationModule(variables?: OperationVariables): Observable<any>;

  execute(variables?: OperationVariables) {
    this.trigger$.next(variables);
  }

  observe(): Observable<RemoteState<T>> {
    return this.result$.asObservable();
  }
}
