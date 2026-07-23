import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { usePostHog } from 'posthog-react-native';

const SignIn = () => {
  const posthog = usePostHog();

  // Never pass email or username as the distinct id — those are PII and change.
  const handleSignInSuccess = (userId: string, email: string, name?: string) => {
    posthog.identify(userId, {
      $set: { email, ...(name ? { name } : {}) },
    });
    posthog.capture('user_signed_in');
  };

  return (
    <View>
      <Text>SignIn</Text>
      <Link href="/(auth)/sign-up"> Create Account</Link>
    </View>
  );
};

export default SignIn;