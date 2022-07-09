import React, {FC, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {fontSizes} from '../../themes/Font';
import {theme} from '../../themes/Theme';
import Box from '../common/Box';
import Sort from './Sort';

interface ISearchInputProps {
  onSearch: (value: string) => void;
  onSort?: (value: string) => void;
  placeholder?: string;
}

const SearchInput: FC<ISearchInputProps> = ({
  onSearch,
  onSort,
  placeholder,
}) => {
  const [search, setSearch] = useState<string>('');

  const handleSearch = (value: string): void => {
    setSearch(value);
    if (onSearch) onSearch(value);
  };

  const handleSort = (value: string): void => {
    if (onSort && value) {
      onSort(value);
    }
  };

  return (
    <Box style={styles.searchSection} backgroundColor="background">
      <Box style={styles.inputContainer}>
        <Icon
          style={styles.searchIcon}
          name="search"
          size={24}
          color={theme.colors.lightGrey}
        />
        <TextInput
          value={search}
          style={styles.searchInput}
          placeholder={placeholder}
          onChangeText={handleSearch}
          underlineColorAndroid="transparent"
          placeholderTextColor={theme.colors.grey}
        />
      </Box>
      <Box style={styles.sortContainer}>
        <Sort onChange={handleSort} />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 58,
    borderRadius: 8,
    position: 'absolute',
    width: '100%',
    zIndex: 99,
  },
  inputContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortContainer: {
    flex: 1,
  },
  searchInput: {
    ...theme.textVariants.body,
    flex: 1,
    color: theme.colors.foreground,
    fontSize: fontSizes.normal,
    marginRight: theme.spacing.sm
  },
  searchIcon: {
    padding: 10,
  },
});

SearchInput.defaultProps = {
  onSearch: () => {},
  onSort: () => {},
  placeholder: 'Cari nama, bank, atau nominal',
};

export default SearchInput;
