import { createContext, FC, useState } from 'react';

type Props = {
  children: React.ReactNode;
}

type PageContext = {
  state: Record<string, object>;
  setPageState: (page: string, payload: object) => void;
}

export const PageContext = createContext<PageContext>({
  state: {},
  setPageState: () => {},
});

const PageStateProvider: FC<Props> = (props) => {
  const [state, setState] = useState<Record<string, object>>({});
  const setPageState = (page: string, payload: object) => {
    setState(current => ({
      ...current,
      [page]: { ...current[page], ...payload },
    }))
  }

  return (
    <PageContext.Provider value={{ state, setPageState }}>
      {props.children}
    </PageContext.Provider>
  )
}

export default PageStateProvider;