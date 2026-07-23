import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { usePostHog } from 'posthog-react-native';

const SignUp = () => {
  const posthog = usePostHog();

  // Never pass email or username as the distinct id — those are PII and change.
  const handleSignUpSuccess = (userId: string, email: string, name?: string) => {
    const created_at = new Date().toISOString();
    posthog.identify(userId, {
      $set: { email, ...(name ? { name } : {}) },
      $set_once: { created_at },
    });
    posthog.capture('user_signed_up', { created_at });
  };

  return (
    <View>
      <Text>SignUp</Text>
      <Link href="/(auth)/sign-in">Sign In</Link>
    </View>
  );
};

export default SignUp;