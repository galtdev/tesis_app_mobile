import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  phone?: string;
  createdAt: string;
}

interface UserCardProps {
  user: User;
  index: number;
  isMe?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({ user, index, isMe }) => {
  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100).springify()}
      style={styles.card}
    >
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.fullName.charAt(0).toUpperCase()}</Text>
          {isMe && <View style={styles.activeDot} />}
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>
            {user.fullName} {isMe && <Text style={styles.meText}>(Tú)</Text>}
          </Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
        <View style={[styles.badge, user.role === 'ADMIN' ? styles.badgeAdmin : styles.badgeClient]}>
          <Text style={styles.badgeText}>{user.role}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eff6ff', // blue-50
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b82f6', // blue-500
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#64748b',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeAdmin: {
    backgroundColor: '#fef2f2', // red-50
  },
  badgeClient: {
    backgroundColor: '#f0fdf4', // green-50
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  activeDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22c55e', // green-500
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  meText: {
    color: '#22c55e',
    fontSize: 14,
    fontWeight: 'normal',
  }
});
