import { Property } from '../types';

export type Query = {
  location?: string;
  price?: number;
  rooms?: number;
}

export type Pagination = {
  page: number;
  perPage: number;
}

export function fetchProperties({ query, pagination }: { query: Query, pagination: Pagination }): Promise<Property[]> {
  return Promise.resolve([
  ])
}