import { gql } from '@apollo/client';
import apolloClient from './apollo-client';

const tableName = import.meta.env.VITE_ANNOUNCEMENTS_TABLE as string;

type FetchLocationsResponse<TableName extends string> = {
  [K in TableName]: { location: string }[];
}

const FETCH_LOCATIONS_QUERY = gql`
  query Q {
    ${tableName}(distinct_on: location) {
      location
    }
  }
`;

export async function fetchLocations(): Promise<string[]> {
  const result = await apolloClient.query<FetchLocationsResponse<typeof tableName>>({
    query: FETCH_LOCATIONS_QUERY,
  });

  const locations = new Set<string>();

  result.data[tableName].forEach(p => {
    if (!p.location) {
      return
    }

    if (p.location === 'unagasan') {
      locations.add('ungasan');
    } else {
      locations.add(p.location);
    }
  });

  return Array.from(locations);
}
