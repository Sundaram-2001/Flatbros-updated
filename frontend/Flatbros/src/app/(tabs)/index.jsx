import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';
import getLocation from '../../hooks/user-location';
import Localities from '../../components/LocalityDropdown';

export default function Home() {
  const [location, setLocation] = useState(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getLocation().then(setLocation);
  }, []);

  const area = location?.district || location?.city || location?.name;
  const detail = location
    ? [location.street, location.city, location.region].filter(Boolean).join(', ')
    : null;

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', paddingTop: insets.top }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          gap: 8,
        }}
      >
        <SymbolView
          name={{ ios: 'mappin', android: 'location_on', web: 'location_on' }}
          tintColor="#1c1c1e"
          size={22}
        />
        <View style={{ flex: 1, zIndex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '700' }} numberOfLines={1}>
            {area || 'Locating you...'}
          </Text>
          {detail ? (
            <Text style={{ fontSize: 12, color: '#6b6b6b', marginTop: 2 }} numberOfLines={1}>
              {detail}
            </Text>
          ) : null}
          <Localities />
        </View>
      </View>
    </View>
  );
}
