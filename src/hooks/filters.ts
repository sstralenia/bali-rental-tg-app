import { useContext } from 'react';
import { StoreContext } from '../store';

export default function useFilters() {
  const { filters, setFilters } = useContext(StoreContext);

  return { filters, setFilters };
}
