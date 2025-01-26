import { capitalize } from '../utils/string';

export function formatCity(city: string | null): string {
  if (!city) {
    return 'Локация неизвестна';
  }

  return capitalize(city);
}
