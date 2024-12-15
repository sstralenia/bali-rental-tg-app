import { gql } from '@apollo/client';
import apolloClient from './apollo-client';

type FetchLocationsResponse = {
  tg_announcement: { location: string }[];
}

const FETCH_LOCATIONS_QUERY = gql`
  query Q {
    tg_announcement(distinct_on: location) {
      location
    }
  }
`;

export async function fetchLocations(): Promise<string[]> {
  const result = await apolloClient.query<FetchLocationsResponse>({
    query: FETCH_LOCATIONS_QUERY,
  });

  const locations = new Set<string>();

  result.data.tg_announcement.forEach(p => {
    if (p.location === 'unagasan') {
      locations.add('ungasan');
    } else {
      locations.add(p.location);
    }
  });

  return Array.from(locations);
}
