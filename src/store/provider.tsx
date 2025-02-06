import { FC, useState, useEffect } from 'react';
import { Properties, StoreContext } from './context';
import { Property, Rate } from '../types';
import { FilterValues } from '../pages/search/types';
import { fetchRates } from '../api';

const SHORTLISTED_PROPERTIES_KEY = 'shortlisted-properties-v2';

function getProperties(): Property[] {
  try {
    const storedProperties = localStorage.getItem(SHORTLISTED_PROPERTIES_KEY);

    if (!storedProperties) {
      return [];
    }

    return JSON.parse(storedProperties);
  } catch (err) {
    console.log('Error getting properties from local storage:', err);
    return [];
  }
}

function storeProperties(properties: Property[]) {
  const propertiesInJSON = JSON.stringify(properties);
  localStorage.setItem(SHORTLISTED_PROPERTIES_KEY, propertiesInJSON);
}

type StoreProviderProps = {
  children: React.ReactNode;
};

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const [shortlistedProperties, setShortlistedProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<FilterValues>({
    location: null,
    priceFrom: null,
    priceTo: null,
    isLookForNeighboor: false,
    room: 'none',
  });
  const [properties, setProperties] = useState<Properties>({
    items: [],
    totalItems: 0,
    page: 1,
  });
  const [scrollPosition, setScrollPosition] = useState<{ [key: string]: number }>({});
  const [rates, setRates] = useState<Rate[]>([]);

  useEffect(() => {
    setShortlistedProperties(getProperties());
  }, []);

  useEffect(() => {
    fetchRates().then(setRates);
  }, []);

  const toggleProperty = (property:  Property) => {
    const index = shortlistedProperties.findIndex(p => p.id === property.id);
    const copy = [...shortlistedProperties];

    if (index === -1) {
      copy.unshift(property)
    } else {
      copy.splice(index, 1);
    }

    setShortlistedProperties(copy);
    storeProperties(copy)
  };

  return (
    <StoreContext.Provider
      value={{
        shortlistedProperties,
        toggleShortlistedProperty: toggleProperty,
        filters,
        setFilters,
        properties,
        setProperties: (fn) => setProperties(prev => fn(prev)),
        scrollPosition,
        setScrollPosition: (key, position) => setScrollPosition(prev => ({ ...prev, [key]: position })),
        rates,
        setRates,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
