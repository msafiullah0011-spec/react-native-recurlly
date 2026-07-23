import { Link, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { usePostHog } from 'posthog-react-native';

const SubscriptionDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const posthog = usePostHog();

  useFocusEffect(
    React.useCallback(() => {
      posthog.capture('subscription_viewed', { subscription_id: id });
    }, [id, posthog]),
  );

  return (
    <View>
      <Text>SubscriptionDetails</Text>
      <Text>ID: {id}</Text>
      <Link href="/">Go back</Link>
    </View>
  );
};

export default SubscriptionDetails;