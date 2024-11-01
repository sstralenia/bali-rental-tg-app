import { createContext } from 'react';

export const PageContext = createContext<{
  state: Record<string, object>;
  setPageState: (page: string, state: object) => void;
}>({
  state: {},
  setPageState: () => {},
});
