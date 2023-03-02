import React, { useState } from 'react';
import { StyleSheet, Image, Text, View as Box } from 'react-native';
import { IconButton } from 'react-native-paper';
import Slider from '@react-native-community/slider';

const PLAY_BUTTON = 24;

export default function Song({
  song,
  playSound,
  pauseSound,
  setSelected,
  isPlaying,
  togglePlay,
}) {
  const [currentTime, setCurrentTime] = useState(0.0);

  const getTimeStamp = () => {
    let k = 0.0;
    for (let i = 0; i <= 72; i++) {
      setTimeout(function () {
        setCurrentTime(k);
        k = k + 0.25;
        // console.log(k);
      }, i * 250);
    }
  };

  return (
    <Box key={song.id} style={styles.songItem}>
      <Box style={styles.songContainer}>
        <Box
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            style={styles.thumbnail}
            source={require('../assets/coldplay.jpeg')}
          />
          <Box>
            <Text style={styles.songName}>{song.name}</Text>
            <Text style={styles.songArtist}>Artist: {song.artist}</Text>
          </Box>
        </Box>
        {isPlaying ? (
          <IconButton
            icon={'pause'}
            mode='contained'
            size={PLAY_BUTTON}
            style={styles.iconButton}
            onPress={() => {
              setCurrentTime(0.0);
              pauseSound();
              clearTimeout();
              setSelected('');
              togglePlay(song.id, false);
            }}
          />
        ) : (
          <IconButton
            icon={'play'}
            mode='contained'
            size={PLAY_BUTTON}
            style={styles.iconButton}
            onPress={() => {
              setCurrentTime(0.0);
              playSound(song.file);
              getTimeStamp();
              setSelected(song);
              togglePlay(song.id, true);
            }}
          />
        )}
      </Box>
      {isPlaying && (
        <Slider
          style={{ width: 'auto', height: 30 }}
          minimumValue={0}
          maximumValue={18}
          value={currentTime}
          minimumTrackTintColor='#555'
          maximumTrackTintColor='#fff'
        />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  songItem: {
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: '1px',
    borderBottomColor: '#484848',
    color: 'color',
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8,
  },
  iconButton: {
    marginLeft: 0,
  },
  thumbnail: {
    marginRight: 16,
  },
  songName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: 'white',
  },
  songArtist: {
    fontSize: 14,
    marginBottom: 4,
    color: 'white',
  },
});
