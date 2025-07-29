import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInRight, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { createCommonStyles, lightColors, darkColors, borderRadius, spacing, createShadows } from '../styles/commonStyles';
import { useTheme } from '../contexts/ThemeContext';
import Icon from './Icon';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

interface TransactionItemProps {
  transaction: Transaction;
  formatCurrency: (amount: number) => string;
  onPress?: () => void;
  index?: number;
}

export default function TransactionItem({ 
  transaction, 
  formatCurrency, 
  onPress,
  index = 0
}: TransactionItemProps) {
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
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: string } = {
      'Transport': 'car',
      'Shopping': 'bag',
      'Food': 'restaurant',
      'Salary': 'card',
      'Freelance': 'laptop',
      'Transfer': 'swap-horizontal',
      'Entertainment': 'game-controller',
      'Bills': 'receipt',
      'Health': 'medical',
      'Bonus': 'gift',
    };
    return iconMap[category] || 'ellipse';
  };

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'Transport': '#3B82F6',
      'Shopping': '#8B5CF6',
      'Food': '#F59E0B',
      'Salary': '#10B981',
      'Freelance': '#6366F1',
      'Transfer': '#06B6D4',
      'Entertainment': '#EC4899',
      'Bills': '#EF4444',
      'Health': '#84CC16',
      'Bonus': '#F97316',
    };
    return colorMap[category] || colors.primary;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
    });
  };

  const getAmountColor = () => {
    return transaction.type === 'income' ? colors.income : colors.expense;
  };

  const getAmountPrefix = () => {
    return transaction.type === 'income' ? '+' : '-';
  };

  // Format currency with better handling for long numbers
  const formatAmount = (amount: number) => {
    const formatted = formatCurrency(Math.abs(amount));
    // Remove "Rp" and spaces for cleaner display
    return formatted.replace(/Rp\s?/, '');
  };

  console.log(`TransactionItem rendered: ${transaction.title}, isDark: ${isDark}`);

  return (
    <Animated.View 
      entering={FadeInRight.delay(index * 50).springify()}
      style={animatedStyle}
    >
      <TouchableOpacity 
        style={[
          {
            backgroundColor: colors.card,
            borderRadius: borderRadius.md,
            padding: spacing.lg,
            marginVertical: spacing.xs,
            ...shadows.sm,
            borderWidth: 1,
            borderColor: colors.borderLight,
          }
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <View style={commonStyles.row}>
          <View style={[commonStyles.rowCenter, { flex: 1 }]}>
            <View style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: `${getCategoryColor(transaction.category)}15`,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: spacing.md,
            }}>
              <Icon 
                name={getCategoryIcon(transaction.category)} 
                size={20} 
                color={getCategoryColor(transaction.category)}
              />
            </View>
            
            <View style={{ flex: 1, marginRight: spacing.sm }}>
              <Text 
                style={[
                  commonStyles.textMedium, 
                  { 
                    marginBottom: 2,
                    fontSize: 15,
                  }
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {transaction.title}
              </Text>
              <View style={commonStyles.rowCenter}>
                <Text style={[
                  commonStyles.textSmall, 
                  { 
                    marginRight: spacing.sm,
                    color: getCategoryColor(transaction.category),
                    fontWeight: '500',
                  }
                ]}>
                  {transaction.category}
                </Text>
                <View style={{
                  width: 3,
                  height: 3,
                  borderRadius: 1.5,
                  backgroundColor: colors.textLight,
                  marginRight: spacing.sm,
                }} />
                <Text style={commonStyles.textSmall}>
                  {formatDate(transaction.date)}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={{ 
            alignItems: 'flex-end',
            justifyContent: 'center',
            minWidth: 80,
            maxWidth: 120,
          }}>
            <Text 
              style={[
                commonStyles.textMedium,
                {
                  fontWeight: '700',
                  color: getAmountColor(),
                  fontSize: 14,
                  letterSpacing: -0.2,
                  textAlign: 'right',
                }
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {getAmountPrefix()}Rp{formatAmount(transaction.amount)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}