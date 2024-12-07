import { createContext } from 'react';
import { Property } from '../types';
import { FilterValues } from '../pages/search/types';

export type Properties = {
  items: Property[];
  totalItems: number;
  page: number;
};

export type StoreContextType = {
  shortlistedProperties: Property[];
  toggleShortlistedProperty: (property: Property) => void;
  filters: FilterValues;
  setFilters: (filters: FilterValues) => void;
  properties: Properties;
  setProperties: (fn: (prev: Properties) => Properties) => void;
};

export const StoreContext = createContext<StoreContextType>({
  shortlistedProperties: [],
  toggleShortlistedProperty: () => {},
  filters: {} as unknown as FilterValues,
  setFilters: () => {},
  properties: {
    items: [],
    page: 1,
    totalItems: 0,
  },
  setProperties: () => {},

});
