import React from 'react'
import { Text, View } from 'react-native'
import { usePostHog } from 'posthog-react-native'

const Settings = () => {
  const posthog = usePostHog();

  const handleSignOut = () => {
    posthog.capture('user_signed_out');
    posthog.reset();
  };

  return (
    <View>
      <Text>Settings</Text>
    </View>
  )
}

export default Settings