import Animated, { FadeInUp, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { createCommonStyles, lightColors, darkColors, borderRadius, spacing, createShadows } from '../styles/commonStyles';
import { useTheme } from '../contexts/ThemeContext';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from './Icon';

interface QuickActionButtonProps {
  icon: string;
  title: string;
  onPress: () => void;
  index?: number;
}

export default function QuickActionButton({
  icon,
  title,
  onPress,
  index = 0
}: QuickActionButtonProps) {
  const { isDark } = useTheme();
  const colors = isDark ? darkColors : lightColors;
  const commonStyles = createCommonStyles(colors);
  const shadows = createShadows(colors);
  
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  console.log(`QuickActionButton rendered: ${title}, isDark: ${isDark}`);

  return (
    <Animated.View 
      entering={FadeInUp.delay(index * 100).springify()}
      style={[
        animatedStyle,
        {
          width: '48%',
          marginBottom: spacing.md,
        }
      ]}
    >
      <TouchableOpacity
        style={[
          {
            backgroundColor: colors.card,
            borderRadius: borderRadius.md,
            padding: spacing.lg,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.border,
            ...shadows.sm,
            minHeight: 80,
          }
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Icon
          name={icon}
          size={24}
          color={colors.primary}
          backgroundColor={`${colors.primary}15`}
          containerStyle={{
            padding: spacing.sm,
            borderRadius: borderRadius.sm,
            marginBottom: spacing.sm,
          }}
        />
        <Text style={[
          commonStyles.textSmall,
          {
            textAlign: 'center',
            fontWeight: '600',
            lineHeight: 16,
          }
        ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}