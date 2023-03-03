import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View as Box } from 'react-native';
import NavHeader from '../components/NavHeader';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LoginInfoContext } from '../context';
import { useWalletConnect } from 'react-native-walletconnect';
import ProfileIcon from '../components/ProfileIcon';
import Song from '../components/Song';

export default function Profile({ theme, playSound, pauseSound }) {
  const loginInfo = useContext(LoginInfoContext);
  const navigation = useNavigation();
  const img = loginInfo.value.icon ? { uri: loginInfo.value.icon } : null;
  const { killSession, session } = useWalletConnect();
  const [name, setName] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const logoutInfo = () => {
    loginInfo.set({
      method: '',
      icon: null,
      accounts: [],
    });
    navigation.replace('Login');
  };

  const logout = (e) => {
    if (loginInfo.value.method === 'wallet') {
      killSession(e).then(() => {
        logoutInfo();
      });
    } else {
      logoutInfo();
    }
  };

  const toggleTheme = (id, val) => {
    setIsPlaying(val);
  };

  useEffect(() => {
    const key = loginInfo.value.accounts[0];
    if (loginInfo.value.method === 'wallet') {
      setName(key.slice(0, 4) + '...' + key.slice(key.length - 4, key.length));
    } else {
      setName(key);
    }
  }, [loginInfo]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1d1d1e' }}>
      <Box style={styles.container}>
        <NavHeader
          title={'Profile'}
          onBackPress={() => navigation.navigate('SongList')}
        />
        <Box style={{ alignItems: 'center' }}>
          <Box>
            <ProfileIcon uri={loginInfo.value.icon} />
          </Box>
        </Box>
        <Text style={styles.name}>{name}</Text>
        <Box style={{ marginTop: 32 }} />

        {theme && (
          <Song
            key={theme.id}
            song={theme}
            playSound={playSound}
            pauseSound={pauseSound}
            setSelected={() => {}}
            isPlaying={isPlaying}
            togglePlay={toggleTheme}
          />
        )}

        <Button
          disabled={isPlaying}
          onPress={() => navigation.navigate('SongList')}
        >
          Change Theme Song
        </Button>
      </Box>
      <Button
        disabled={isPlaying}
        onPress={logout}
        mode='contained'
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  name: {
    marginTop: 8,
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
  },
  logoutButton: {
    margin: 20,
  },
});
