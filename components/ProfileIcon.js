import { Avatar } from 'react-native-paper';

function isSvg(file) {
  if (!file) return false;
  const splitedUri = file.split('.');
  const fileExt = splitedUri[splitedUri.length - 1];
  return fileExt === 'svg';
}

export default function ProfileIcon({ uri }) {
  const img = uri ? { uri } : require('../assets/stems-logo.jpeg');

  if (isSvg(uri)) {
    return (
      <Avatar.Image size={100} source={require('../assets/stems-logo.jpeg')} />
    );
  }

  return <Avatar.Image size={100} source={img} />;
}
