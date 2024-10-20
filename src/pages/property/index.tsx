import { useEffect } from 'react';
import { useNavigate, useParams,  } from 'react-router-dom';
import { Container, Box, Title, Modal, Text, Group, Button, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Carousel } from '@mantine/carousel';
import { IconChevronLeft } from '@tabler/icons-react';
import useProperty from '../../hooks/property';
import { formatRooms } from '../../utils/rooms';
import { getHouseType } from '../../utils/house-type';
import { capitalize } from '../../utils/string';
import { formatMoney } from '../../utils/money';

const APP_URL = 'https://t.me/carpe_on_diet_bot/carpe_on_diet';

function PropertyPage() {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const { isLoading, property, query } = useProperty();
  const [opened, { open, close }] = useDisclosure(false);
  const canGoBack = window.history.length > 2;

  const handleContact = () => {
    window.location.href = 'tg://resolve?domain=chill_lime';
  };

  const handleShare = () => {
    if (!property) {
      return;
    }

    const url = `${APP_URL}?startapp=propertyId_${propertyId}`;
    const text = `${capitalize(property?.location)}, ${getHouseType(property.house_type)}
${formatRooms(property.rooms)}
${formatMoney(property.price, 'IDR')}
`;
    window.location.href = `https://t.me/share/url?url=${url}&text=${text}`;
  };

  useEffect(() => {
    query(propertyId ?? '');
  }, [propertyId, query]);

  if (isLoading || !property) {
    return <LoadingOverlay visible loaderProps={{ color: '#FF5A5F' }}/>
  }

  return (
    <Container size='lg' style={{ paddingBottom: '100px', overflow: 'hidden' }}>
      {
        canGoBack && (
          <Group onClick={() => navigate(-1)} style={{ padding: '10px 0px', gap: 2, marginBottom: 10, position: 'relative', left: -10 }}>
            <IconChevronLeft size={30} />
            <Text>Back</Text>
          </Group>
        )
      }
      <Carousel
        withIndicators
        withControls={false}
        dragFree
        slideGap={0}
        align="start"
        loop
        style={{ marginBottom: '20px' }}
        onClick={open}
      >
        {
          property.media.map((media, index) => (
            <Carousel.Slide key={index}>
              <img src={media.url} alt={media.alt} style={{ width: '100%', height: '50vh', objectFit: 'cover' }} />
            </Carousel.Slide>
          ))
        }
      </Carousel>
      <Box mb="3">
        <Title order={2}>
          {capitalize(property.location)}, {getHouseType(property.house_type)}
        </Title>
        <Title order={4}>
          {formatRooms(property.rooms)}
        </Title>
      </Box>
      <Box mb="xs">
        <Title order={2}>
          { formatMoney(property.price, 'IDR') }
        </Title>
      </Box>
      <Box mb="lg" dangerouslySetInnerHTML={{ __html: property.text.replace(/\n/g, '<br/>') }} />

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
        <Button
          onClick={handleShare}
          variant="outline"
          color="#767676"
          flex="1"
        >
          Поделиться
        </Button>
      </Group>

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

export default PropertyPage;
