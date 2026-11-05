import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text } from 'react-native';
import { API_URL } from '../../../api/config';
import { PropertySummary } from '../../../components/PropertyCard';

export default function PropertyDetails() {
  const { propertyId } = useLocalSearchParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (typeof propertyId !== 'string' || !propertyId) return;

    async function loadProperty() {
      try {
        const response = await fetch(
          `${API_URL}/getProperty?propertyId=${encodeURIComponent(propertyId)}`,
        );
        if (!response.ok) {
          throw new Error(response.status === 404 ? 'Property not found.' : 'Could not load property details.');
        }
        const property = await response.json();
        setResult({ propertyId, property });
      } catch (error) {
        setResult({ propertyId, error: error.message });
      }
    }

    loadProperty();
  }, [propertyId]);

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }}>
      {typeof propertyId !== 'string' || !propertyId ? (
        <Text>Property not found.</Text>
      ) : result?.propertyId !== propertyId ? (
        <ActivityIndicator />
      ) : result.error ? (
        <Text>{result.error}</Text>
      ) : (
        <>
          <PropertySummary property={result.property} />
          <Text>Sign-in is required to view the building name, address, and owner contact details.</Text>
        </>
      )}
    </ScrollView>
  );
}
