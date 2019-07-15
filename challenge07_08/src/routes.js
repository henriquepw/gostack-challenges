import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Home from './pages/home';
import Cart from './pages/cart';
import Header from './components/header';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Home,
      Cart,
    },
    {
      headerLayoutPreset: 'left',
      headerBackTitleVisible: false,
      defaultNavigationOptions: navigation => ({
        header: <Header {...navigation} />,
      }),
      cardStyle: {
        backgroundColor: '#191920',
      },
    }
  )
);

export default Routes;
