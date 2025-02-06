import { useContext } from 'react';
import { StoreContext } from '../store';

export default function useRates() {
  const { rates } = useContext(StoreContext);

  return { rates };
}
