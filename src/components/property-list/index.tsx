import {
  Flex,
} from '@mantine/core';
import PropertyItem from '../property';
import { FC } from 'react';
import { Property } from '../../types';

const PropertyList: FC<{ properties: Property[] }> = ({ properties }) => {
  return (
    <Flex direction="row" wrap="wrap" gap={20} >
      {
        properties.map(p => <PropertyItem property={p} key={p.id} shortlisted={false} onShortlist={() => {}}/>)
      }
    </Flex>
  )
}

export default PropertyList;
