import { createCommonStyles, lightColors, darkColors, spacing, borderRadius } from '../styles/commonStyles';
import { useTheme } from '../contexts/ThemeContext';
import Icon from '../components/Icon';
import ThemeToggle from '../components/ThemeToggle';
import Animated, { FadeInDown, FadeInUp, FadeInLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';

export default function ReportsScreen() {
  const { isDark } = useTheme();
  const colors = isDark ? darkColors : lightColors;
  const commonStyles = createCommonStyles(colors);
  
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const screenWidth = Dimensions.get('window').width;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Mock data for charts
  const monthlyData = [
    { month: 'Jan', income: 8500000, expense: 3200000 },
    { month: 'Feb', income: 9200000, expense: 3800000 },
    { month: 'Mar', income: 8800000, expense: 3500000 },
    { month: 'Apr', income: 9500000, expense: 4200000 },
    { month: 'May', income: 8900000, expense: 3900000 },
    { month: 'Jun', income: 9800000, expense: 4500000 },
  ];

  const categoryExpenses = [
    { category: 'Food', amount: 1200000, color: '#F59E0B', percentage: 35 },
    { category: 'Transport', amount: 800000, color: '#3B82F6', percentage: 23 },
    { category: 'Shopping', amount: 600000, color: '#8B5CF6', percentage: 18 },
    { category: 'Bills', amount: 500000, color: '#EF4444', percentage: 15 },
    { category: 'Entertainment', amount: 300000, color: '#EC4899', percentage: 9 },
  ];

  const totalIncome = monthlyData.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = monthlyData.reduce((sum, item) => sum + item.expense, 0);
  const netIncome = totalIncome - totalExpense;

  console.log('ReportsScreen rendered, isDark:', isDark);

  return (
    <SafeAreaView style={commonStyles.container}>
      <Animated.View 
        entering={FadeInDown.springify()}
        style={commonStyles.header}
      >
        <View style={commonStyles.row}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={commonStyles.subtitle}>Laporan Keuangan</Text>
          <ThemeToggle size={20} />
        </View>
      </Animated.View>

      <ScrollView 
        style={commonStyles.content}
        contentContainerStyle={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Period Selector */}
        <Animated.View 
          entering={FadeInUp.delay(100).springify()}
          style={[commonStyles.rowCenter, { marginBottom: spacing.lg }]}
        >
          {[
            { key: 'week', label: 'Minggu' },
            { key: 'month', label: 'Bulan' },
            { key: 'year', label: 'Tahun' }
          ].map((period, index) => (
            <Animated.View
              key={period.key}
              entering={FadeInUp.delay(150 + index * 50).springify()}
            >
              <TouchableOpacity
                style={[
                  commonStyles.badge,
                  {
                    backgroundColor: selectedPeriod === period.key ? colors.primary : colors.surface,
                    borderWidth: 1,
                    borderColor: selectedPeriod === period.key ? colors.primary : colors.border,
                    marginRight: spacing.sm,
                    paddingVertical: spacing.sm,
                    paddingHorizontal: spacing.lg,
                    borderRadius: borderRadius.full,
                  }
                ]}
                onPress={() => setSelectedPeriod(period.key)}
              >
                <Text style={[
                  commonStyles.textSmall,
                  {
                    color: selectedPeriod === period.key ? colors.backgroundAlt : colors.text,
                    fontWeight: '600',
                  }
                ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Summary Cards */}
        <Animated.View 
          entering={FadeInUp.delay(200).springify()}
          style={[commonStyles.row, { marginBottom: spacing.lg }]}
        >
          <View style={[commonStyles.cardSmall, { flex: 1, marginRight: spacing.sm }]}>
            <Text style={[commonStyles.textSecondary, { marginBottom: spacing.xs }]}>
              Total Pemasukan
            </Text>
            <Text style={[commonStyles.textMedium, { fontWeight: '700', color: colors.income, fontSize: 16 }]}>
              {formatCurrency(totalIncome)}
            </Text>
          </View>
          <View style={[commonStyles.cardSmall, { flex: 1, marginLeft: spacing.sm }]}>
            <Text style={[commonStyles.textSecondary, { marginBottom: spacing.xs }]}>
              Total Pengeluaran
            </Text>
            <Text style={[commonStyles.textMedium, { fontWeight: '700', color: colors.expense, fontSize: 16 }]}>
              {formatCurrency(totalExpense)}
            </Text>
          </View>
        </Animated.View>

        {/* Net Income Card */}
        <Animated.View 
          entering={FadeInUp.delay(250).springify()}
          style={[
            commonStyles.cardElevated,
            {
              backgroundColor: netIncome >= 0 ? colors.income : colors.expense,
              marginBottom: spacing.lg,
            }
          ]}
        >
          <View style={[commonStyles.row, { marginBottom: spacing.sm }]}>
            <Text style={[
              commonStyles.textSecondary,
              { color: `${colors.backgroundAlt}90` }
            ]}>
              Pendapatan Bersih
            </Text>
            <Icon
              name={netIncome >= 0 ? 'trending-up' : 'trending-down'}
              size={20}
              color={colors.backgroundAlt}
            />
          </View>
          <Text style={[
            commonStyles.title,
            {
              color: colors.backgroundAlt,
              fontSize: 24,
              marginBottom: 0,
            }
          ]}>
            {formatCurrency(netIncome)}
          </Text>
        </Animated.View>

        {/* Monthly Trend Chart */}
        <Animated.View 
          entering={FadeInUp.delay(300).springify()}
          style={commonStyles.section}
        >
          <Text style={commonStyles.sectionTitle}>Tren Bulanan</Text>
          <View style={commonStyles.cardElevated}>
            <View style={{
              height: 200,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
              <View style={[
                commonStyles.rowCenter,
                { 
                  height: 150,
                  alignItems: 'flex-end',
                  paddingHorizontal: spacing.md,
                }
              ]}>
                {monthlyData.map((item, index) => {
                  const maxAmount = Math.max(...monthlyData.map(d => Math.max(d.income, d.expense)));
                  const incomeHeight = (item.income / maxAmount) * 120;
                  const expenseHeight = (item.expense / maxAmount) * 120;
                  
                  return (
                    <Animated.View
                      key={item.month}
                      entering={FadeInUp.delay(400 + index * 100).springify()}
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        marginHorizontal: 2,
                      }}
                    >
                      <View style={[
                        commonStyles.rowCenter,
                        { alignItems: 'flex-end', height: 120 }
                      ]}>
                        <View style={{
                          width: 12,
                          height: incomeHeight,
                          backgroundColor: colors.income,
                          borderRadius: 6,
                          marginRight: 2,
                        }} />
                        <View style={{
                          width: 12,
                          height: expenseHeight,
                          backgroundColor: colors.expense,
                          borderRadius: 6,
                        }} />
                      </View>
                      <Text style={[
                        commonStyles.textSmall,
                        { marginTop: spacing.sm, textAlign: 'center' }
                      ]}>
                        {item.month}
                      </Text>
                    </Animated.View>
                  );
                })}
              </View>
              
              {/* Legend */}
              <View style={[
                commonStyles.rowCenter,
                { marginTop: spacing.lg, justifyContent: 'center' }
              ]}>
                <View style={commonStyles.rowCenter}>
                  <View style={{
                    width: 12,
                    height: 12,
                    backgroundColor: colors.income,
                    borderRadius: 6,
                    marginRight: spacing.xs,
                  }} />
                  <Text style={[commonStyles.textSmall, { marginRight: spacing.lg }]}>
                    Pemasukan
                  </Text>
                </View>
                <View style={commonStyles.rowCenter}>
                  <View style={{
                    width: 12,
                    height: 12,
                    backgroundColor: colors.expense,
                    borderRadius: 6,
                    marginRight: spacing.xs,
                  }} />
                  <Text style={commonStyles.textSmall}>
                    Pengeluaran
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Category Breakdown */}
        <Animated.View 
          entering={FadeInUp.delay(500).springify()}
          style={commonStyles.section}
        >
          <Text style={commonStyles.sectionTitle}>Pengeluaran per Kategori</Text>
          <View style={commonStyles.cardElevated}>
            {categoryExpenses.map((item, index) => (
              <Animated.View
                key={item.category}
                entering={FadeInLeft.delay(600 + index * 100).springify()}
                style={[
                  commonStyles.row,
                  { 
                    marginBottom: index === categoryExpenses.length - 1 ? 0 : spacing.lg,
                    alignItems: 'center',
                  }
                ]}
              >
                <View style={commonStyles.rowCenter}>
                  <View style={{
                    width: 12,
                    height: 12,
                    backgroundColor: item.color,
                    borderRadius: 6,
                    marginRight: spacing.md,
                  }} />
                  <View>
                    <Text style={commonStyles.textMedium}>
                      {item.category}
                    </Text>
                    <Text style={commonStyles.textSmall}>
                      {item.percentage}% dari total
                    </Text>
                  </View>
                </View>
                <Text style={[
                  commonStyles.textMedium,
                  { fontWeight: '700', color: colors.text }
                ]}>
                  {formatCurrency(item.amount)}
                </Text>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Insights */}
        <Animated.View 
          entering={FadeInUp.delay(700).springify()}
          style={commonStyles.section}
        >
          <Text style={commonStyles.sectionTitle}>Wawasan Keuangan</Text>
          <View style={commonStyles.cardElevated}>
            <View style={[commonStyles.rowCenter, { marginBottom: spacing.md }]}>
              <Icon
                name="bulb"
                size={20}
                color={colors.warning}
                backgroundColor={`${colors.warning}15`}
                containerStyle={{ 
                  padding: spacing.sm,
                  borderRadius: borderRadius.sm,
                  marginRight: spacing.md,
                }}
              />
              <Text style={[commonStyles.textMedium, { flex: 1 }]}>
                Tips Keuangan
              </Text>
            </View>
            
            <Text style={[commonStyles.textSecondary, { lineHeight: 20 }]}>
              • Pengeluaran terbesar Anda adalah kategori Food (35%)
            </Text>
            <Text style={[commonStyles.textSecondary, { lineHeight: 20, marginTop: spacing.xs }]}>
              • Pendapatan bersih Anda meningkat 12% dari bulan lalu
            </Text>
            <Text style={[commonStyles.textSecondary, { lineHeight: 20, marginTop: spacing.xs }]}>
              • Pertimbangkan untuk mengurangi pengeluaran transport
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}