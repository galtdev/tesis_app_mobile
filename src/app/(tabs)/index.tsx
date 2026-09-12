import { PremiumButton } from '@/components/ui/PremiumButton';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Panel Principal</Text>
        <Text style={styles.subtitle}>¿Qué deseas hacer hoy?</Text>
      </View>

      <View style={styles.actions}>
        <PremiumButton
          title="Ver Usuarios Registrados"
          onPress={() => router.push('/users')}
        />
        <View style={styles.spacing} />
        <PremiumButton
          title="Registrar Nuevo Usuario"
          onPress={() => router.push('/(auth)/register')}

        />
        <View style={styles.spacing} />
        <PremiumButton
          title="Iniciar Sesión"
          onPress={() => router.push('/(auth)/login')}

        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  actions: {
    flex: 1,
    justifyContent: 'center',
  },
  spacing: {
    height: 16,
  }

});
