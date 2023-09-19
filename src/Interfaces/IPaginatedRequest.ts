export interface IPaginatedRequest<T> {
  page?: number;
  limit?: number;
  filters?: Partial<T>; // where
  include?: { [key: string]: boolean }; // include
  search?: string;
}
