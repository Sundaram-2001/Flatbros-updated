import * as Location from 'expo-location';

export default async function getLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return null;
  }

  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;
  const addresses = await Location.reverseGeocodeAsync({ latitude, longitude });
  return addresses[0] ?? null;
}
