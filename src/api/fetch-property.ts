import { gql } from '@apollo/client';
import { Property } from '../types';
import apolloClient from './apollo-client';
import { mapProperty } from './helpers';

const FETCH_PROPERTY_QUERY = gql`
  query Q ($where: tg_announcement_bool_exp) {
    tg_announcement(limit: 1, offset: 0, where: $where) {
      location
      created_at
      house_type
      id
      link
      media_amount
      message_author
      message_id
      price
      rooms
      text
      user_id
    }
  }
`;

type FetchPropertyResponse = {
  tg_announcement: Property[]
}

export async function fetchProperty(id: string): Promise<Property | null> {
  const result = await apolloClient.query<FetchPropertyResponse>({
    query: FETCH_PROPERTY_QUERY,
    variables: {
      where: {
        id: { _eq: id },
      },
    },
  });

  const property = result.data.tg_announcement?.[0];

  if (!property) {
    return null;
  }

  return mapProperty(property);
}