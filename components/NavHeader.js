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
      {onBackPress && <IconButton icon='arrow-left' onPress={onBackPress} />}
      <Text style={{ fontSize: 24, color: 'white', paddingLeft: onBackPress? 0: 20 }}>{title}</Text>
    </View>
  );
}
