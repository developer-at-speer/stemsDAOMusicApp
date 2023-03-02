import React, { useState } from 'react';
import { SafeAreaView, View as Box } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavHeader from '../components/NavHeader';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Song from '../components/Song';
import { songs } from '../constants';

// const DEFAULT_ARRAY = Array(10).fill(false);

export default function SongList({ setTheme, playSound, pauseSound }) {
  const navigation = useNavigation();
  const [selected, setSelected] = useState();
  const [isPlaying, setIsPlaying] = useState(Array(10).fill(false));

  togglePlay = (id, value) => {
    let tempArr = Array(10).fill(false);
    tempArr[id - 1] = value;
    setIsPlaying(tempArr);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1d1d1e' }}>
      <NavHeader
        title={'Songs List'}
        onBackPress={() => navigation.navigate('Profile')}
      />
      <Box style={{ flex: 1, paddingHorizontal: 20 }}>
        <ScrollView style={{ flex: 1 }}>
          {songs.map((song) => (
            <Song
              key={song.id}
              song={song}
              playSound={playSound}
              pauseSound={pauseSound}
              setSelected={setSelected}
              isPlaying={isPlaying[song.id - 1]}
              togglePlay={togglePlay}
            />
          ))}
        </ScrollView>
        <Button
          disabled={!selected}
          mode='contained'
          onPress={() => {
            setTheme(selected);
            navigation.navigate('Profile');
            pauseSound();
            setIsPlaying(Array(10).fill(false));
            setSelected('');
          }}
        >
          Set this as Theme
        </Button>
      </Box>
    </SafeAreaView>
  );
}
