import { FC, SyntheticEvent, useCallback } from 'react';
import {
  Text,
  Box,
  Flex,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { Property } from '../../types';

type Props = {
  property: Property;
  shortlisted: boolean;
  onShortlist: (property: Property) => void;
}

const PropertyItem: FC<Props> = ({ property, shortlisted, onShortlist }) => {
  const handleShortlist = useCallback((e: SyntheticEvent) => {
    e.stopPropagation();
    onShortlist(property)
  }, [onShortlist, property]);
  const handleClick = useCallback(() => {
    localStorage.setItem('selectedProperty', JSON.stringify(property));
    window.location.href = '/property-detail';
  },[property]);

  return (
    <Flex
      direction="column"
      style={{ position: 'relative', cursor: 'pointer'}}
      onClick={handleClick}
    >
      <Box style={{ position: 'absolute', top: 10, right: 10, zIndex: 5, cursor: 'pointer', padding: 10 }} className='shortlist-button'>
         { shortlisted && <IconHeartFilled color='#FF5A5F' size={35} onClick={handleShortlist}/> }
         { !shortlisted && <IconHeart size={35} stroke={1.5} color='white' onClick={handleShortlist}/>}
      </Box>
      <Box style={{ marginBottom: '6px', borderRadius: '20px', overflow: 'hidden' }}>
        <Carousel withIndicators={true} dragFree slideGap={0} align="start" withControls={false}>
          {
            property.media.map((media, index) => (
              <Carousel.Slide key={index}>
                <img src={media.url} alt={media.alt} style={{ width: '100%', aspectRatio: 1, borderRadius: '20px' }} />
              </Carousel.Slide>
            ))
          }
        </Carousel>
      </Box>
      <Text style={{ color: '#222222', fontWeight: 'bold', fontSize: '17px' }}>
        {property.price} IDR
      </Text>
      <Text style={{ color: '#6A6A6A', fontSize: '14px' }}>
        <Text component='span' style={{ textTransform: 'capitalize' }}>{property.location}</Text>
        &nbsp;&nbsp;•&nbsp;&nbsp;
        {property.rooms} Комнат
      </Text>
    </Flex>
  );
}

export default PropertyItem;
