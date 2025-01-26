import { FC, useCallback, useEffect } from 'react';
import { Container, Box, Title, Text, Group, Button, LoadingOverlay, ActionIcon, Stack } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useOs } from '@mantine/hooks';
import { IconChevronLeft, IconUpload, IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { Property as PropertyType } from '../../types';
import useAnalytics from '../../hooks/analytics';
import { formatRooms } from '../../formatters/rooms';
import { formatHouseType } from '../../formatters/house-type';
import { formatMoney } from '../../formatters/money';
import { formatDate } from '../../formatters/date';
import { formatCity } from '../../formatters/city';
import { formatString } from '../../utils/string';
import { formatLocation } from '../../formatters/location';

const {
  VITE_APP_URL: APP_URL,
  VITE_BOT_USERNAME: BOT_USERNAME,
  VITE_SUPPORT_USERNAME: SUPPORT_USERNAME,
} = import.meta.env;

type Props = {
  onBack: () => void;
  property: PropertyType | null;
  shortlisted: boolean;
  onShortlist: (property: PropertyType) => void;
  isLoading?: boolean;
}

const CONTACT_TEXT_TEMPLATE_RU = `Привет!%0AУвидел объявление на @{{botName}}%0AСкажи, пожалуйста, актуально ли%3F%0A{{link}}`;
const CONTACT_TEXT_TEMPLATE_EN = `Hello!%0AI saw an ad on @{{botName}}%0APlease tell me if it's still available%3F%0A{{link}}`;

const SHARE_TEXT_TEMPLATE = `
📍 {{location}}, {{houseType}}%0A
🏠 {{rooms}}%0A
💵 {{price}}%0A
`;

const buildPropertyUrl = (property: PropertyType) => {
  return `${APP_URL}?startapp=propertyId_${property?.id}`;
}

const Property: FC<Props> = ({ onBack, property, isLoading = false, shortlisted, onShortlist }) => {
  const { track } = useAnalytics();
  const os = useOs();
  const houseType = formatHouseType(property?.house_type ?? '');
  const canContact = 
    (property?.source === 'telegram' && property?.username) ||
    (property?.source === 'facebook' && property?.link);
  const isLaptop = ['windows', 'macos', 'linux'].includes(os);

  useEffect(() => {
    if (property?.id) {
      track('property_viewed', { propertyId: property.id });
    }
  }, [property?.id, track]);

  const handleContact = () => {
    track('property_contacted', { propertyId: property?.id });

    const template = os === 'macos' ? CONTACT_TEXT_TEMPLATE_EN : CONTACT_TEXT_TEMPLATE_RU

    console.log('template', template)

    if (property?.source === 'telegram') {
      const text = formatString(template, {
        botName: BOT_USERNAME,
        link: encodeURIComponent(property.link),
      });
      console.log('text', text)
      const url = `https://t.me/${property?.username}?text=${text}`;
      Telegram.WebApp.openTelegramLink(url);
    } else {
      Telegram.WebApp.openLink(property?.link ?? '', { try_instant_view: true });
    }
  };

  const handleShare = useCallback(() => {
    if (!property) {
      return;
    }

    track('property_shared', { propertyId: property?.id });

    const url = buildPropertyUrl(property);
    const text = formatString(SHARE_TEXT_TEMPLATE, {
      location: formatLocation(property?.location),
      houseType: formatHouseType(property.house_type),
      rooms: formatRooms(property.rooms),
      price: formatMoney(property.price, 'IDR'),
    });

    const fullUrl = `https://t.me/share/url?url=${url}&text=${text}`;

    window.location.href = fullUrl;
  }, [property, track]);

  const handleOrderView = useCallback(() => {
    if (!property) {
      return;
    }

    track('property_ordered_view', { propertyId: property?.id });

    const url = `${APP_URL}?startapp=propertyId_${property?.id}`;
    const text = `
Привет!%0A
Хотел бы заказать просмотр объекта.%0A
Локация: ${formatLocation(property?.location)}%0A
Ссылка: ${url}
    `;

    Telegram.WebApp.openTelegramLink(`https://t.me/${SUPPORT_USERNAME}?text=${text}`);
  }, [property, track]);

  if (isLoading || !property) {
    return <LoadingOverlay visible loaderProps={{ color: '#FF5A5F' }}/>
  }

  return (
    <Container
      size='lg'
      style={{
        padding: 0,
        paddingBottom: 'calc(20px + var(--tg-safe-area-inset-bottom, 0px))',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Group
        style={{ position: 'absolute', top: 20, left: 20, right: 20, zIndex: 100, justifyContent: 'space-between' }}
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
        withControls={isLaptop}
        slideGap={0}
        align="start"
        style={{ marginBottom: '7px' }}
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
            {formatCity(property.city)}{ houseType && `, ${houseType}` }
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


        <Stack mt="sm" mb="xs">
          {
            canContact && (
              <Button
                onClick={handleContact}
                color="#FF5A5F"
                variant='outline'
              >
                Написать
              </Button>
            )
          }

          <Button
            onClick={handleOrderView}
            color="#FF5A5F"
          >
            Заказать просмотр
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default Property;
