import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home';
import Classes from './screens/Classes';
import theme from './services/theme';
import { Provider } from "react-redux";
import {store} from './redux/store';
const Stack = createNativeStackNavigator();

export default function App() { 
  const StackOptions = { headerShown: false, animation:'none'};
  return (
    <Provider store={store} >
    <NavigationContainer >
    <StatusBar
        backgroundColor={theme.primary}
        barStyle="light-content"
      />
      <Stack.Navigator screenOptions={{navigationBarColor: theme.primary}} options={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} options={StackOptions} />
        <Stack.Screen name="Classes" component={Classes} options={StackOptions}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}