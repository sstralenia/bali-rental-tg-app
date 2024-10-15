import { FC, useCallback, useMemo, useState } from "react";
import {
  Flex,
  Button,
  Card,
  Select,
  Title,
  Text,
  Input,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import useLocations from '../../../hooks/locations';
import { FilterValues } from "../types";
import { capitalize } from "../../../utils/string";
import './styles.css';

const rooms = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
];

type Props = {
  onApply: (filters: FilterValues) => void;
}

const Filters: FC<Props> = ({ onApply }) => {
  const [filters, setFilters] = useState<FilterValues>({});
  const { locations } = useLocations();

  const roomsFromOptions = useMemo(() => {
    return rooms.filter(room => !filters.roomsTo || parseInt(room.value) <= parseInt(filters.roomsTo));
  }, [filters.roomsTo]);
  const roomsToOptions = useMemo(() => {
    return rooms.filter(room => !filters.roomsFrom || parseInt(room.value) >= parseInt(filters.roomsFrom));
  }, [filters.roomsFrom]);
  const locationOptions = useMemo(() => {
    return locations.map(location => ({ value: location, label: capitalize(location) }));
  }, [locations]);

  const handleApply = useCallback(() => {
    onApply({
      location: filters.location || undefined,
      roomsFrom: filters.roomsFrom || undefined,
      roomsTo: filters.roomsTo || undefined,
      priceFrom: filters.priceFrom?.toString() || undefined,
      priceTo: filters.priceTo?.toString() || undefined,
    });
  }, [filters.location, filters.roomsFrom, filters.roomsTo, filters.priceFrom, filters.priceTo, onApply]);
  const handleReset = useCallback(() => {
    setFilters({});
    onApply({});
  }, [onApply]);

  return (
    <Card withBorder w='100%' style={{ borderRadius: '10px', padding: '20px'}}>
      <Flex justify="space-between" align="center">
        <Title order={3}>Фильтры</Title>
        <Flex
          direction="row"
          align="center"
          className="reset"
          style={{ cursor: 'pointer' }}
          onClick={handleReset}
        >
          <Text style={{ color: '#ACADB9', fontSize: '14px', marginRight: '4px' }}>Сбросить все</Text>
          <IconX color='#ACADB9' size={14}/>
        </Flex>
      </Flex>
      <Select
        label="Локация"
        placeholder="Выберите локацию"
        data={locationOptions}
        value={filters.location}
        onChange={(location) => setFilters((current) => ({ ...current, location }))}
        mt="xl"
      />
      <Select
        label="Кол-во комнат"
        placeholder="От"
        data={roomsFromOptions}
        value={filters.roomsFrom}
        onChange={(roomsFrom) => setFilters((current) => ({ ...current, roomsFrom }))}
        mt="sm"
      />
      <Select
        placeholder="До"
        data={roomsToOptions}
        value={filters.roomsTo}
        onChange={(roomsTo) => setFilters((current) => ({ ...current, roomsTo }))}
        mt="xs"
      />
      <Input.Wrapper label="Цена (в IDR)" mt="xs">
        <Input
          type="number"
          placeholder="От"
          value={filters.priceFrom ?? ''}
          onChange={(e) => setFilters((current) => ({ ...current, priceFrom: e.target.value }))}
          mt="2px"
        />
      </Input.Wrapper>
      <Input
        placeholder="До"
        type="number"
        value={filters.priceTo ?? ''}
        onChange={e => setFilters((current) => ({ ...current, priceTo: e.target.value }))}
        mt="xs"
      />
      <Button
        fullWidth
        onClick={handleApply}
        mt="sm"
      >
        Применить
      </Button>
    </Card>
  );
}

export default Filters;
