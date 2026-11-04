import { SymbolView } from 'expo-symbols';
import { Pressable, Text, View } from 'react-native';

const furnishingLabels = {
  semi: 'Semi-furnished',
  full: 'Fully furnished',
  furnished: 'Furnished',
  unfurnished: 'Unfurnished',
};

const parkingLabels = {
  two_wheeler: 'Two-wheeler',
  four_wheeler: 'Car',
  both: 'Car and bike',
  none: 'No parking',
};

const foodLabels = {
  any: 'Any food',
  veg: 'Veg',
  nonveg: 'Non-veg',
};

const genderLabels = {
  any: 'Anyone',
  male: 'Men',
  female: 'Women',
};

function formatWord(value) {
  return String(value ?? '')
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatBhk(value) {
  const match = String(value ?? '').match(/(\d+)\s*bhk/i);
  if (match) return `${match[1]} BHK`;
  return formatWord(value);
}

function formatAmount(value) {
  return Number(value).toLocaleString('en-IN');
}

function formatDate(value) {
  const [year, month, day] = String(value ?? '').split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = months[Number(month) - 1];
  if (!year || !monthName || !day) return value;
  return `${Number(day)} ${monthName} ${year}`;
}

function tenantLabel(property) {
  const people = [];
  if (property.tenant_students) people.push('Students');
  if (property.tenant_working) people.push('Working');
  if (property.tenant_families) people.push('Families');
  const gender = genderLabels[property.gender] ?? formatWord(property.gender);
  if (!people.length) return gender;
  return `${gender} · ${people.join(', ')}`;
}

function CardIcon({ name }) {
  return <SymbolView name={name} tintColor="#3a3a3a" size={18} />;
}

function Fact({ name, text, wide }) {
  return (
    <View style={{ width: wide ? '100%' : '50%', flexDirection: 'row', alignItems: 'center', gap: 6, paddingRight: 8 }}>
      <CardIcon name={name} />
      <Text style={{ flex: 1, fontSize: 13, color: '#3a3a3a' }}>{text}</Text>
    </View>
  );
}

export function PropertyCard({ property, onPress }) {
  const title = `${formatBhk(property.bhk)} · ${formatWord(property.property_type)}`;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        marginBottom: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e7e7e7',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        opacity: pressed ? 0.72 : 1,
      })}
    >
      <View
        style={{
          height: 140,
          backgroundColor: '#f3f3f3',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 14, color: '#8a8a8a' }}>photo</Text>
      </View>
      <View style={{ paddingHorizontal: 14, paddingVertical: 14, gap: 10 }}>
        <View style={{ gap: 2 }}>
          <Text style={{ fontSize: 17, fontWeight: '600', color: '#1a1a1a' }}>{title}</Text>
          <Text style={{ fontSize: 13, color: '#6b6b6b' }}>{property.locality}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <CardIcon name={{ ios: 'indianrupeesign', android: 'currency_rupee', web: 'currency_rupee' }} />
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a' }}>{formatAmount(property.rent)}</Text>
          <Text style={{ fontSize: 13, color: '#6b6b6b' }}>/ month</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 10 }}>
          <Fact
            name={{ ios: 'banknote', android: 'payments', web: 'payments' }}
            text={`₹${formatAmount(property.deposit)}`}
          />
          <Fact
            name={{ ios: 'calendar', android: 'calendar_month', web: 'calendar_month' }}
            text={formatDate(property.available_from)}
          />
          <Fact
            name={{ ios: 'car.fill', android: 'directions_car', web: 'directions_car' }}
            text={parkingLabels[property.parking] ?? formatWord(property.parking)}
          />
          <Fact
            name={{ ios: 'bed.double.fill', android: 'bed', web: 'bed' }}
            text={furnishingLabels[property.furnishing] ?? formatWord(property.furnishing)}
          />
          <Fact
            name={{ ios: 'fork.knife', android: 'restaurant', web: 'restaurant' }}
            text={foodLabels[property.food] ?? formatWord(property.food)}
          />
          <Fact
            wide
            name={{ ios: 'person.fill', android: 'person', web: 'person' }}
            text={tenantLabel(property)}
          />
        </View>
      </View>
    </Pressable>
  );
}
