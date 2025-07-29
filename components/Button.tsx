import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { createCommonStyles, lightColors, darkColors, borderRadius, spacing, createShadows, createButtonStyles } from '../styles/commonStyles';
import { useTheme } from '../contexts/ThemeContext';

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export default function Button({
  text,
  onPress,
  style,
  textStyle,
  variant = 'primary',
  size = 'medium',
  disabled = false
}: ButtonProps) {
  const { isDark } = useTheme();
  const colors = isDark ? darkColors : lightColors;
  const buttonStyles = createButtonStyles(colors);
  
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: disabled ? 0.6 : 1,
    };
  });

  const handlePressIn = () => {
    if (!disabled) {
      scale.value = withSpring(0.98);
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      scale.value = withSpring(1);
    }
  };

  const getButtonStyle = () => {
    let baseStyle = buttonStyles[variant];
    
    if (size === 'small') {
      baseStyle = { ...baseStyle, ...buttonStyles.small };
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    let color = colors.backgroundAlt;
    
    if (variant === 'outline') {
      color = colors.primary;
    } else if (variant === 'ghost') {
      color = colors.text;
    }
    
    return {
      fontSize: size === 'small' ? 14 : 16,
      fontWeight: '600' as const,
      color,
      fontFamily: 'OpenSans_600SemiBold',
    };
  };

  console.log(`Button rendered: ${text}, variant: ${variant}, isDark: ${isDark}`);

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[getButtonStyle(), style]}
        onPress={disabled ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        disabled={disabled}
      >
        <Text style={[getTextStyle(), textStyle]}>
          {text}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // Styles are now handled by the theme system
});