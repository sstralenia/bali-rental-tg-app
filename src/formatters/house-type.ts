export function formatHouseType(houseType: string | null): string {
  if (houseType === null) {
    return ''
  }

  switch (houseType.toLocaleLowerCase()) {
    case 'Villa':
    case 'villa':
      return 'Вилла';
    case 'apartment':
    case 'apartments':
      return 'Апартаменты';
    case 'commercial property':
      return 'Коммерческая недвижимость';
    case 'gest':
    case 'guest':
      return 'Гестхаус';
    case 'hotel':
      return 'Отель';
    case 'house':
      return 'Дом';
    case 'room':
      return 'Комната';
    default:
      return '';
  }
}