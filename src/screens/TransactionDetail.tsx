import React, {FC} from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {numberFormat} from '../utils/Currency';
import {dateFormat} from '../utils/Date';
import Box from '../components/common/Box';
import Text from '../components/common/Text';
import {theme} from '../themes/Theme';

interface ITransactionDetailProps {
  route: any;
}

const TransactionDetail: FC<ITransactionDetailProps> = ({route}) => {
  const {
    id,
    sender_bank,
    beneficiary_bank,
    beneficiary_name,
    account_number,
    amount,
    created_at,
    unique_code,
    remark,
  } = route.params;

  const copyId = (): void => {
    const message: string = 'ID Transaksi berhasil disalin';

    Clipboard.setString(id);

    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  };

  return (
    <Box backgroundColor="background" margin="sm" borderRadius={8}>
      <TouchableOpacity onPress={copyId} style={styles.cardTitle}>
        <Text variant="title">
          {' '}
          ID TRANSAKSI: #{id}
          {'  '}
          <Icon name="copy" size={20} color={theme.colors.primary} />
        </Text>
      </TouchableOpacity>
      <Box padding="md" style={styles.cardTitle}>
        <Text variant="title">DETAIL TRANSAKSI</Text>
        <Text variant="title" color="primary">
          Tutup
        </Text>
      </Box>
      <Box padding="md">
        <Text
          variant="title"
          style={{...styles.cardBodyText, ...styles.cardTextLabel}}>
          {sender_bank}{' '}
          <Icon
            name="arrow-right"
            style={{paddingHorizontal: theme.spacing.xs}}
            size={16}
            color="black"
          />{' '}
          {beneficiary_bank}
        </Text>
        <Box style={styles.cardBody}>
          <Box style={{flex: 0.6}}>
            <Text style={{...styles.cardBodyText, ...styles.cardTextLabel}}>
              {beneficiary_name}
            </Text>
            <Text style={styles.cardBodyText}>{account_number}</Text>
          </Box>
          <Box style={{flex: 0.4}}>
            <Text style={{...styles.cardBodyText, ...styles.cardTextLabel}}>
              NOMINAL
            </Text>
            <Text style={styles.cardBodyText}>Rp{numberFormat(amount)}</Text>
          </Box>
        </Box>
        <Box style={styles.cardBody}>
          <Box style={{flex: 0.6}}>
            <Text style={{...styles.cardBodyText, ...styles.cardTextLabel}}>
              BERITA TRANSFER
            </Text>
            <Text style={styles.cardBodyText}>{remark}</Text>
          </Box>
          <Box style={{flex: 0.4}}>
            <Text style={{...styles.cardBodyText, ...styles.cardTextLabel}}>
              KODE UNIK
            </Text>
            <Text style={styles.cardBodyText}>{unique_code}</Text>
          </Box>
        </Box>
        <Box style={styles.cardBody}>
          <Box style={{flex: 0.6}}>
            <Text style={{...styles.cardBodyText, ...styles.cardTextLabel}}>
              WAKTU DIBUAT
            </Text>
            <Text style={styles.cardBodyText}>{dateFormat(created_at)}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: theme.colors.lightGrey,
    padding: theme.spacing.md,
  },
  cardBody: {
    marginVertical: theme.spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBodyText: {
    marginVertical: theme.spacing.xs - 3,
  },
  cardTextLabel: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default TransactionDetail;
