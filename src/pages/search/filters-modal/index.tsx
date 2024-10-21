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
  Checkbox,
  Radio,
  Text
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import useLocations from '../../../hooks/locations';
import { FilterValues, Room } from '../types';
import { capitalize } from "../../../utils/string";
import './styles.css';
import radioClassess from './radio-card.module.css';

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
const roomOptions = ['', '1', '2', '3', '4+'].map(i => ({
  label: i || 'Не важно',
  value: i
}));

console.log('radioClassess', radioClassess)

type Props = {
  opened: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
}

const FiltersModal: FC<Props> = ({ opened, onClose, onApply }) => {
  const [filters, setFilters] = useState<FilterValues>({});
  const { locations } = useLocations();
  console.log('filters', filters)

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
      priceFrom: filters.isLookForNeighboor ? undefined : filters.priceFrom?.toString() || undefined,
      priceTo: filters.isLookForNeighboor ? undefined : filters.priceTo?.toString() || undefined,
      isLookForNeighboor: filters.isLookForNeighboor || false,
    });
  }, [filters.location, filters.roomsFrom, filters.roomsTo, filters.priceFrom, filters.priceTo, onApply]);
  const handleReset = useCallback(() => {
    setFilters({
      location: null,
      roomsFrom: null,
      roomsTo: null,
      priceFrom: null,
      priceTo: null,
      isLookForNeighboor: false,
    });
  }, [setFilters]);


  useEffect(() => {
    if (opened) {
      document.body.dataset['scrollLocked'] = '1';
    } else {
      delete document.body.dataset['scrollLocked'];
    }
  }, [opened])

  console.log('filters', filters)

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
        <Radio.Group
          label="Кол-во комнат"
          value={filters.room}
          className={radioClassess['radio-group']}
          onChange={v => setFilters((current) => ({ ...current, room: (v as Room) }))}
        >
          <Group>
            {
              roomOptions.map(o => (
                <Radio.Card
                  className={radioClassess['radio-item']}
                  radius="md"
                  value={o.value}
                  key={o.value}
                  style={{width: 'auto'}}
                >
                  <Text>{o.label}</Text>
                </Radio.Card>
              ))
            }
          </Group>
        </Radio.Group>
        <Checkbox
          checked={filters.isLookForNeighboor}
          onChange={e => setFilters((current) => ({ ...current, isLookForNeighboor: e.currentTarget.checked }))}
          label="Ищут соседа"
        />
        <Input.Wrapper label="Цена (в млн IDR)" mt="xs">
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
        <Group mt="sm">
          <Button
            onClick={handleApply}
            color="#FF5A5F"
            flex="1"
          >
            Применить
          </Button>
          <Button
            fullWidth
            onClick={handleReset}
            variant="outline"
            color="#767676"
            flex="1"
          >
            Сбросить все
          </Button>
        </Group>
      </Stack>
    </Container>
  )
};

export default FiltersModal;
