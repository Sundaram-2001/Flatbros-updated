import { Pressable, StyleSheet, Text, View } from 'react-native';

const genderLabels = {
  any: 'Anyone',
  male: 'Men',
  female: 'Women',
};

export function PropertySummary({ property }) {
  const bhk = String(property.bhk ?? '').trim();
  const title = /^(\d+)\s*(bhk)?$/i.test(bhk)
    ? `${parseInt(bhk, 10)} BHK`
    : bhk || 'BHK unavailable';
  const rent = property.rent == null || property.rent === ''
    ? NaN
    : Number(property.rent);

  return (
    <View style={styles.summary}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.rent}>
        {Number.isFinite(rent) ? `₹${rent.toLocaleString('en-IN')} / month` : 'Rent unavailable'}
      </Text>
      <Text style={styles.preference}>
        Preferred gender: {genderLabels[property.gender] ?? property.gender ?? 'Not specified'}
      </Text>
    </View>
  );
}

export function PropertyCard({ property, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <PropertySummary property={property} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    backgroundColor: '#ffffff',
  },
  pressed: { opacity: 0.72 },
  summary: { gap: 6 },
  title: { fontSize: 17, fontWeight: '600', color: '#1a1a1a' },
  rent: { fontSize: 18, fontWeight: '600', color: '#1a1a1a' },
  preference: { fontSize: 14, color: '#555555' },
});
