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

const roomOptions = [{
  label: 'Не важно',
  value: 'none',
}, {
  label: '1',
  value: '1',
}, {
  label: '2',
  value: '2',
}, {
  label: '3',
  value: '3',
}, {
  label: '4+',
  value: '4+',
}]

type Props = {
  opened: boolean;
  filters: FilterValues;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
}

const FiltersModal: FC<Props> = ({ opened, filters: initialFilters, onClose, onApply }) => {
  const [filters, setFilters] = useState<FilterValues>(initialFilters || {
    location: null,
    room: 'none',
    isLookForNeighboor: false,
    priceFrom: null,
    priceTo: null,
  });
  const { locations } = useLocations();
  const locationOptions = useMemo(() => {
    return locations.map(location => ({ value: location, label: capitalize(location) }));
  }, [locations]);

  const handleApply = useCallback(() => {
    onApply({
      location: filters.location || null,
      priceFrom: filters.priceFrom?.toString() || null,
      priceTo: filters.priceTo?.toString() || null,
      isLookForNeighboor: filters.isLookForNeighboor || false,
      room: filters.isLookForNeighboor ? null : filters.room,
    });
  }, [filters.location, filters.priceFrom, filters.priceTo, filters.room, onApply]);
  const handleReset = useCallback(() => {
    setFilters({
      location: null,
      priceFrom: null,
      priceTo: null,
      isLookForNeighboor: false,
      room: 'none',
    });
  }, [setFilters]);

  useEffect(() => {
    if (opened) {
      document.body.dataset['scrollLocked'] = '1';
    } else {
      delete document.body.dataset['scrollLocked'];
    }
  }, [opened])

  useEffect(() => {
    setFilters(filters => ({
      ...filters,
      room: filters.isLookForNeighboor ? null : 'none',
    }));
  }, [filters.isLookForNeighboor]);

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
                  disabled={filters.isLookForNeighboor}
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
        
        <Group
          style={{ flexWrap: 'nowrap', alignItems: 'flex-end' }}
        >
          <Input.Wrapper
            label="Цена (в млн IDR)"
            mt="xs"
          >
            <Input
              type="number"
              min={0}
              placeholder="Мин"
              value={filters.priceFrom ?? ''}
              onChange={(e) => setFilters((current) => ({ ...current, priceFrom: e.target.value }))}
              mt="2px"
            />
          </Input.Wrapper>

          <Input
            placeholder="Макс"
            max={100}
            type="number"
            value={filters.priceTo ?? ''}
            onChange={e => setFilters((current) => ({ ...current, priceTo: e.target.value }))}
          />
        </Group>
        
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
