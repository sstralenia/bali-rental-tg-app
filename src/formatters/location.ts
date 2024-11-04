const locationMap: Record<string, string> = {
  'bukit': 'Букит',
  'canggu': 'Чангу',
  'jimbaran': 'Джимбаран',
  'kuta': 'Кута',
  'seminyak': 'Семиньяк',
  'ubud': 'Убуд',
  'uluwatu': 'Улувату',
};

export function formatLocation(location: string): string {
  return locationMap[location] || location;
}
