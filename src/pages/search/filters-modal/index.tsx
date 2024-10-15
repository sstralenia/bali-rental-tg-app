import { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  Title,
  Button,
  Select,
  Input,
  Stack,
  Box,
  Container,
  Group,
} from '@mantine/core';
import useLocations from '../../../hooks/locations';
import { FilterValues } from '../types';
import { capitalize } from "../../../utils/string";
import './styles.css';
import { IconX } from "@tabler/icons-react";

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
  opened: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
}

const FiltersModal: FC<Props> = ({ opened, onClose, onApply }) => {
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


  useEffect(() => {
    if (opened) {
      document.body.dataset['scrollLocked'] = '1';
    } else {
      delete document.body.dataset['scrollLocked'];
    }
  }, [opened])

  return (
    <Container className={`filters-modal ${opened && 'opened'}`}>
      <Stack>
        <Group className="header">
          <Title order={3}>Фильтры</Title>
          <Box className="close-button">
            <IconX size={20} onClick={onClose} />
          </Box>
        </Group>
        <Select
          label="Локация"
          placeholder="Выберите локацию"
          data={locationOptions}
          value={filters.location}
          onChange={(location) => setFilters((current) => ({ ...current, location }))}
        />
        <Select
          label="Кол-во комнат"
          placeholder="От"
          data={roomsFromOptions}
          value={filters.roomsFrom}
          onChange={(roomsFrom) => setFilters((current) => ({ ...current, roomsFrom }))}
          mt="xs"
        />
        <Select
          placeholder="До"
          data={roomsToOptions}
          value={filters.roomsTo}
          onChange={(roomsTo) => setFilters((current) => ({ ...current, roomsTo }))}
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
        />
        <Button
          fullWidth
          onClick={handleApply}
          mt="sm"
          color="#FF5A5F"
        >
          Применить
        </Button>
        <Button
          fullWidth
          onClick={handleReset}
          variant="outline"
          color="#767676"
        >
          Сбросить все
        </Button>
      </Stack>
    </Container>
  )
};

export default FiltersModal;
