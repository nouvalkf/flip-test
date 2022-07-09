import React, {FC, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {theme} from '../../themes/Theme';
import Box from '../common/Box';
import Text from '../common/Text';

interface ISortProps {
  onChange: (value: string) => void;
}

interface ISort {
  name: string;
  value: string;
  selected: boolean;
}

const Sort: FC<ISortProps> = ({onChange}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sorts, setSorts] = useState<ISort[]>([
    {name: 'URUTKAN', value: '', selected: true},
    {name: 'Nama A-Z', value: 'name-asc', selected: false},
    {name: 'Nama Z-A', value: 'name-desc', selected: false},
    {name: 'Tanggal Terbaru', value: 'date-desc', selected: false},
    {name: 'Tanggal Terlama', value: 'date-asc', selected: false},
  ]);

  const handleSort = (item: ISort): void => {
    const newSorts: ISort[] = sorts.map(sort => ({
      ...sort,
      selected: item.value === sort.value,
    }));

    setSorts(newSorts);
    setShowModal(false);
    onChange(item.value);
  };

  const sortActive = sorts.find(({selected}) => selected);

  const renderSortation = (): JSX.Element => {
    return (
      <Modal
        isVisible={showModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationOutTiming={10}>
        <Box style={styles.modalView} padding="lg" backgroundColor="background">
          {sorts.map((item, index) => (
            <Pressable key={index} onPress={() => handleSort(item)}>
              <Box style={styles.sortItemContainer}>
                <Icon
                  name={item.selected ? 'dot-circle' : 'circle'}
                  style={styles.sortSelectionIcon}
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={styles.sortItemText} variant="header">
                  {item.name}
                </Text>
              </Box>
            </Pressable>
          ))}
        </Box>
      </Modal>
    );
  };

  return (
    <Box style={styles.sortContainer}>
      <Pressable
        style={styles.sortSelection}
        onPress={() => setShowModal(true)}>
        <Text style={{fontWeight: 'bold'}} color="primary">
          {sortActive?.name || ''}
        </Text>
        <Icon
          name="angle-down"
          style={styles.sortSelectionIcon}
          size={20}
          color={theme.colors.primary}
        />
      </Pressable>
      {renderSortation()}
    </Box>
  );
};

const styles = StyleSheet.create({
  sortContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  sortSelection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sortSelectionIcon: {
    paddingHorizontal: theme.spacing.xs,
  },
  sortItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  sortItemText: {
    marginLeft: theme.spacing.sm,
  },
  modalView: {
    borderRadius: 8,
    shadowColor: theme.colors.background,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Sort;
