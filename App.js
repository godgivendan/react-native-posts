import 'react-native-gesture-handler';
import React, {useState} from "react";
import AppLoading from "expo-app-loading";
import {bootstrap} from "./src/plugins/bootstrap";
import {AppNavigation} from "./src/navigation/AppNavigation";
import {Provider} from "react-redux";
import store from './src/store'

export default function App() {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return (
        <AppLoading
            startAsync={bootstrap}
            onFinish={() => setIsReady(true)}
            onError={(err) => console.log(err)}
        />
    )
  }

  return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
  )
}
