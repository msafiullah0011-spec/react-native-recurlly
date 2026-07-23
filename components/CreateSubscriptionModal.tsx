import { SubscriptionIcon } from "@/components/subscription-icon";
import { resolveSubscriptionIcon } from "@/constants/subscription-icon";
import type { BillingCycle, Subscription } from "@/constants/subscriptions";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import { usePostHog } from "posthog-react-native";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FREQUENCIES: BillingCycle[] = ["Monthly", "Yearly"];

const CATEGORIES = [
  "Entertainment",
  "AI Tools",
  "Developer Tools",
  "Design",
  "Productivity",
  "Cloud",
  "Music",
  "Other",
] as const;

function toISODate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function calculateRenewalDate(startDate: Date, frequency: BillingCycle) {
  const renewal = new Date(startDate);
  if (frequency === "Monthly") {
    renewal.setMonth(renewal.getMonth() + 1);
  } else {
    renewal.setFullYear(renewal.getFullYear() + 1);
  }
  return renewal;
}

type CreateSubscriptionModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreate: (subscription: Subscription) => void;
};

export function CreateSubscriptionModal({
  visible,
  onClose,
  onCreate,
}: CreateSubscriptionModalProps) {
  const insets = useSafeAreaInsets();
  const posthog = usePostHog();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [frequency, setFrequency] = useState<BillingCycle>("Monthly");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Other");

  const priceValue = parseFloat(price);
  const isValid = name.trim().length > 0 && !Number.isNaN(priceValue) && priceValue > 0;
  const resolvedIcon = useMemo(
    () => resolveSubscriptionIcon(name, category),
    [name, category],
  );

  const resetForm = () => {
    setName("");
    setPrice("");
    setFrequency("Monthly");
    setCategory("Other");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    if (!isValid) return;

    const startDate = new Date();
    const renewalDate = calculateRenewalDate(startDate, frequency);

    const subscription: Subscription = {
      id: `sub-${Date.now()}`,
      name: name.trim(),
      icon: resolvedIcon.icon,
      color: resolvedIcon.color,
      price: priceValue,
      billingCycle: frequency,
      category,
      nextBillingDate: toISODate(renewalDate),
      startedOn: toISODate(startDate),
    };

    posthog.capture("subscription_created", {
      subscription_name: subscription.name,
      subscription_price: subscription.price,
      subscription_frequency: subscription.billingCycle,
      subscription_category: subscription.category,
    });

    onCreate(subscription);
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        className="modal-overlay"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Pressable style={{ flex: 1 }} onPress={handleClose} />

        <View className="modal-container" style={{ paddingBottom: insets.bottom }}>
          <View className="modal-header">
            <Text className="modal-title">New Subscription</Text>
            <Pressable className="modal-close" onPress={handleClose} hitSlop={8}>
              <Ionicons name="close" size={18} color="#081126" />
            </Pressable>
          </View>

          <ScrollView keyboardShouldPersistTaps="handled">
            <View className="modal-body">
              <View className="auth-field">
                <Text className="auth-label">Name</Text>
                <View className="flex-row items-center gap-3">
                  <SubscriptionIcon icon={resolvedIcon.icon} size={44} rounded />
                  <TextInput
                    className="auth-input flex-1"
                    placeholder="e.g. YouTube Premium"
                    placeholderTextColor="rgba(8,17,38,0.4)"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              <View className="auth-field">
                <Text className="auth-label">Price</Text>
                <TextInput
                  className="auth-input"
                  placeholder="0.00"
                  placeholderTextColor="rgba(8,17,38,0.4)"
                  keyboardType="decimal-pad"
                  value={price}
                  onChangeText={setPrice}
                />
              </View>

              <View className="auth-field">
                <Text className="auth-label">Frequency</Text>
                <View className="picker-row">
                  {FREQUENCIES.map((option) => {
                    const active = option === frequency;
                    return (
                      <Pressable
                        key={option}
                        className={clsx("picker-option", active && "picker-option-active")}
                        onPress={() => setFrequency(option)}
                      >
                        <Text
                          className={clsx(
                            "picker-option-text",
                            active && "picker-option-text-active",
                          )}
                        >
                          {option}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View className="auth-field">
                <Text className="auth-label">Category</Text>
                <View className="category-scroll">
                  {CATEGORIES.map((option) => {
                    const active = option === category;
                    return (
                      <Pressable
                        key={option}
                        className={clsx("category-chip", active && "category-chip-active")}
                        onPress={() => setCategory(option)}
                      >
                        <Text
                          className={clsx(
                            "category-chip-text",
                            active && "category-chip-text-active",
                          )}
                        >
                          {option}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <Pressable
                className={clsx("auth-button", !isValid && "auth-button-disabled")}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text className="auth-button-text">Add Subscription</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
