import { gql } from '@apollo/client';
import { Property } from '../types';
import apolloClient from './apollo-client';
import { mapProperty } from './helpers';

export type Query = {
  location?: string;
  priceFrom?: number;
  priceTo?: number;
  roomsFrom?: number;
  roomsTo?: number;
}

export type Pagination = {
  page: number;
  perPage: number;
}

type FetchPropertiesResponse = {
  announcements: Property[]
  announcements_aggregate: {
    aggregate: {
      count: number
    }
  }
}

type FetchPropertiesResult = {
  properties: Property[];
  total: number;
}

const FETCH_PROPERTIES_QUERY = gql`
  query Q ($limit: Int, $offset: Int, $where: announcements_bool_exp) {
    announcements(limit: $limit, offset: $offset, where: $where, order_by: {posted_at: desc}) {
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
    announcements_aggregate(where: $where) {
      aggregate {
        count
      }
    } 
  }
`;

function buildWhereClause(query: Query): Record<string, unknown> {
  const whereClause: Record<string, { _gte?: unknown, _lte?: unknown, _eq?: unknown, _neq?: unknown }> = {
    media_amount: { _gte: 1 },
    source: { _eq: 'telegram' },
  };

  if (query.location) {
    whereClause.location = { _eq: query.location };
  }

  if (query.priceFrom || query.priceTo) {
    whereClause.price = {};

    if (query.priceFrom) {
      whereClause.price._gte = query.priceFrom;
    }

    if (query.priceTo) {
      whereClause.price._lte = query.priceTo;
    }
  }

  if (query.roomsFrom || query.roomsTo) {
    whereClause.rooms = {};

    if (query.roomsFrom) {
      whereClause.rooms._gte = query.roomsFrom;
    }

    if (query.roomsTo) {
      whereClause.rooms._lte = query.roomsTo;
    }
  }
  
  return whereClause;
}

export async function fetchProperties({ query, pagination }: { query: Query, pagination: Pagination }): Promise<FetchPropertiesResult> {
  const result = await apolloClient.query<FetchPropertiesResponse>({
    query: FETCH_PROPERTIES_QUERY,
    variables: {
      where: buildWhereClause(query),
      limit: pagination.perPage,
      offset: (pagination.page - 1) * pagination.perPage,
    }
  });

  const properties = result.data.announcements;
  const mappedProperties = properties.map(mapProperty);

  return {
    properties: mappedProperties,
    total: result.data.announcements_aggregate?.aggregate?.count ?? mappedProperties.length,
  };
}
