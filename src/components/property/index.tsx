import {
  Card,
  Title,
  Text,
  Flex,
  ActionIcon
} from '@mantine/core';
import { Link } from "react-router-dom";
// import { Heart, HeartOff } from 'tabler-icons-react';

const getSalary = (vacancy) => {
  const { paymentFrom = 0, paymentTo = 0, currency = 'RUB' } = vacancy
  if (!paymentFrom && !paymentTo) {
    return 'не указана';
  }

  if (!paymentTo) {
    return `от ${paymentFrom} ${currency}`;
  }

  return `${paymentFrom} - ${paymentTo} ${currency}`;
};

export default function Property({ property, shortlisted, onShortlist }) {
  return (
    <Card withBorder data-elem={`vacancy-${property.id}`} style={{ width: 'calc(33.333% - 20px)'}}>
      <Flex direction="row">
        <div
          style={{display: 'flex', flexGrow: 1, flexDirection: 'column'}}
        >
          <Title order={5} styles={{flexGrow: 1}} mb={8}>
            <Link to={`/vacancies/${property.id}`}>
              {property.profession}
            </Link>
            &nbsp;&nbsp;•&nbsp;&nbsp;
            <Text sx={{ display: 'inline'}} fw={500}>{property.city}</Text>
          </Title>
          <Text fz="sm" mb={8} fw={700}>
            з/п { getSalary(property) }
          </Text>
          <Text>
            { property.typeOfWork }
          </Text>
        </div>
        <Flex>
          <ActionIcon data-elem={`property-${property.id}-shortlist-button`}>
          </ActionIcon>
        </Flex>
      </Flex>
    </Card>
  );
}
