import { useTheme } from '@/contexts/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

interface SearchInputProps extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ ...props }) => {
  const { colorScheme, setWeatherType } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colorScheme.card }]}>
      <TextInput
        placeholderTextColor={colorScheme.text.secondary}
        style={[styles.searchInput, { color: colorScheme.text.primary }]}
        cursorColor={colorScheme.accent}
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
