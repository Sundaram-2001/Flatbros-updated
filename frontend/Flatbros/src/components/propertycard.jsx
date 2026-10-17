import { Image, Text, View } from 'react-native';

export default function PropertyCard({
  image,
  title = '2 BHK in Saket',
  rent = '₹32,000',
  furnishing = 'Semi-furnished',
  preference = 'Open to anyone',
  food = 'Veg ok',
}) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#1c1c1e',
        borderRadius: 16,
        padding: 16,
        gap: 8,
      }}
    >
      {image ? (
        <Image
          source={image}
          style={{ width: '100%', height: 160, borderRadius: 8 }}
          resizeMode="cover"
        />
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
      <Text style={{ fontSize: 14 }}>
        {rent} · {furnishing}
      </Text>
      <Text style={{ fontSize: 14 }}>
        {preference} · {food}
      </Text>
    </View>
  );
}
