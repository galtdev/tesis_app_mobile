import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { PremiumInput } from '@/components/ui/PremiumInput';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { apiService } from '@/services/api.service';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  // Form states para crear restaurante
  const [restaurantName, setRestaurantName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [password, setPassword] = useState(''); // Requerido por el backend para verificar

  const handleCreateRestaurant = async () => {
    if (!restaurantName || !taxId || !password) {
      Alert.alert('Error', 'Por favor llena todos los campos, incluyendo tu contraseña actual para verificar.');
      return;
    }

    setLoading(true);
    try {
      await apiService.registerTenant({
        email: user?.email,
        fullName: user?.fullName || 'Propietario',
        password,
        name: restaurantName,
        taxId,
      });

      Alert.alert('¡Éxito!', 'Restaurante creado correctamente.');
      // Limpiar form
      setRestaurantName('');
      setTaxId('');
      setPassword('');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo crear el restaurante');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro que deseas salir?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sí, Salir', style: 'destructive', onPress: logout },
    ]);
  };

  if (!user) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.subtitle}>No has iniciado sesión</Text>
        <PremiumButton title="Ir a Iniciar Sesión" onPress={() => router.replace('/(auth)/login')} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        {/* Cabecera del Perfil */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.headerContainer}>
          <Text style={styles.title}>Mi Perfil</Text>
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.fullName ? user.fullName[0].toUpperCase() : user.email[0].toUpperCase()}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.fullName || 'Usuario'}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
              <Text style={styles.profileRole}>Rol: {user.role || 'CLIENTE'}</Text>
            </View>
          </View>
          <PremiumButton title="Cerrar Sesión" onPress={handleLogout} />
        </Animated.View>

        <View style={styles.divider} />

        {/* Crear Restaurante */}
        <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Crear un Restaurante</Text>
          <Text style={styles.sectionSubtitle}>Registra tu negocio para empezar a vender.</Text>

          <PremiumInput
            label="Nombre del Restaurante"
            placeholder="Ej: Pizzería Luigi"
            value={restaurantName}
            onChangeText={setRestaurantName}
          />

          <PremiumInput
            label="RIF / Identificación Fiscal"
            placeholder="Ej: J-12345678-9"
            value={taxId}
            onChangeText={setTaxId}
          />

          <PremiumInput
            label="Confirma tu contraseña actual"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.buttonContainer}>
            <PremiumButton
              title="Crear Restaurante"
              onPress={handleCreateRestaurant}
              loading={loading}
            />
          </View>
        </Animated.View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc', // slate-50
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 24,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  profileEmail: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  profileRole: {
    fontSize: 12,
    color: '#3b82f6',
    marginTop: 4,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 16,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 16,
  },
});
