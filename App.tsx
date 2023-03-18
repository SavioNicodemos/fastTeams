import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Groups } from './src/screens/Groups';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Groups />
    </>
  );
}
