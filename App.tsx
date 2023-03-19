import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import theme from './src/theme';

import { Groups } from '@screens/Groups';
import { Loading } from '@components/Loading'

export default function App() {
  const [fontsloaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });


  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" translucent />
      { fontsloaded ? <Groups /> : <Loading />}
    </ThemeProvider>
  );
}
