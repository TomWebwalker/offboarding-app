export interface UiColumn<T> {
  key: keyof T;
  header: string;
  cell?: (row: T) => string;
}
