import { PremiumButton } from '@/components/ui/PremiumButton';
import { PremiumInput } from '@/components/ui/PremiumInput';
import { apiService } from '@/services/api.service';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const { login: loginUserContext } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tu correo y contraseña');
      return;
    }
    
    setLoading(true);

    try {
      const data = await apiService.loginUser({
        email,
        password,
      });

      // data contains { user, accessToken }
      // Aquí guardarías el accessToken de forma segura (ej. SecureStore)
      loginUserContext(data.user);

      Alert.alert('Éxito', '¡Has iniciado sesión correctamente!', [
        { text: 'OK', onPress: () => router.navigate('/(tabs)') }
      ]);
    } catch (error: any) {
      Alert.alert('Error al iniciar sesión', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Botón de volver */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => router.navigate('/(tabs)')} style={styles.backButton}>
            <Text style={styles.backText}>← Volver al Inicio</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Cabecera */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.headerContainer}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>¡Bienvenido de vuelta!</Text>
        </Animated.View>

        {/* Formulario */}
        <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.formContainer}>
          <PremiumInput
            label="Correo Electrónico"
            placeholder="correo@ejemplo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <PremiumInput
            label="Contraseña"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.buttonContainer}>
            <PremiumButton
              title="Entrar"
              onPress={handleLogin}
              loading={loading}
            />
          </View>
        </Animated.View>

        {/* Footer */}
        <Animated.View entering={FadeInDown.delay(600).springify()} style={styles.footerContainer}>
          <Text style={styles.footerText}>¿No tienes cuenta? </Text>
          <Text style={styles.linkText} onPress={() => router.push('/(auth)/register')}>
            Regístrate aquí
          </Text>
        </Animated.View>
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  backButtonContainer: {
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  backButton: {
    paddingVertical: 8,
    paddingRight: 16,
  },
  backText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
  },
  headerContainer: {
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
  formContainer: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    color: '#64748b',
    fontSize: 14,
  },
  linkText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: 'bold',
  },
});