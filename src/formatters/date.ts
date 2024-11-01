export function formatDate(date: string | null) {
  if (!date) {
    return '';
  }

  return new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
