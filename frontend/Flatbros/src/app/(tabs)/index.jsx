import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { API_URL } from '../../api/config';

export default function Home() {
  const insets = useSafeAreaInsets();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPlaces() {
      try {
        const response = await fetch(`${API_URL}/getPlaces`);
        const data = await response.json();
        setPlaces(Array.isArray(data) ? data : []);
      } catch {
        setError('Could not reach the API. Is the server running?');
      } finally {
        setLoading(false);
      }
    }

    loadPlaces();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', paddingTop: insets.top, paddingHorizontal: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
        Where are you looking for a place to stay?
      </Text>
      {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={places}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>No localities yet.</Text>}
          renderItem={({ item }) => (
            <Text style={{ fontSize: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#eeeeee' }}>
              {item.name}
            </Text>
          )}
        />
      )}
    </View>
  );
}
