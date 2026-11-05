import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { API_URL } from '../../../api/config';
import { PropertyCard } from '../../../components/PropertyCard';

export default function Properties() {
  const insets = useSafeAreaInsets();
  const { placeId, placeName } = useLocalSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProperties() {
      try {
        const response = await fetch(
          `${API_URL}/getProperties?placeId=${encodeURIComponent(placeId)}`
        );
        const data = await response.json();
        if (!response.ok) {
          setError(data.message ?? 'Could not load properties');
          return;
        }
        setProperties(Array.isArray(data) ? data : []);
      } catch {
        setError('Could not reach the API. Is the server running?');
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, [placeId]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: insets.top,
        paddingHorizontal: 16,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
        Showing properties in {placeName}.
      </Text>
      {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={properties}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
          ListEmptyComponent={<Text>No properties in this area yet.</Text>}
          renderItem={({ item }) => (
            <PropertyCard
              property={item}
              onPress={() => router.push({
                pathname: '/property-details',
                params: { propertyId: item.id },
              })}
            />
          )}
        />
      )}
    </View>
  );
}
