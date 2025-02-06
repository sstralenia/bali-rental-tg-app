import { Rate } from '../types';

interface Converter {
  convert: (amount: number, currency: string) => number;
}

const BASIC_CURRENCY = 'IDR';

export default (rates: Rate[]): Converter => {
  const baseRate = rates.find(r => r.to_iso === BASIC_CURRENCY);
  // const rates: FetchRatesResult = {
  //   [idrRate!.from_iso]: idrRate!.to_amount,
  // };

  // result.data[tableName].forEach(r => {
  //   if (r.to_iso === 'IDR') {
  //     return;
  //   }


  //     rates[r.from_iso] = r.to_amount;
  //   }
  // });
  return {
    convert: (amount: number, currency: string): number => {
      const rate = rates.find(r => r.from_iso === currency);
      return amount * rate!.to_amount;
    },
  };
};
