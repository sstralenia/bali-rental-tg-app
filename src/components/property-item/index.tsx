import { FC, SyntheticEvent, useCallback } from 'react';
import {
  Text,
  Box,
  Flex,
  Group,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { Property } from '../../types';
import { formatMoney } from '../../formatters/money';
import { formatRooms } from '../../formatters/rooms';
import { formatDate } from '../../formatters/date';

type Props = {
  property: Property;
  shortlisted: boolean;
  onShortlist: (property: Property) => void;
  onClick: (property: Property) => void;
}

const PropertyItem: FC<Props> = ({ property, shortlisted, onShortlist, onClick }) => {
  const handleShortlist = useCallback((e: SyntheticEvent) => {
    e.stopPropagation();
    onShortlist(property)
  }, [property, onShortlist]);

  return (
    <Flex
      direction="column"
      style={{ position: 'relative', cursor: 'pointer'}}
      onClick={() => onClick(property)}
    >
      <Box style={{ position: 'absolute', top: 10, right: 10, zIndex: 5, cursor: 'pointer', padding: 10 }} className='shortlist-button'>
         { shortlisted && <IconHeartFilled color='#FF5A5F' size={35} onClick={handleShortlist}/> }
         { !shortlisted && <IconHeart size={35} stroke={1.5} color='white' onClick={handleShortlist}/>}
      </Box>
      <Box style={{ position: 'absolute', top: 11, right: 11, zIndex: 4, cursor: 'pointer', padding: 10 }} className='shortlist-button'>
         { !shortlisted && <IconHeartFilled color='black' opacity={0.4} size={33} onClick={handleShortlist}/> }
      </Box>

      <Box style={{ marginBottom: '6px', borderRadius: '20px', overflow: 'hidden' }}>
        <Carousel withIndicators={true} dragFree slideGap={0} align="start" withControls={false}>
          {
            property.media.map((media, index) => (
              <Carousel.Slide key={media.url}>
                <img
                  src={media.url}
                  alt={media.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    aspectRatio: 1,
                    borderTopLeftRadius: index === 0 ? '20px' : 0,
                    borderBottomLeftRadius: index === 0 ? '20px' : 0,
                    borderTopRightRadius: index === property.media.length - 1 ? '20px' : 0,
                    borderBottomRightRadius: index === property.media.length - 1 ? '20px' : 0,
                  }}
                />
              </Carousel.Slide>
            ))
          }
        </Carousel>
      </Box>

      <Group style={{ justifyContent: 'space-between' }}>
        <Text style={{ color: '#222222', fontWeight: 'bold', fontSize: '17px' }}>
          {formatMoney(property.price, 'IDR')}
        </Text>

        {
          (property.updated_at || property.created_at) && (
            <Text style={{ color: '#222222', fontSize: '12px' }}>
              Обновлено {formatDate(property.updated_at || property.created_at)}
            </Text>
          )
        }
      </Group>

      <Text style={{ color: '#6A6A6A', fontSize: '14px' }}>
        <Text component='span' style={{ textTransform: 'capitalize' }}>{property.location}</Text>
        &nbsp;&nbsp;•&nbsp;&nbsp;
        {formatRooms(property.rooms)}
      </Text>

      
    </Flex>
  );
}

export default PropertyItem;
