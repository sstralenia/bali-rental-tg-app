const locationMap: Record<string, string> = {
  'bukit': 'Букит',
  'canggu': 'Чангу',
  'jimbaran': 'Джимбаран',
  'kuta': 'Кута',
  'seminyak': 'Семиньяк',
  'ubud': 'Убуд',
  'uluwatu': 'Улувату',
  'nusa dua': 'Нуса Дуа',
  'sanur': 'Санур',
  'ungasan': 'Унгасан',
  'unagasan': 'Унагасан',
};

export function formatLocation(location: string | null): string {
  if (!location) {
    return 'Локация неизвестна';
  }

  return locationMap[location] || location;
}
