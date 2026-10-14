import {Tabs} from "expo-router"
import { SymbolView } from "expo-symbols"
export default function TabLayout(){
    return(
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                },
            }}
        >
            <Tabs.Screen name="index" options={{ 
                title: 'Home', 
                headerShown:false,
                tabBarIcon: ({ color, size }) => (
                    <SymbolView
                        name={{ ios: 'house.fill', android: 'home', web: 'home' }}
                        tintColor={color}
                        size={size}
                    />
                ),
            }}
            
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <SymbolView
                            name={{ ios: 'person.fill', android: 'person', web: 'person' }}
                            tintColor={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tabs>
    )
}