export interface IQueryPayload {
  location?: string;
  category?: string;
  minPrice: number;
  maxPrice: number;
  amenities: string[];
  limit: number;
  page: number;
  sortBy?: string;
  sortOrder: string;
  search?: string;
}
