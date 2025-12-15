import { useTheme } from '@/contexts/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface SearchInputProps extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, value, onChangeText, ...props }) => {
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

      <TouchableOpacity
        style={[
          styles.iconContainer,
          { backgroundColor: colorScheme.cardDark, borderColor: colorScheme.text.tertiary },
        ]}
        activeOpacity={0.7}
        onPress={onSearch}
      >
        <Ionicons name='search-outline' size={20} color={colorScheme.text.secondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 25,
    gap: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 20,
  },

  iconContainer: {
    alignSelf: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 25,
    borderWidth: 0.5,
  },
});

export default SearchInput;
