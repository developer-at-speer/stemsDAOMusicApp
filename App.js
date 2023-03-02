import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Profile from './screens/Profile';
import SongList from './screens/SongList';
import { Audio } from 'expo-av';
import WalletConnectProvider from 'react-native-walletconnect';
import { LoginInfoContext } from './context';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); //Ignore all log notifications

global.Buffer = global.Buffer || require('buffer').Buffer;

const LoginContextInitVal = {
  method: 'google',
  icon: null,
  accounts: [],
};

export default function App() {
  const Stack = createNativeStackNavigator();
  const [theme, setTheme] = useState();
  const [sound, setSound] = useState();
  const [loginContextVal, setLoginContextVal] = useState(LoginContextInitVal);

  async function pauseSound() {
    sound.unloadAsync();
    setSound('');
  }

  async function playSound(file) {
    const { sound } = await Audio.Sound.createAsync(file);
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <WalletConnectProvider>
      <PaperProvider>
        <LoginInfoContext.Provider
          value={{
            value: loginContextVal,
            set: setLoginContextVal,
          }}
        >
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name='Login'
                component={Login}
                options={{ gestureEnabled: false }}
              />
              <Stack.Screen name='Profile'>
                {(props) => (
                  <Profile
                    {...props}
                    theme={theme}
                    playSound={playSound}
                    pauseSound={pauseSound}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name='SongList'>
                {(props) => (
                  <SongList
                    {...props}
                    setTheme={setTheme}
                    playSound={playSound}
                    pauseSound={pauseSound}
                  />
                )}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </LoginInfoContext.Provider>
      </PaperProvider>
    </WalletConnectProvider>
  );
}
