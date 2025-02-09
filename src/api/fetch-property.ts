import { gql } from '@apollo/client';
import { Property } from '../types';
import apolloClient from './apollo-client';
import { mapProperty } from './helpers';

const tableName = import.meta.env.VITE_ANNOUNCEMENTS_TABLE as string;

const FETCH_PROPERTY_QUERY = gql`
  query Q ($where: ${tableName}_bool_exp) {
    ${tableName}(limit: 1, offset: 0, where: $where) {
      location
      city
      source
      posted_at
      house_type
      id
      link
      media_amount
      message_id
      price
      currency
      price_type
      rooms
      text
      username
    }
  }
`;

type FetchPropertyResponse<TableName extends string> = {
  [K in TableName]: Property[]
}

export async function fetchProperty(id: string): Promise<Property | null> {
  const result = await apolloClient.query<FetchPropertyResponse<typeof tableName>>({
    query: FETCH_PROPERTY_QUERY,
    variables: {
      where: {
        id: { _eq: id },
      },
    },
  });

  const property = result.data[tableName]?.[0];

  if (!property) {
    return null;
  }

  return mapProperty(property);
}