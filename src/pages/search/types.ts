export type Room = 'none' | '1' | '2' | '3' | '4+';
export type FilterValues = {
  location: string | null;
  priceFrom: string | null;
  priceTo: string | null;
  isLookForNeighboor: boolean;
  room: Room | null;
}
