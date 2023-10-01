import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/Home'
import FindUserScreen from './src/screens/FindUser'
import RandomAgentScreen from './src/screens/RandomAgent'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ title: 'Overview' }} name='Home' component={HomeScreen} />
        <Stack.Screen name='FindUser' component={FindUserScreen} />
        <Stack.Screen name='RandomAgent' component={RandomAgentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}