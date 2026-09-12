import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the main tabs (Home) by default
  return <Redirect href="/(tabs)" />;
}
