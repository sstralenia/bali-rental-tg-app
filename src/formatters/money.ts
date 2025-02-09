import { PriceType, Rate } from '../types';

const ONE_MILLION = 1_000_000;
const BASIC_CURRENCY = 'IDR';

type FormatMoneyInput = {
  value: number;
  currency: string;
  priceType: PriceType | null;
  rates: Rate[];
}

function convertToBasicCurrency(value: number, currency: string, rates: Rate[]): number {
  if (currency === BASIC_CURRENCY) {
    return value;
  }

  const basicRate = rates.find(r => r.to_iso === BASIC_CURRENCY);

  if (!basicRate) {
    return 0;
  }

  let convertedValue = value;

  if (basicRate?.from_iso !== currency) {
    const rate = rates.find(r => r.to_iso === currency && r.to_iso);

    if (!rate) {
      return 0;
    }

    convertedValue = value / rate?.to_amount;
  }

  const basicValue = convertedValue * basicRate.to_amount;

  return basicValue;
}

function formatType(priceType: PriceType | null): string {
  const basePart = 'млн';

  switch (priceType) {
    case PriceType.DAILY:
      return `${basePart}/день`;
    case PriceType.MONTHLY:
      return `${basePart}/месяц`;
    case PriceType.YEARLY:
      return `${basePart}/год`;
    default:
      return basePart
  }
}

export function formatMoney(input: FormatMoneyInput): string {
  const { value, currency, priceType, rates } = input;

  if (!value) {
    return 'Цена не указана';
  }

  const basicValue = convertToBasicCurrency(value, currency, rates);

  if (basicValue < 0.01) {
    return 'Цена не указана';
  }

  const valueInMillions = basicValue / ONE_MILLION;

  if (valueInMillions < 0.01) {
    return 'Цена не указана';
  }

  const formattedNumber = new Intl.NumberFormat('en-EN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(valueInMillions);

  const formattedType = formatType(priceType);

  return `${formattedNumber} ${formattedType} ${BASIC_CURRENCY}`;
}
