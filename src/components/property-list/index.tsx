import { FC, useMemo } from 'react';
import { Grid } from '@mantine/core';
import PropertyItem from '../property';
import useShortlistedProperties from '../../hooks/shortlistedProperties';
import { Property } from '../../types';

type Props = {
  properties: Property[]
  columns?: number
}

const PropertyList: FC<Props> = ({ properties, columns = 1 }) => {
  const { properties: shortlistedProperties, toggle: toggleShortlistProperty } = useShortlistedProperties();

  const shortlistedPropertiesMap = useMemo(() => {
    return shortlistedProperties.reduce((acc, property) => acc.set(property.id, property), new Map<string, Property>());
  }, [shortlistedProperties]);

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
              onShortlist={toggleShortlistProperty}
            />
          </Grid.Col>
        )
      }
    </Grid>
  )
}

export default PropertyList;
