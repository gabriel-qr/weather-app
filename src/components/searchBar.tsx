import { useTheme } from '@/contexts/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

interface SearchInputProps extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChangeText, ...props }) => {
  const { colorScheme, setWeatherType } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colorScheme.card }]}>
      <TextInput
        value={value}
        placeholderTextColor={colorScheme.text.secondary}
        style={[styles.searchInput, { color: colorScheme.text.primary }]}
        cursorColor={colorScheme.gray[700]}
        onChangeText={onChangeText}
        {...props}
      />

      <Ionicons
        name='search-outline'
        size={18}
        color={colorScheme.text.secondary}
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 40,
    position: 'relative',
  },

  icon: {
    position: 'absolute',
    left: 20,
  },
});

export default SearchInput;
