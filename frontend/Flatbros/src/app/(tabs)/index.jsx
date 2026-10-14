import { Text, View } from 'react-native';
import getLocation from '../../hooks/user-location';
import { useEffect, useState } from 'react';

export default function Home() {
  const [location,setLocation]=useState(null)
  useEffect(()=>{
    getLocation().then(setLocation)
  },[])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        {position
          ? `${position.latitude}, ${position.longitude}`
          : 'Finding location...'}
      </Text>
    </View>
  );
}
