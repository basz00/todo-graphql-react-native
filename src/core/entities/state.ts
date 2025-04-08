export interface RemoteState<T> {
  loading: boolean;
  data: T | null;
  error: Error | null;
}
