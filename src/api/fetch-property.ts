import { gql } from '@apollo/client';
import { Property } from '../types';
import apolloClient from './apollo-client';
import { mapProperty } from './helpers';

const FETCH_PROPERTY_QUERY = gql`
  query Q ($where: announcements_bool_exp) {
    announcements(limit: 1, offset: 0, where: $where) {
      location
      source
      posted_at
      house_type
      id
      link
      media_amount
      message_id
      price
      rooms
      text
      username
    }
  }
`;

type FetchPropertyResponse = {
  announcements: Property[]
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

  const property = result.data.announcements?.[0];

  if (!property) {
    return null;
  }

  return mapProperty(property);
}