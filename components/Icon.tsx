import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/commonStyles';

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  style?: object;
  backgroundColor?: string;
  containerStyle?: object;
}

export default function Icon({ 
  name, 
  size = 24, 
  color = colors.text, 
  style, 
  backgroundColor,
  containerStyle 
}: IconProps) {
  const iconContainerStyle = [
    styles.iconContainer,
    backgroundColor && { backgroundColor, borderRadius: size / 2 + 4, padding: 4 },
    containerStyle
  ];

  return (
    <View style={iconContainerStyle}>
      <Ionicons name={name} size={size} color={color} style={style} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});