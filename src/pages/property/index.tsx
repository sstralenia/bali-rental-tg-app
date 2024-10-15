import { Container, Box, Title, Modal, Text, Badge, Group } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { Carousel } from '@mantine/carousel';
import { useMemo } from "react";
import { Property } from "../../types";
import { pluralizeRooms } from "../../utils/rooms";
import { getHouseType } from "../../utils/house-type";
import { capitalize } from "../../utils/string";

function PropertyPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const property: Property = useMemo(() => {
    try {
      const propertyJSON = localStorage.getItem('selectedProperty');
      return JSON.parse(propertyJSON ?? '{}');
    } catch (err) {
      console.error(err)
      return {};
    }
  }, []);

  const badges = Array(10)
  .fill(0)
  .map((_, index) => <Badge key={index}>Badge {index}</Badge>);

  return (
    <Container size='lg' style={{ paddingBottom: '100px' }}>
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
      <Box mb="sm">
        <Title order={2}>
          {capitalize(property.location)}, {getHouseType(property.house_type)}
        </Title>
        <Title order={4}>
          {property.rooms} {pluralizeRooms(property.rooms)}
        </Title>
      </Box>
      <Box mb="lg" dangerouslySetInnerHTML={{ __html: property.text.replace(/\n/g, '<br/>') }} />
      <Box>
        <Title order={1}>
          {property.price} IDR
        </Title>
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

export default PropertyPage;
