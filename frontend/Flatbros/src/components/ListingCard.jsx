import { Image, Pressable, Text, View } from 'react-native';

export function ListingCard({ title, rent, furnishing, photo, preference, diet_prefernce, onPress }) {
  return (
    <Pressable onPress={onPress} style={{ gap: 8, paddingVertical: 12 }}>
      {photo ? (
        <Image source={{ uri: photo }} style={{ width: '100%', height: 160, borderRadius: 8 }} />
      ) : (
        <View
          style={{
            height: 160,
            borderRadius: 8,
            backgroundColor: '#f2f2f2',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#6b6b6b' }}>Interior photo</Text>
        </View>
      )}
      <Text style={{ fontSize: 16, fontWeight: '600' }}>{title}</Text>
      <Text>
        ₹{rent} · {furnishing}
      </Text>
      <Text>
        {preference} · {diet_prefernce}
      </Text>
    </Pressable>
  );
}
