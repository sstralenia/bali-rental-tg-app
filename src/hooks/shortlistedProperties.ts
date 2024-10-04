import { useEffect, useState } from 'react';
import { Property } from '../types';

const SHORTLISTED_PROPERTIES_KEY = 'shortlisted-properties';

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

export default function useShortlistedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    setProperties(getProperties());
  }, []);

  const toggleProperty = (property:  Property) => {
    const index = properties.findIndex(p => p.id === property.id);
    const copy = [...properties];

    if (index === -1) {
      copy.splice(index, 1);
    } else {
      copy.push(property)
    }

    setProperties(copy);
    storeProperties(copy)
  };

  return { properties, toggle: toggleProperty };
}
