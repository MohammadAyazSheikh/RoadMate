

import React, {  } from 'react';
import 'react-native-gesture-handler';
import RootNavigation from './src/routes/rootNavigation';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Toast from 'react-native-toast-message';



const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
      <Toast />
    </Provider>
  )
}

export default App;
