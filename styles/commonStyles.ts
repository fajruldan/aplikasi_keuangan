import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const lightColors = {
  primary: '#6366F1',        // Modern indigo
  primaryLight: '#8B5CF6',   // Light purple
  primaryDark: '#4F46E5',    // Dark indigo
  secondary: '#10B981',      // Emerald green
  accent: '#F59E0B',         // Amber
  background: '#F8FAFC',     // Very light blue-gray
  backgroundAlt: '#FFFFFF',  // Pure white
  surface: '#F1F5F9',        // Light blue-gray
  text: '#1E293B',           // Dark slate
  textSecondary: '#64748B',  // Medium slate
  textLight: '#94A3B8',      // Light slate
  success: '#10B981',        // Emerald
  warning: '#F59E0B',        // Amber
  error: '#EF4444',          // Red
  card: '#FFFFFF',           // White
  border: '#E2E8F0',         // Light border
  borderLight: '#F1F5F9',    // Very light border
  shadow: 'rgba(15, 23, 42, 0.08)',
  shadowDark: 'rgba(15, 23, 42, 0.15)',
  overlay: 'rgba(15, 23, 42, 0.4)',
  income: '#10B981',         // Emerald for income
  expense: '#EF4444',        // Red for expense
};

export const darkColors = {
  primary: '#8B5CF6',        // Light purple for dark mode
  primaryLight: '#A78BFA',   // Lighter purple
  primaryDark: '#7C3AED',    // Darker purple
  secondary: '#34D399',      // Light emerald
  accent: '#FBBF24',         // Light amber
  background: '#0F172A',     // Very dark slate
  backgroundAlt: '#1E293B',  // Dark slate
  surface: '#334155',        // Medium slate
  text: '#F1F5F9',           // Very light slate
  textSecondary: '#94A3B8',  // Medium light slate
  textLight: '#64748B',      // Medium slate
  success: '#34D399',        // Light emerald
  warning: '#FBBF24',        // Light amber
  error: '#F87171',          // Light red
  card: '#1E293B',           // Dark slate
  border: '#334155',         // Medium slate border
  borderLight: '#475569',    // Lighter slate border
  shadow: 'rgba(0, 0, 0, 0.3)',
  shadowDark: 'rgba(0, 0, 0, 0.5)',
  overlay: 'rgba(0, 0, 0, 0.6)',
  income: '#34D399',         // Light emerald for income
  expense: '#F87171',        // Light red for expense
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const createShadows = (colors: typeof lightColors) => ({
  sm: {
    boxShadow: `0px 1px 3px ${colors.shadow}`,
    elevation: 2,
  },
  md: {
    boxShadow: `0px 4px 12px ${colors.shadow}`,
    elevation: 4,
  },
  lg: {
    boxShadow: `0px 8px 24px ${colors.shadowDark}`,
    elevation: 8,
  },
});

export const createButtonStyles = (colors: typeof lightColors) => StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    ...createShadows(colors).md,
  },
  secondary: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    ...createShadows(colors).md,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghost: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.sm,
  },
});

export const createCommonStyles = (colors: typeof lightColors) => {
  const shadows = createShadows(colors);
  
  return StyleSheet.create({
    wrapper: {
      backgroundColor: colors.background,
      width: '100%',
      height: '100%',
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
      width: '100%',
      height: '100%',
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.xl,
    },
    scrollContent: {
      paddingBottom: 100,
    },
    title: {
      fontSize: 32,
      fontWeight: '800',
      color: colors.text,
      marginBottom: spacing.sm,
      fontFamily: 'OpenSans_700Bold',
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      marginBottom: spacing.lg,
      fontFamily: 'OpenSans_700Bold',
      letterSpacing: -0.3,
    },
    heading: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.md,
      fontFamily: 'OpenSans_600SemiBold',
    },
    text: {
      fontSize: 16,
      fontWeight: '400',
      color: colors.text,
      lineHeight: 24,
      fontFamily: 'OpenSans_400Regular',
    },
    textMedium: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
      lineHeight: 24,
      fontFamily: 'OpenSans_600SemiBold',
    },
    textSecondary: {
      fontSize: 14,
      fontWeight: '400',
      color: colors.textSecondary,
      lineHeight: 20,
      fontFamily: 'OpenSans_400Regular',
    },
    textLight: {
      fontSize: 14,
      fontWeight: '400',
      color: colors.textLight,
      lineHeight: 20,
      fontFamily: 'OpenSans_400Regular',
    },
    textSmall: {
      fontSize: 12,
      fontWeight: '400',
      color: colors.textSecondary,
      lineHeight: 16,
      fontFamily: 'OpenSans_400Regular',
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: borderRadius.lg,
      padding: spacing.xl,
      marginVertical: spacing.sm,
      ...shadows.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardSmall: {
      backgroundColor: colors.card,
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      marginVertical: spacing.xs,
      ...shadows.sm,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    cardElevated: {
      backgroundColor: colors.card,
      borderRadius: borderRadius.xl,
      padding: spacing.xxl,
      marginVertical: spacing.md,
      ...shadows.lg,
      borderWidth: 0,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowStart: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    centerContent: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      paddingVertical: spacing.xl,
      paddingHorizontal: spacing.xl,
      backgroundColor: colors.backgroundAlt,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      ...shadows.sm,
    },
    section: {
      marginVertical: spacing.lg,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.md,
      fontFamily: 'OpenSans_600SemiBold',
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.lg,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.backgroundAlt,
      fontFamily: 'OpenSans_400Regular',
      ...shadows.sm,
    },
    inputFocused: {
      borderColor: colors.primary,
      borderWidth: 2,
      ...shadows.md,
    },
    badge: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.full,
      alignSelf: 'flex-start',
    },
    badgeSuccess: {
      backgroundColor: colors.success,
    },
    badgeWarning: {
      backgroundColor: colors.warning,
    },
    badgeError: {
      backgroundColor: colors.error,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.backgroundAlt,
      fontFamily: 'OpenSans_600SemiBold',
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: spacing.lg,
    },
    gradient: {
      borderRadius: borderRadius.lg,
      padding: spacing.xl,
      marginVertical: spacing.sm,
    },
  });
};

// Legacy exports for backward compatibility
export const colors = lightColors;
export const shadows = createShadows(lightColors);
export const buttonStyles = createButtonStyles(lightColors);
export const commonStyles = createCommonStyles(lightColors);