const ONE_MILLION = 1_000_000;

export function formatMoney(value: number, currency: string): string {
  if (!value) {
    return 'Цена не указана';
  }

  const valueInMillions = value / ONE_MILLION;

  if (valueInMillions < 0.01) {
    return 'Цена не указана';
  }

  const formattedNumber = new Intl.NumberFormat('en-EN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(valueInMillions);

  return `${formattedNumber} млн ${currency}`
}
