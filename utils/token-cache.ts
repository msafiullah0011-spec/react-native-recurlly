import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

async function getToken(key: string) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch {
    return null;
  }
}

async function saveToken(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch {
    // Non-fatal: Clerk will simply re-authenticate next launch if this fails.
  }
}

export const tokenCache =
  Platform.OS === "web"
    ? undefined
    : {
        getToken,
        saveToken,
      };
