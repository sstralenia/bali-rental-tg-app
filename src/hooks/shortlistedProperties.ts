import { useContext } from 'react';
import { StoreContext } from '../store';

export default function useShortlistedProperties() {
  const { shortlistedProperties, toggleShortlistedProperty } = useContext(StoreContext);

  return { properties: shortlistedProperties, toggle: toggleShortlistedProperty };
}
