import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/Home'
import RandomAgentScreen from './src/screens/RandomAgent'
import PolicyScreen from './src/screens/Policy'

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerTitleStyle: {
          fontWeight: "900",
          color: "#000000"
        },
        headerStyle: {
          backgroundColor: '#f64f4f'
        }
      }}>
        <Stack.Screen options={{ title: 'Início' }} name='Home' component={HomeScreen} />
        <Stack.Screen options={{ title: 'Agente aleatório' }} name='RandomAgent' component={RandomAgentScreen} />
        <Stack.Screen options={{ title: 'Políticas do Valorant Picks' }} name='policy' component={PolicyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}