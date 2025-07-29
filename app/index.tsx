import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { createCommonStyles, lightColors, darkColors, spacing } from '../styles/commonStyles';
import { useTheme } from '../contexts/ThemeContext';
import DashboardCard from '../components/DashboardCard';
import TransactionItem from '../components/TransactionItem';
import QuickActionButton from '../components/QuickActionButton';
import ThemeToggle from '../components/ThemeToggle';
import Icon from '../components/Icon';

// Mock data for demonstration
const mockTransactions = [
  {
    id: '1',
    title: 'Gojek - Transportasi',
    amount: -25000,
    category: 'Transport',
    date: '2024-01-15',
    type: 'expense'
  },
  {
    id: '2',
    title: 'Gaji Bulanan',
    amount: 8500000,
    category: 'Salary',
    date: '2024-01-01',
    type: 'income'
  },
  {
    id: '3',
    title: 'Indomaret - Belanja',
    amount: -150000,
    category: 'Shopping',
    date: '2024-01-14',
    type: 'expense'
  },
  {
    id: '4',
    title: 'Dana - Top Up',
    amount: -500000,
    category: 'Transfer',
    date: '2024-01-13',
    type: 'expense'
  },
];

export default function FinancialDashboard() {
  const { isDark } = useTheme();
  const colors = isDark ? darkColors : lightColors;
  const commonStyles = createCommonStyles(colors);
  
  const [balance, setBalance] = useState(12750000);
  const [monthlyIncome, setMonthlyIncome] = useState(8500000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(3250000);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  const budgetLimit = 5000000;
  const budgetUsed = (monthlyExpenses / budgetLimit) * 100;

  console.log('Dashboard rendered with balance:', balance, 'isDark:', isDark);

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView 
        style={commonStyles.content}
        contentContainerStyle={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.springify()}
          style={[commonStyles.row, { marginBottom: spacing.xxl }]}
        >
          <View>
            <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>
              {getGreeting()} 👋
            </Text>
            <Text style={commonStyles.title}>Keuangan Anda</Text>
          </View>
          <View style={commonStyles.rowCenter}>
            <ThemeToggle size={24} style={{ marginRight: spacing.sm }} />
            <Icon 
              name="notifications-outline" 
              size={24} 
              color={colors.text}
              backgroundColor={colors.surface}
              containerStyle={{ padding: spacing.sm }}
            />
          </View>
        </Animated.View>

        {/* Balance Card */}
        <DashboardCard
          title="Saldo Total"
          amount={balance}
          subtitle="Tersedia untuk digunakan"
          type="balance"
          index={0}
        />

        {/* Income & Expenses Row */}
        <View style={[commonStyles.row, { marginVertical: spacing.lg }]}>
          <View style={{ flex: 1, marginRight: spacing.sm }}>
            <DashboardCard
              title="Pemasukan"
              amount={monthlyIncome}
              subtitle="Bulan ini"
              type="income"
              compact
              index={1}
            />
          </View>
          <View style={{ flex: 1, marginLeft: spacing.sm }}>
            <DashboardCard
              title="Pengeluaran"
              amount={monthlyExpenses}
              subtitle="Bulan ini"
              type="expense"
              compact
              index={2}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <Animated.View 
          entering={FadeInUp.delay(300).springify()}
          style={commonStyles.section}
        >
          <Text style={commonStyles.sectionTitle}>Aksi Cepat</Text>
          <View style={[commonStyles.row, { flexWrap: 'wrap', justifyContent: 'space-between' }]}>
            <QuickActionButton
              icon="add-circle"
              title="Tambah Pemasukan"
              onPress={() => router.push('/add-transaction?type=income')}
              index={0}
            />
            <QuickActionButton
              icon="remove-circle"
              title="Tambah Pengeluaran"
              onPress={() => router.push('/add-transaction?type=expense')}
              index={1}
            />
            <QuickActionButton
              icon="swap-horizontal"
              title="Transfer"
              onPress={() => router.push('/transfer')}
              index={2}
            />
            <QuickActionButton
              icon="analytics"
              title="Laporan"
              onPress={() => router.push('/reports')}
              index={3}
            />
          </View>
        </Animated.View>

        {/* Recent Transactions */}
        <Animated.View 
          entering={FadeInUp.delay(400).springify()}
          style={commonStyles.section}
        >
          <View style={[commonStyles.row, { marginBottom: spacing.md }]}>
            <Text style={commonStyles.sectionTitle}>Transaksi Terbaru</Text>
            <Text 
              style={[
                commonStyles.textSecondary, 
                { 
                  textDecorationLine: 'underline',
                  fontWeight: '500',
                  color: colors.primary,
                }
              ]}
              onPress={() => router.push('/transactions')}
            >
              Lihat Semua
            </Text>
          </View>
          
          {mockTransactions.slice(0, 4).map((transaction, index) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              formatCurrency={formatCurrency}
              index={index}
            />
          ))}
        </Animated.View>

        {/* Budget Overview */}
        <Animated.View 
          entering={FadeInUp.delay(500).springify()}
          style={commonStyles.section}
        >
          <Text style={commonStyles.sectionTitle}>Ringkasan Anggaran</Text>
          <View style={commonStyles.cardElevated}>
            <View style={[commonStyles.row, { marginBottom: spacing.md }]}>
              <Text style={commonStyles.textMedium}>Anggaran Bulanan</Text>
              <Text style={[commonStyles.textMedium, { fontWeight: '700', color: colors.primary }]}>
                {formatCurrency(budgetLimit)}
              </Text>
            </View>
            
            <View style={[commonStyles.row, { marginBottom: spacing.sm }]}>
              <Text style={commonStyles.textSecondary}>Terpakai</Text>
              <Text style={[commonStyles.textSecondary, { fontWeight: '600' }]}>
                {formatCurrency(monthlyExpenses)}
              </Text>
            </View>
            
            <View style={{
              height: 8,
              backgroundColor: colors.surface,
              borderRadius: 4,
              marginTop: spacing.sm,
              overflow: 'hidden',
            }}>
              <Animated.View 
                entering={FadeInDown.delay(600).springify()}
                style={{
                  height: '100%',
                  width: `${Math.min(budgetUsed, 100)}%`,
                  backgroundColor: budgetUsed > 80 ? colors.error : budgetUsed > 60 ? colors.warning : colors.success,
                  borderRadius: 4,
                }}
              />
            </View>
            
            <Text style={[
              commonStyles.textSmall, 
              { 
                marginTop: spacing.sm, 
                textAlign: 'center',
                color: budgetUsed > 80 ? colors.error : colors.textSecondary,
                fontWeight: '500',
              }
            ]}>
              {budgetUsed.toFixed(1)}% dari anggaran terpakai
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}