import { View, Text, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function AuthNavHeader({ title, onBackPress }) {
  return (
    <View
      style={{
        paddingBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <IconButton icon='arrow-left' onPress={onBackPress} />
      <Text style={{ fontSize: 24, color: 'white' }}>{title}</Text>
    </View>
  );
}
