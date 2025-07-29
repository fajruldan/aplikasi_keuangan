import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { createCommonStyles, lightColors, darkColors, spacing, borderRadius } from '../styles/commonStyles';
import { useTheme } from '../contexts/ThemeContext';
import TransactionItem from '../components/TransactionItem';
import ThemeToggle from '../components/ThemeToggle';
import Icon from '../components/Icon';

// Extended mock data
const allTransactions = [
  {
    id: '1',
    title: 'Gojek - Transportasi',
    amount: -25000,
    category: 'Transport',
    date: '2024-01-15',
    type: 'expense' as const
  },
  {
    id: '2',
    title: 'Gaji Bulanan',
    amount: 8500000,
    category: 'Salary',
    date: '2024-01-01',
    type: 'income' as const
  },
  {
    id: '3',
    title: 'Indomaret - Belanja',
    amount: -150000,
    category: 'Shopping',
    date: '2024-01-14',
    type: 'expense' as const
  },
  {
    id: '4',
    title: 'Dana - Top Up',
    amount: -500000,
    category: 'Transfer',
    date: '2024-01-13',
    type: 'expense' as const
  },
  {
    id: '5',
    title: 'Freelance Project',
    amount: 2500000,
    category: 'Freelance',
    date: '2024-01-12',
    type: 'income' as const
  },
  {
    id: '6',
    title: 'Warteg Bahari',
    amount: -35000,
    category: 'Food',
    date: '2024-01-12',
    type: 'expense' as const
  },
  {
    id: '7',
    title: 'Listrik PLN',
    amount: -450000,
    category: 'Bills',
    date: '2024-01-10',
    type: 'expense' as const
  },
  {
    id: '8',
    title: 'Bonus Kinerja',
    amount: 1000000,
    category: 'Bonus',
    date: '2024-01-08',
    type: 'income' as const
  },
];

export default function TransactionsScreen() {
  const { isDark } = useTheme();
  const colors = isDark ? darkColors : lightColors;
  const commonStyles = createCommonStyles(colors);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesSearch = transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    return matchesSearch && transaction.type === selectedFilter;
  });

  const totalIncome = allTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = allTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  console.log('TransactionsScreen rendered with', filteredTransactions.length, 'transactions, isDark:', isDark);

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
          <Text style={commonStyles.subtitle}>Semua Transaksi</Text>
          <View style={commonStyles.rowCenter}>
            <ThemeToggle size={20} style={{ marginRight: spacing.sm }} />
            <TouchableOpacity onPress={() => router.push('/add-transaction?type=expense')}>
              <Icon 
                name="add" 
                size={24} 
                color={colors.backgroundAlt}
                backgroundColor={colors.primary}
                containerStyle={{ padding: spacing.xs }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <View style={commonStyles.content}>
        {/* Summary Cards */}
        <Animated.View 
          entering={FadeInUp.delay(100).springify()}
          style={[commonStyles.row, { marginBottom: spacing.lg }]}
        >
          <View style={[commonStyles.cardSmall, { flex: 1, marginRight: spacing.sm }]}>
            <Text style={[commonStyles.textSecondary, { marginBottom: spacing.xs }]}>
              Total Pemasukan
            </Text>
            <Text style={[commonStyles.textMedium, { fontWeight: '700', color: colors.income, fontSize: 18 }]}>
              {formatCurrency(totalIncome)}
            </Text>
          </View>
          <View style={[commonStyles.cardSmall, { flex: 1, marginLeft: spacing.sm }]}>
            <Text style={[commonStyles.textSecondary, { marginBottom: spacing.xs }]}>
              Total Pengeluaran
            </Text>
            <Text style={[commonStyles.textMedium, { fontWeight: '700', color: colors.expense, fontSize: 18 }]}>
              {formatCurrency(totalExpenses)}
            </Text>
          </View>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View 
          entering={FadeInUp.delay(200).springify()}
          style={[
            commonStyles.input, 
            commonStyles.rowCenter, 
            { marginBottom: spacing.lg, backgroundColor: colors.surface }
          ]}
        >
          <Icon name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={{ 
              flex: 1, 
              fontSize: 16, 
              color: colors.text, 
              marginLeft: spacing.md,
              fontFamily: 'OpenSans_400Regular',
            }}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Cari transaksi..."
            placeholderTextColor={colors.textLight}
          />
        </Animated.View>

        {/* Filter Buttons */}
        <Animated.View 
          entering={FadeInUp.delay(300).springify()}
          style={[commonStyles.rowCenter, { marginBottom: spacing.lg }]}
        >
          {[
            { key: 'all', label: 'Semua' },
            { key: 'income', label: 'Pemasukan' },
            { key: 'expense', label: 'Pengeluaran' }
          ].map((filter, index) => (
            <Animated.View
              key={filter.key}
              entering={FadeInUp.delay(350 + index * 50).springify()}
            >
              <TouchableOpacity
                style={[
                  commonStyles.badge,
                  {
                    backgroundColor: selectedFilter === filter.key ? colors.primary : colors.surface,
                    borderWidth: 1,
                    borderColor: selectedFilter === filter.key ? colors.primary : colors.border,
                    marginRight: spacing.sm,
                    paddingVertical: spacing.sm,
                    paddingHorizontal: spacing.lg,
                    borderRadius: borderRadius.full,
                  }
                ]}
                onPress={() => setSelectedFilter(filter.key)}
              >
                <Text style={[
                  commonStyles.textSmall,
                  {
                    color: selectedFilter === filter.key ? colors.backgroundAlt : colors.text,
                    fontWeight: '600',
                  }
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Transactions List */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={commonStyles.scrollContent}
        >
          {filteredTransactions.length === 0 ? (
            <Animated.View 
              entering={FadeInUp.delay(400).springify()}
              style={[commonStyles.centerContent, { marginTop: spacing.xxxl }]}
            >
              <Icon 
                name="document-text" 
                size={64} 
                color={colors.textLight}
                containerStyle={{ marginBottom: spacing.lg }}
              />
              <Text style={[commonStyles.text, { textAlign: 'center', color: colors.textSecondary }]}>
                {searchQuery ? 'Tidak ada transaksi yang cocok dengan pencarian' : 'Belum ada transaksi'}
              </Text>
              <Text style={[commonStyles.textSmall, { textAlign: 'center', marginTop: spacing.sm }]}>
                {!searchQuery && 'Mulai tambahkan transaksi pertama Anda'}
              </Text>
            </Animated.View>
          ) : (
            filteredTransactions.map((transaction, index) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                formatCurrency={formatCurrency}
                onPress={() => console.log('Transaction pressed:', transaction.id)}
                index={index}
              />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}