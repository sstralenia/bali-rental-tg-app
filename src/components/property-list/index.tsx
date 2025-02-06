import { FC, useCallback, useMemo } from 'react';
import { Grid } from '@mantine/core';
import PropertyItem from '../property-item';
import useShortlistedProperties from '../../hooks/shortlistedProperties';
import { Property, Rate } from '../../types';
import useAnalytics from '../../hooks/analytics';

type Props = {
  properties: Property[];
  columns?: number;
  source: 'search' | 'shortlist';
  onSelect: (property: Property) => void;
  rates: Rate[];
}

const PropertyList: FC<Props> = ({ properties, columns = 1, source, onSelect, rates }) => {
  const { track } = useAnalytics();
  const { properties: shortlistedProperties, toggle: toggleShortlistProperty } = useShortlistedProperties();

  const shortlistedPropertiesMap = useMemo(() => {
    return shortlistedProperties.reduce((acc, property) => acc.set(property.id, property), new Map<string, Property>());
  }, [shortlistedProperties]);

  const handleShortlist = useCallback((property: Property) => {
    const eventName = shortlistedPropertiesMap.has(property.id) ? 'property_unshortlisted' : 'property_shortlisted';
    toggleShortlistProperty(property);
    track(eventName, { propertyId: property.id, source });
  }, [source, track, shortlistedPropertiesMap, toggleShortlistProperty]);

  return (
    <Grid id="properties-list">
      {
        properties.map(p => 
          <Grid.Col
            key={p.id}
            span={12 / columns} 
          >
            <PropertyItem
              property={p}
              key={p.id}
              shortlisted={shortlistedPropertiesMap.has(p.id)}
              onShortlist={handleShortlist}
              onClick={onSelect}
              rates={rates}
            />
          </Grid.Col>
        )
      }
    </Grid>
  )
}

export default PropertyList;
