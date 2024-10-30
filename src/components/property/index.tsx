import { FC } from 'react';
import { useParams,  } from 'react-router-dom';
import { Container, Box, Title, Modal, Text, Group, Button, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Carousel } from '@mantine/carousel';
import { IconChevronLeft } from '@tabler/icons-react';
import { formatRooms } from '../../formatters/rooms';
import { formatHouseType } from '../../formatters/house-type';
import { capitalize } from '../../utils/string';
import { formatMoney } from '../../formatters/money';
import { Property as PropertyType } from '../../types';

const APP_URL = 'https://t.me/carpe_on_diet_bot/carpe_on_diet';

type Props = {
  onBack: () => void;
  property: PropertyType | null;
  isLoading?: boolean;
}

const Property: FC<Props> = ({ onBack, property, isLoading = false }) => {
  const { propertyId } = useParams();
  const [opened, { open, close }] = useDisclosure(false);

  const handleContact = () => {
    // @ts-expect-error Telegram is not a key of window
    window.Telegram.WebApp.openLink(`tg://user?id=${property?.user_id}`);
  };

  const handleShare = () => {
    if (!property) {
      return;
    }

    const url = `${APP_URL}?startapp=propertyId_${propertyId}`;
    const text = `📍 ${capitalize(property?.location)}, ${formatHouseType(property.house_type)}%0A🏠 ${formatRooms(property.rooms)}%0A💵 ${formatMoney(property.price, 'IDR')}`;
    const fullUrl = `https://t.me/share/url?url=${url}&text=${text}`;

    // @ts-expect-error Telegram is not a key of window
    window.Telegram.WebApp.openLink(fullUrl);
  };

  if (isLoading || !property) {
    return <LoadingOverlay visible loaderProps={{ color: '#FF5A5F' }}/>
  }

  return (
    <Container size='lg' style={{ paddingBottom: '20px', overflow: 'hidden' }}>
      <Group onClick={onBack} style={{ padding: '10px 0px', gap: 2, marginBottom: 10, position: 'relative', left: -10 }}>
        <IconChevronLeft size={30} />
        <Text>Back</Text>
      </Group>
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
          {capitalize(property.location)}, {formatHouseType(property.house_type)}
        </Title>
        <Title order={4}>
          {formatRooms(property.rooms)}
        </Title>
      </Box>
      <Box mb="xs">
        <Title order={3}>
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

export default Property;
