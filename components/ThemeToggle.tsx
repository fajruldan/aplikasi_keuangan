import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../contexts/ThemeContext';
import Icon from './Icon';
import { spacing } from '../styles/commonStyles';

interface ThemeToggleProps {
  size?: number;
  style?: any;
}

export default function ThemeToggle({ size = 24, style }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    scale.value = withSpring(0.9, {}, () => {
      scale.value = withSpring(1);
    });
    toggleTheme();
  };

  console.log('ThemeToggle rendered, isDark:', isDark);

  return (
    <Animated.View style={[animatedStyle, style]}>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          padding: spacing.sm,
          borderRadius: spacing.md,
        }}
        activeOpacity={0.7}
      >
        <Icon
          name={isDark ? 'sunny' : 'moon'}
          size={size}
          color={isDark ? '#FBBF24' : '#6366F1'}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}