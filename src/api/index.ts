import { gql } from '@apollo/client';
import { Property } from '../types';
import apolloClient from './apollo-client';

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
  tg_announcement: Property[]
  tg_announcement_aggregate: {
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
  query Q ($limit: Int, $offset: Int, $where: tg_announcement_bool_exp) {
    tg_announcement(limit: $limit, offset: $offset, where: $where, order_by: {created_at: desc}) {
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
    tg_announcement_aggregate(where: $where) {
      aggregate {
        count
      }
    } 
  }
`;

const MEDIA_URL = 'https://balibucket.sgp1.cdn.digitaloceanspaces.com/Bali';

function buildWhereClause(query: Query): Record<string, unknown> {
  const whereClause: Record<string, { _gte?: unknown, _lte?: unknown, _eq?: unknown }> = {};

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
  
  console.log('whereClause', whereClause)
  return whereClause;
}

function mapProperty(p: Property): Property {
  const media = Array.from({ length: p.media_amount }).map((_, i) => ({
    url: `${MEDIA_URL}/${p.message_id}/${i + 1}.jpeg`,
    alt: `Property ${p.id} image ${i + 1}`,
  }));

  return {
    ...p,
    id: String(p.id),
    media,
  };
}

export async function fetchProperties({ query, pagination }: { query: Query, pagination: Pagination }): Promise<FetchPropertiesResult> {
  // const cacheKey = JSON.stringify({ query, pagination });

  // if (cache.has(cacheKey)) {
  //   return cache.get(cacheKey)!;
  // }

  const result = await apolloClient.query<FetchPropertiesResponse>({
    query: FETCH_PROPERTIES_QUERY,
    variables: {
      where: buildWhereClause(query),
      limit: pagination.perPage,
      offset: (pagination.page - 1) * pagination.perPage,
    }
  });

  const properties = result.data.tg_announcement;
  const mappedProperties = properties.map(mapProperty);

  // cache.set(cacheKey, mappedProperties);

  return {
    properties: mappedProperties,
    total: result.data.tg_announcement_aggregate?.aggregate?.count ?? mappedProperties.length,
  };
}

const FETCH_LOCATIONS_QUERY = gql`
  query Q {
    tg_announcement(distinct_on: location) {
      location
    }
  }
`;

type FetchLocationsResponse = {
  tg_announcement: { location: string }[];
}

export async function fetchLocations(): Promise<string[]> {
  const result = await apolloClient.query<FetchLocationsResponse>({
    query: FETCH_LOCATIONS_QUERY,
  });

  return result.data.tg_announcement.map(p => p.location);
}

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