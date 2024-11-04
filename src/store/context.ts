import { createContext } from 'react';
import { Property } from '../types';

export type StoreContextType = {
  shortlistedProperties: Property[];
  toggleShortlistedProperty: (property: Property) => void;
};

export const StoreContext = createContext<StoreContextType>({
  shortlistedProperties: [],
  toggleShortlistedProperty: () => {},
});
