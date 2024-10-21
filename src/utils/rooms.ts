export function formatRooms(rooms: number): string {
  switch (true) {
    case rooms === 1:
      return '1 комната';
    case rooms > 1 && rooms < 5:
      return `${rooms} комнаты`;
    case rooms === 69:
      return 'Ищут соседа'
    default:
      return `${rooms} комнат`;
  }
}
