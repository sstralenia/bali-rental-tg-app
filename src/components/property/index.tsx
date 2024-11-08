import { FC, useCallback, useEffect } from 'react';
import { Container, Box, Title, Modal, Text, Group, Button, LoadingOverlay, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Carousel } from '@mantine/carousel';
import { IconChevronLeft, IconUpload, IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { Property as PropertyType } from '../../types';
import useAnalytics from '../../hooks/analytics';
import { formatRooms } from '../../formatters/rooms';
import { formatHouseType } from '../../formatters/house-type';
import { formatMoney } from '../../formatters/money';
import { formatDate } from '../../formatters/date';
import { formatLocation } from '../../formatters/location';

const APP_URL = 'https://t.me/BaliRentalHouseBot/BaliRentalHouseApp';

type Props = {
  onBack: () => void;
  property: PropertyType | null;
  shortlisted: boolean;
  onShortlist: (property: PropertyType) => void;
  isLoading?: boolean;
}

const Property: FC<Props> = ({ onBack, property, isLoading = false, shortlisted, onShortlist }) => {
  const { track } = useAnalytics();
  const [opened, { close }] = useDisclosure(false);
  const houseType = formatHouseType(property?.house_type ?? '');

  useEffect(() => {
    track('property_viewed', { propertyId: property?.id });
  }, [property?.id, track]);

  const handleContact = () => {
    track('property_contacted', { propertyId: property?.id });
    let url;

    if (property?.source === 'telegram') {
      url = `https://t.me/${property?.username}`;
    } else {
      url = property?.link ?? '';
    }

    window.location.href = url;
  };

  const handleShare = useCallback(() => {
    if (!property) {
      return;
    }

    track('property_shared', { propertyId: property?.id });

    const url = `${APP_URL}?startapp=propertyId_${property?.id}`;
    const text = `📍 ${formatLocation(property?.location)}, ${formatHouseType(property.house_type)}%0A🏠 ${formatRooms(property.rooms)}%0A💵 ${formatMoney(property.price, 'IDR')}`;
    const fullUrl = `https://t.me/share/url?url=${url}&text=${text}`;

    window.location.href = fullUrl;
  }, [property, track]);

  if (isLoading || !property) {
    return <LoadingOverlay visible loaderProps={{ color: '#FF5A5F' }}/>
  }

  return (
    <Container
      size='lg'
      style={{
        padding: 0,
        paddingBottom: '20px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Group
        style={{ position: 'absolute', top: 20, left: 20, right: 20, zIndex: 5, justifyContent: 'space-between' }}
      >
        <ActionIcon 
          variant="default"
          color="gray"
          radius="xl"
          onClick={onBack}
          style={{ height: 35, width: 35, outline: 'none' }}
        >
          <IconChevronLeft size={23} stroke={1.5} />
        </ActionIcon>

        <Group>
          <ActionIcon 
            variant="default"
            color="gray"
            radius="xl"
            style={{ height: 35, width: 35, outline: 'none' }}
            onClick={handleShare}
          >
            <IconUpload size={20} stroke={1.5} />
          </ActionIcon>
          <ActionIcon 
            variant="default"
            color="gray"
            radius="xl"
            style={{ height: 35, width: 35, outline: 'none' }}
            onClick={() => onShortlist(property)}
          >
            { !shortlisted && <IconHeart size={22} stroke={1.5} /> }
            { shortlisted && <IconHeartFilled size={22} stroke={1.5} color='#FF5A5F' /> }
          </ActionIcon>
        </Group>
      </Group>
      <Carousel
        withIndicators
        withControls={false}
        slideGap={0}
        align="start"
        style={{ marginBottom: '7px' }}
        // onClick={open}
      >
        {
          property.media.map((media, index) => (
            <Carousel.Slide key={index}>
              <img src={media.url} alt={media.alt} style={{ width: '100%', height: '50vh', objectFit: 'cover' }} />
            </Carousel.Slide>
          ))
        }
      </Carousel>
      <Box style={{ padding: '0px 20px' }}>
        <Box mb="3">
          <Title order={3}>
            {formatLocation(property.location)}{ houseType && `, ${houseType}` }
          </Title>
          <Title order={4} style={{ marginTop: '4px', marginBottom: '9px' }}>
            <Text style={{ fontWeight: 'bold' }}>
              {formatMoney(property.price, 'IDR')}
              &nbsp;&nbsp;•&nbsp;&nbsp;
              {formatRooms(property.rooms)}
            </Text>
          </Title>
        </Box>
        <Box mb="sm" dangerouslySetInnerHTML={{ __html: property.text.replace(/\n/g, '<br/>') }} />

        {
          (property.posted_at) && (
            <Box mb="xs">
              <Title order={5}>
                Обновлено {formatDate(property.posted_at)}
              </Title>
            </Box>
          )
        }

        <Group>
          <Button
            onClick={handleContact}
            mt="sm"
            mb="xs"
            color="#FF5A5F"
            flex="1"
          >
            Написать
          </Button>
          {/* <Button
            onClick={handleShare}
            variant="outline"
            color="#767676"
            flex="1"
          >
            Поделиться
          </Button> */}
        </Group>
      </Box>

      <Modal.Root opened={opened} onClose={close} centered>
        <Modal.Overlay style={{ background: 'var(--overlay-bg, rgba(0, 0, 0, 0.8))' }}/>
        <Modal.Content>
          <Modal.Body p="0">
            <Carousel
            withControls={true}
            dragFree
            slideGap={0}
            align="start"
            loop
          >
            {
              property.media.map((media, index) => (
                <Carousel.Slide key={index}>
                  <img src={media.url} alt={media.alt} style={{ width: '100%', objectFit: 'cover' }} />
                </Carousel.Slide>
              ))
            }
          </Carousel>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </Container>
  );
}

export default Property;
