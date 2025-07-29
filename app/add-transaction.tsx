import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import Icon from '../components/Icon';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import ThemeToggle from '../components/ThemeToggle';
import { createCommonStyles, lightColors, darkColors, createButtonStyles, spacing, borderRadius } from '../styles/commonStyles';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

export default function AddTransaction() {
  const { isDark } = useTheme();
  const colors = isDark ? darkColors : lightColors;
  const commonStyles = createCommonStyles(colors);
  const buttonStyles = createButtonStyles(colors);
  
  const { type } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [focusedInput, setFocusedInput] = useState('');

  const categories = type === 'income' 
    ? ['Salary', 'Freelance', 'Bonus', 'Investment', 'Other']
    : ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];

  const handleSave = () => {
    if (!title || !amount || !category) {
      Alert.alert('Error', 'Mohon lengkapi semua field yang diperlukan');
      return;
    }

    const numericAmount = parseFloat(amount.replace(/[^\d]/g, ''));
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Error', 'Mohon masukkan jumlah yang valid');
      return;
    }

    console.log('Saving transaction:', {
      title,
      amount: numericAmount,
      category,
      description,
      type
    });

    Alert.alert(
      'Berhasil',
      `Transaksi ${type === 'income' ? 'pemasukan' : 'pengeluaran'} berhasil ditambahkan`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const formatAmount = (text: string) => {
    const numericValue = text.replace(/[^\d]/g, '');
    if (!numericValue) return '';
    
    const number = parseInt(numericValue);
    return new Intl.NumberFormat('id-ID').format(number);
  };

  const handleAmountChange = (text: string) => {
    const formatted = formatAmount(text);
    setAmount(formatted);
  };

  const getInputStyle = (inputName: string) => {
    return [
      commonStyles.input,
      focusedInput === inputName && commonStyles.inputFocused
    ];
  };

  console.log('AddTransaction rendered, type:', type, 'isDark:', isDark);

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
          <Text style={commonStyles.subtitle}>
            Tambah {type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
          </Text>
          <ThemeToggle size={20} />
        </View>
      </Animated.View>

      <ScrollView 
        style={commonStyles.content}
        contentContainerStyle={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Amount Card */}
        <Animated.View 
          entering={FadeInUp.delay(100).springify()}
          style={[
            commonStyles.cardElevated,
            {
              backgroundColor: type === 'income' ? colors.income : colors.expense,
              marginBottom: spacing.xxl,
            }
          ]}
        >
          <Text style={[
            commonStyles.textSecondary,
            { 
              color: `${colors.backgroundAlt}90`,
              textAlign: 'center',
              marginBottom: spacing.sm,
            }
          ]}>
            Jumlah {type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
          </Text>
          <Text style={[
            commonStyles.title,
            {
              color: colors.backgroundAlt,
              textAlign: 'center',
              fontSize: 28,
              marginBottom: 0,
            }
          ]}>
            Rp {amount || '0'}
          </Text>
        </Animated.View>

        {/* Form Fields */}
        <Animated.View entering={FadeInUp.delay(200).springify()}>
          <Text style={[commonStyles.sectionTitle, { marginBottom: spacing.md }]}>
            Detail Transaksi
          </Text>

          {/* Title Input */}
          <View style={{ marginBottom: spacing.lg }}>
            <Text style={[commonStyles.textMedium, { marginBottom: spacing.sm }]}>
              Judul Transaksi *
            </Text>
            <TextInput
              style={getInputStyle('title')}
              value={title}
              onChangeText={setTitle}
              placeholder={`Masukkan judul ${type === 'income' ? 'pemasukan' : 'pengeluaran'}`}
              placeholderTextColor={colors.textLight}
              onFocus={() => setFocusedInput('title')}
              onBlur={() => setFocusedInput('')}
            />
          </View>

          {/* Amount Input */}
          <View style={{ marginBottom: spacing.lg }}>
            <Text style={[commonStyles.textMedium, { marginBottom: spacing.sm }]}>
              Jumlah (Rp) *
            </Text>
            <TextInput
              style={getInputStyle('amount')}
              value={amount}
              onChangeText={handleAmountChange}
              placeholder="0"
              placeholderTextColor={colors.textLight}
              keyboardType="numeric"
              onFocus={() => setFocusedInput('amount')}
              onBlur={() => setFocusedInput('')}
            />
          </View>

          {/* Category Selection */}
          <View style={{ marginBottom: spacing.lg }}>
            <Text style={[commonStyles.textMedium, { marginBottom: spacing.md }]}>
              Kategori *
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {categories.map((cat, index) => (
                <Animated.View
                  key={cat}
                  entering={FadeInUp.delay(300 + index * 50).springify()}
                >
                  <TouchableOpacity
                    style={[
                      commonStyles.badge,
                      {
                        backgroundColor: category === cat ? colors.primary : colors.surface,
                        borderWidth: 1,
                        borderColor: category === cat ? colors.primary : colors.border,
                        marginRight: spacing.sm,
                        marginBottom: spacing.sm,
                        paddingVertical: spacing.md,
                        paddingHorizontal: spacing.lg,
                        borderRadius: borderRadius.full,
                      }
                    ]}
                    onPress={() => setCategory(cat)}
                  >
                    <Text style={[
                      commonStyles.textSmall,
                      {
                        color: category === cat ? colors.backgroundAlt : colors.text,
                        fontWeight: '600',
                      }
                    ]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </View>

          {/* Description Input */}
          <View style={{ marginBottom: spacing.xxl }}>
            <Text style={[commonStyles.textMedium, { marginBottom: spacing.sm }]}>
              Deskripsi (Opsional)
            </Text>
            <TextInput
              style={[
                getInputStyle('description'),
                { 
                  height: 100,
                  textAlignVertical: 'top',
                  paddingTop: spacing.lg,
                }
              ]}
              value={description}
              onChangeText={setDescription}
              placeholder="Tambahkan catatan untuk transaksi ini..."
              placeholderTextColor={colors.textLight}
              multiline
              numberOfLines={4}
              onFocus={() => setFocusedInput('description')}
              onBlur={() => setFocusedInput('')}
            />
          </View>
        </Animated.View>

        {/* Save Button */}
        <Animated.View entering={FadeInUp.delay(400).springify()}>
          <Button
            text={`Simpan ${type === 'income' ? 'Pemasukan' : 'Pengeluaran'}`}
            onPress={handleSave}
            variant="primary"
            style={{ marginBottom: spacing.xl }}
          />
          <Button
            text="Batal"
            onPress={() => router.back()}
            variant="outline"
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}