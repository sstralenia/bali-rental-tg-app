import { useEffect, useState, useCallback, memo } from 'react';
import {
  Flex,
  TextInput,
  Button,
  Card,
  Select,
  Box,
  Title,
  Text,
  Pagination,
  LoadingOverlay,
  Container,
} from '@mantine/core';
import usePropertiesSearch from '../../hooks/properties';
import PropertyList from '../../components/property-list';
import { Property } from '../../types';

const locations = [
  { value: 'canggu', label: 'Canguu' },
  { value: 'kuta', label: 'Kuta' },
  { value: 'seminyak', label: 'Seminyak' },
  { value: 'uluwatu', label: 'Uluwatu' },
  { value: 'bukit', label: 'Bukit' },
  { value: 'jimbaran', label: 'Jimbaran' },
  { value: 'ubud', label: 'Ubud' },
];

function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ paymentFrom: 0, paymentTo: 1000000, industryId: null });
  const [activePage, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const { query, properties } = usePropertiesSearch();

  const perPage = 6;
  const totalPages = Math.floor(totalItems / perPage);
  const isPaginationShown = totalPages > 0;

  useEffect(() => { 
    const fetchData = async () => {
      setIsLoading(true);
      await query({ query: searchTerm, pagination: { page: activePage, perPage } });
      setIsLoading(false);
    };

    fetchData();
  }, [setIsLoading, query, searchTerm, activePage]);

  return (
    <Container size="lg">
      <Flex
        direction="row"
        w="100%"
        gap={20}
      >
        <Flex w="25%" style={{ alignItems: 'flex-start' }}>
          <Card withBorder w='100%'>
            <Flex justify="space-between">
              <Title order={4}>Фильтры</Title>
              <Box>
                <Text>Сбросить все</Text>
              </Box>
            </Flex>
            <Select
              className="industry-select"
              label="Локация"
              placeholder="Выберите локацию"
              data={locations}
              mt="xl"
            />
            <Select
              className="industry-select"
              label="Кол-во комнат"
              placeholder="От"
              data={[]}
              mt="sm"
            />
            <Select
              className="industry-select"
              placeholder="До"
              data={[]}
              mt="xs"
            />
            <Select
              className="industry-select"
              label="Цена"
              placeholder="От"
              data={[]}
              mt="sm"
            />
            <Select
              className="industry-select"
              placeholder="До"
              data={[]}
              mt="xs"
            />
            <Button
              fullWidth
              onClick={() => {}}
              mt="sm"
            >
              Применить
            </Button>
          </Card>
        </Flex>
        <Flex
          w={'70%'}
          direction="column"
        >
          <Flex direction="column" pos="relative">
            { isLoading && <LoadingOverlay visible={true}/> }
            <div style={{ marginBottom: '40px' }}>
              <PropertyList properties={properties}/>
            </div>
            { isPaginationShown && <Pagination value={activePage}  total={totalPages} /> }
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}

export default memo(SearchPage);
