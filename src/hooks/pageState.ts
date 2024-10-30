import { useContext } from 'react';
import { PageContext } from '../context/page';

type PageState<T> = {
  state: Partial<T>;
  setPageState: (p: Partial<T>) => void;
};

export default function usePageState<T>(page: string): PageState<T> {
  const { state, setPageState } = useContext(PageContext);

  return {
    state: state[page] || {},
    setPageState: (p: object) => setPageState(page, p),
  };
}