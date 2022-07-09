import React, {FC} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import TransactionDetail from './screens/TransactionDetail';
import { theme } from './themes/Theme';

const {Navigator, Screen} = createNativeStackNavigator();

const App: FC = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      <Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleStyle: theme.textVariants.header,
        }}>
        <Screen name="Home" component={Home} options={{headerShown: false}} />
        <Screen
          name="Details"
          component={TransactionDetail}
          options={{
            title: 'Status Transaksi',
            headerShown: true,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default App;
