import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Console({ data }) {
  return (
    <View style={styles.consoleArea}>
      <Text style={styles.consoleText}>Console:</Text>
      <ScrollView style={styles.console}>
        <Text>{data}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  consoleArea: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  console: {
    flex: 1,
    backgroundColor: '#CCCCCC',
    color: '#ffffff',
    padding: 10,
    width: Dimensions.get('window').width - 60,
  },
  consoleText: {
    padding: 10,
  },
});
