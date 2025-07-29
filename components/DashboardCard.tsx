import Animated, { FadeInUp, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Icon from './Icon';
import { createCommonStyles, lightColors, darkColors, createShadows, borderRadius, spacing } from '../styles/commonStyles';
import { useTheme } from '../contexts/ThemeContext';
import { View, Text } from 'react-native';
import { useEffect } from 'react';

interface DashboardCardProps {
  title: string;
  amount: number;
  subtitle: string;
  type: 'balance' | 'income' | 'expense';
  compact?: boolean;
  index?: number;
}

export default function DashboardCard({
  title,
  amount,
  subtitle,
  type,
  compact = false,
  index = 0
}: DashboardCardProps) {
  const { isDark } = useTheme();
  const colors = isDark ? darkColors : lightColors;
  const commonStyles = createCommonStyles(colors);
  const shadows = createShadows(colors);
  
  const scale = useSharedValue(0.95);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    scale.value = withSpring(1, { delay: index * 100 });
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCardStyle = () => {
    const baseStyle = {
      backgroundColor: colors.card,
      borderRadius: compact ? borderRadius.md : borderRadius.lg,
      padding: compact ? spacing.lg : spacing.xl,
      marginVertical: spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadows.md,
    };

    if (type === 'balance') {
      return {
        ...baseStyle,
        backgroundColor: colors.primary,
        borderColor: colors.primary,
      };
    }

    return baseStyle;
  };

  const getTextColor = () => {
    return type === 'balance' ? colors.backgroundAlt : colors.text;
  };

  const getSubtitleColor = () => {
    return type === 'balance' ? `${colors.backgroundAlt}90` : colors.textSecondary;
  };

  const getIcon = () => {
    switch (type) {
      case 'balance':
        return 'wallet';
      case 'income':
        return 'trending-up';
      case 'expense':
        return 'trending-down';
      default:
        return 'wallet';
    }
  };

  const getAmountColor = () => {
    if (type === 'balance') return colors.backgroundAlt;
    if (type === 'income') return colors.income;
    if (type === 'expense') return colors.expense;
    return colors.text;
  };

  const getIconColor = () => {
    if (type === 'balance') return colors.backgroundAlt;
    if (type === 'income') return colors.income;
    if (type === 'expense') return colors.expense;
    return colors.primary;
  };

  console.log(`DashboardCard rendered: ${title}, type: ${type}, isDark: ${isDark}`);

  return (
    <Animated.View 
      entering={FadeInUp.delay(index * 100).springify()}
      style={animatedStyle}
    >
      <View style={getCardStyle()}>
        <View style={[commonStyles.row, { marginBottom: compact ? spacing.sm : spacing.md }]}>
          <View>
            <Text style={[
              commonStyles.textSecondary,
              {
                color: getSubtitleColor(),
                fontSize: compact ? 12 : 14,
                marginBottom: spacing.xs,
              }
            ]}>
              {title}
            </Text>
            <Text style={[
              commonStyles.title,
              {
                color: getAmountColor(),
                fontSize: compact ? 18 : 24,
                fontWeight: '800',
                marginBottom: 0,
                letterSpacing: -0.5,
              }
            ]}>
              {formatCurrency(amount)}
            </Text>
          </View>
          <Icon
            name={getIcon()}
            size={compact ? 20 : 24}
            color={getIconColor()}
            backgroundColor={type === 'balance' ? `${colors.backgroundAlt}20` : `${getIconColor()}15`}
            containerStyle={{ 
              padding: compact ? spacing.sm : spacing.md,
              borderRadius: compact ? 8 : 12,
            }}
          />
        </View>
        
        <Text style={[
          commonStyles.textSmall,
          {
            color: getSubtitleColor(),
            fontSize: compact ? 11 : 12,
            fontWeight: '500',
          }
        ]}>
          {subtitle}
        </Text>
      </View>
    </Animated.View>
  );
}