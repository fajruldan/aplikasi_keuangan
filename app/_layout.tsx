import { Platform, SafeAreaView } from 'react-native';
import { Stack, useGlobalSearchParams } from 'expo-router';
import { setupErrorLogging } from '../utils/errorLogger';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts, OpenSans_400Regular, OpenSans_600SemiBold, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { createCommonStyles, lightColors, darkColors } from '../styles/commonStyles';

const STORAGE_KEY = 'natively-error-logging';

function RootLayoutContent() {
  const [errorLoggingEnabled, setErrorLoggingEnabled] = useState(false);
  const params = useGlobalSearchParams();
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();

  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });

  useEffect(() => {
    const enableErrorLogging = params.enableErrorLogging === 'true';
    if (enableErrorLogging) {
      setupErrorLogging();
      setErrorLoggingEnabled(true);
    }
  }, [params.enableErrorLogging]);

  if (!fontsLoaded) {
    return null;
  }

  const colors = isDark ? darkColors : lightColors;
  const commonStyles = createCommonStyles(colors);

  console.log('RootLayoutContent rendered, isDark:', isDark);

  return (
    <SafeAreaView style={[commonStyles.wrapper, { paddingTop: Platform.OS === 'android' ? insets.top : 0 }]}>
      <StatusBar style={isDark ? "light" : "dark"} backgroundColor={colors.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootLayoutContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}