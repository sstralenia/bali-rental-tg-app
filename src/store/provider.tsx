import { FC, useState, useEffect } from 'react';
import { StoreContext } from './context';
import { Property } from '../types';

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
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    setProperties(getProperties());
  }, []);

  const toggleProperty = (property:  Property) => {
    const index = properties.findIndex(p => p.id === property.id);
    const copy = [...properties];

    if (index === -1) {
      copy.push(property)
    } else {
      copy.splice(index, 1);
    }

    setProperties(copy);
    storeProperties(copy)
  };

  return (
    <StoreContext.Provider
      value={{
        shortlistedProperties: properties,
        toggleShortlistedProperty: toggleProperty
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
