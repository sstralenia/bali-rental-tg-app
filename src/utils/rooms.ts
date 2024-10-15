export function pluralizeRooms(rooms: number): string {
  switch (true) {
    case rooms === 1:
      return 'комната';
    case rooms > 1 && rooms < 5:
      return 'комнаты';
    default:
      return 'комнат';
  }
}
