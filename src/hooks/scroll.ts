import { useContext } from 'react';
import { StoreContext } from '../store/context';

export const useScroll = (page: string) => {
  const { scrollPosition, setScrollPosition } = useContext(StoreContext);

  const handleScroll = () => {
    setScrollPosition(page, window.scrollY);
  }

  return { scrollPosition: scrollPosition[page] ?? 0, handleScroll };
}