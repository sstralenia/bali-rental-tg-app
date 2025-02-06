import { gql } from '@apollo/client';
import apolloClient from './apollo-client';
import { Rate } from '../types';

const tableName = import.meta.env.VITE_RATES_TABLE as string;

type FetchRatesResponse<TableName extends string> = {
  [K in TableName]: Rate[];
}

const FETCH_RATES_QUERY = gql`
  query Q {
    ${tableName}(order_by: {from_iso: asc}) {
      from_iso
      to_iso
      to_amount
    }
  }
`;

export async function fetchRates(): Promise<Rate[]> {
  const result = await apolloClient.query<FetchRatesResponse<typeof tableName>>({
    query: FETCH_RATES_QUERY,
  });

  return result.data[tableName];
}
