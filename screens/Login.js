import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
} from '@web3auth/react-native-sdk';
import Constants, { AppOwnership } from 'expo-constants';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button as PaperButton, Avatar } from 'react-native-paper';
import { useWalletConnect } from 'react-native-walletconnect';
import { LoginInfoContext } from '../context';
import Console from '../components/Console';

const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo ||
  Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL('web3auth', {})
    : Linking.createURL('web3auth', { scheme });

const clientId =
  'BHtDQslkndgzRqaWdlfSfO14IZ-_HNDAi4BCZD-Dd1PisgniPdQZZnU455y38WN-nBXBsJz7pAi1lJjCkkWlOks';

export default function Login() {
  const loginInfo = useContext(LoginInfoContext);
  const [console, setConsole] = useState('');
  const navigation = useNavigation();

  const { createSession, session } = useWalletConnect();

  useEffect(() => {
    if (session.length > 0) {
      const peerMeta = session[0]?.peerMeta;
      const icon = peerMeta?.icons && peerMeta.icons[0];
      loginInfo.set({
        method: 'wallet',
        accounts: session[0].accounts,
        icon,
      });
    }
  }, [session]);

  useEffect(() => {
    uiConsole(loginInfo.value);
    if (loginInfo.value.accounts?.length > 0) {
      uiConsole(loginInfo.value);
      navigation.replace('SongList');
    }
  }, [loginInfo]);

  const uiConsole = (...args) => {
    setConsole(`${JSON.stringify(args || {}, null, 2)}\n\n\n\n${console}`);
  };

  const login = async () => {
    try {
      const web3auth = new Web3Auth(WebBrowser, {
        clientId,
        network: OPENLOGIN_NETWORK.CYAN, // or other networks
      });
      const info = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.GOOGLE,
        redirectUrl: resolvedRedirectUrl,
        mfaLevel: 'none',
        curve: 'secp256k1',
        dappShare: '',
      });

      loginInfo.set({
        method: 'google',
        accounts: [info.userInfo.email],
        icon: info.userInfo.profileImage,
      });
    } catch (e) {
      loginInfo.set({
        method: '',
        icon: null,
        accounts: [],
      });
    }
  };

  if (loginInfo.value.accounts?.length > 0) {
    navigation.replace('SongList');
  }
  return (
    <View style={styles.container}>
      <View>
        <Avatar.Image
          size={100}
          source={require('../assets/stems-logo.jpeg')}
        ></Avatar.Image>
      </View>
      <Text style={styles.welcome}>Welcome to Stems DAO</Text>
      <PaperButton
        icon='google'
        mode='contained'
        onPress={login}
        style={styles.loginCta}
      >
        Login with Google
      </PaperButton>
      <PaperButton
        icon='wallet'
        mode='contained'
        onPress={createSession}
        style={styles.loginCta}
      >
        Login with Wallet
      </PaperButton>
      {false && <Console data={console} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d1e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 48,
    paddingBottom: 48,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 64,
    color: 'white',
  },
  loginCta: {
    marginVertical: 16,
    width: 200,
  },
});
