export interface LoggerResolver<T> {
  resolve(): T | undefined;
}
