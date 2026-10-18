import { FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Localities from '../../components/LocalityDropdown';
import { ListingCard } from '../../components/ListingCard';


const listings = [
  {
    id: '1',
    title: '2 BHK in Saket',
    rent: '32,000',
    furnishing: 'Semi-furnished',
    preference: 'Open to anyone',
    diet_prefernce: 'Veg ok',
    photo: null,
  },
  {
    id: '2',
    title: '1 BHK in Hauz Khas',
    rent: '22,000',
    furnishing: 'Furnished',
    preference: 'Girls only',
    diet_prefernce: 'Veg only',
    photo: null,
  },
];

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', paddingTop: insets.top, paddingHorizontal: 16 }}>
      <Text>
        Where are you looking for a place to stay?
      </Text>
      <Localities />
      <FlatList
        style={{ flex: 1, marginTop: 16 }}
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListingCard
            title={item.title}
            rent={item.rent}
            furnishing={item.furnishing}
            photo={item.photo}
            preference={item.preference}
            diet_prefernce={item.diet_prefernce}
            onPress={() => router.push(`/listing/${item.id}`)}
          />
        )}
      />
    </View>
  );
}
