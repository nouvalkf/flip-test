import React from 'react';
import {FlatList, RefreshControl, StatusBar, StyleSheet} from 'react-native';
import {theme} from '../../themes/Theme';
import Box from '../common/Box';
import TransactionItem from './TransactionItem';
import TransactionSkeleton from './TransactionSkeleton';

interface ITransactionListProps {
  data: any;
  isLoading: boolean;
  onRedirect: (item: any) => void;
  onRefresh: () => void;
}

const TransactionList: React.FunctionComponent<ITransactionListProps> = ({
  data,
  isLoading,
  onRedirect,
  onRefresh,
}) => {
  const handleRedirect = (item: any): void => {
    if (onRedirect) {
      onRedirect(item);
    }
  };

  const renderItem = ({item}: {item: any}) => (
    <TransactionItem onPress={() => handleRedirect(item)} item={item} />
  );

  const renderList = (): JSX.Element => {
    if (isLoading) {
      return <TransactionSkeleton />;
    }

    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
          />
        }
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    );
  };

  return <Box style={styles.container}>{renderList()}</Box>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 72,
  },
});

export default TransactionList;
