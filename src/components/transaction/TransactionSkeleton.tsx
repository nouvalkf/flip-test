import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {theme} from '../../themes/Theme';
import Box from '../common/Box';
import Skeleton from '../common/Skeleton';

const TransactionSkeleton: FC<{}> = () => {
  const length = [0, 1, 2];
  return (
    <Box>
      {length.map(key => (
        <Box
          key={key}
          style={styles.cardItem}
          backgroundColor="background"
          padding="md"
          borderRadius={8}>
          <Box style={{flex: 0.6}}>
            <Box style={{marginVertical: 4}}>
              <Skeleton width={'100%'} height={16} />
            </Box>
            <Box style={{marginVertical: 4}}>
              <Skeleton width={'100%'} height={16} />
            </Box>
            <Box style={{marginVertical: 4}}>
              <Skeleton width={'100%'} height={16} />
            </Box>
          </Box>
          <Box
            style={{
              flex: 0.4,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Skeleton width={'70%'} height={24} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const styles = StyleSheet.create({
  cardItem: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginVertical: theme.spacing.xs,
  },
});

export default TransactionSkeleton;
