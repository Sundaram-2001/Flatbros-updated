import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Localities from '../../components/LocalityDropdown';
import PropertyCard from '../../components/propertycard';

const listings = [
  {
    id: '1',
    title: '2 BHK in Saket',
    rent: '₹32,000',
    furnishing: 'Semi-furnished',
    preference: 'Open to anyone',
    food: 'Veg ok',
  },
  {
    id: '2',
    title: '1 BHK in Hauz Khas',
    rent: '₹22,000',
    furnishing: 'Furnished',
    preference: 'Girls only',
    food: 'Veg only',
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
      <ScrollView style={{ marginTop: 24 }} contentContainerStyle={{ gap: 16, paddingBottom: 24 }}>
        {listings.map((listing) => (
          <PropertyCard key={listing.id} {...listing} />
        ))}
      </ScrollView>
    </View>
  );
}
