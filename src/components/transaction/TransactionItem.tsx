import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {theme} from '../../themes/Theme';
import {numberFormat} from '../../utils/Currency';
import {dateFormat} from '../../utils/Date';
import Box from '../common/Box';
import Text from '../common/Text';

interface ITransactionItem {
  id: string;
  amount: number;
  unique_code: number;
  status: string;
  sender_bank: string;
  account_number: string;
  beneficiary_name: string;
  beneficiary_bank: string;
  remark: string;
  created_at: string;
  completed_at: string;
  fee: number;
}

interface ITransactionItemProps {
  item: ITransactionItem;
  onPress: () => void;
}

const TransactionItem: FC<ITransactionItemProps> = ({item, onPress}) => {
  const date = dateFormat(item.created_at);
  const transactionSuccess = item.status === 'SUCCESS';

  const renderLabel = () => {
    if (transactionSuccess) {
      return (
        <Box style={styles.badge} backgroundColor="success" borderRadius={8}>
          <Text color="background" style={{fontWeight: 'bold'}}>
            Berhasil
          </Text>
        </Box>
      );
    }

    return (
      <Box
        style={{...styles.badge, ...styles.badgeOnProcess}}
        backgroundColor="background"
        borderRadius={8}>
        <Text style={{fontWeight: 'bold'}}>Pengecekan</Text>
      </Box>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.cardItem,
        {
          borderLeftColor: transactionSuccess
            ? theme.colors.success
            : theme.colors.primary,
        },
      ]}>
      <Box style={{flex: 0.6}}>
        <Text
          variant="title"
          style={{...styles.cardBodyText, ...styles.textUppercase}}>
          {item.sender_bank}{' '}
          <Icon
            name="arrow-right"
            style={{paddingHorizontal: theme.spacing.xs}}
            size={16}
            color={theme.colors.foreground}
          />{' '}
          {item.beneficiary_bank}
        </Text>
        <Text style={{...styles.cardBodyText, ...styles.textUppercase}}>
          {item.beneficiary_name}
        </Text>
        <Text style={styles.cardBodyText}>
          Rp{numberFormat(item.amount)} &bull; {date}
        </Text>
      </Box>
      <Box style={styles.badgeContainer}>{renderLabel()}</Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardItem: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.xs,
    borderRadius: 8,
    borderLeftWidth: 8,
  },
  cardBodyText: {
    marginVertical: theme.spacing.xs - 2,
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  badgeContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  badge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeOnProcess: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
});

export default TransactionItem;
