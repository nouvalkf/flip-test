import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import Box from '../components/common/Box';
import SearchInput from '../components/search/SearchInput';
import TransactionList from '../components/transaction/TransactionList';
import {get} from '../utils/ApiCaller';
import {URL_DUMMIES} from '../utils/Constanta';
import {useDebounce} from '../utils/hooks/useDebounce';

interface IHome {
  navigation: any;
}

const Home: FC<IHome> = ({navigation}) => {
  const [masterData, setMasterData] = useState<any[]>(); // Used for re-initiate data, because (maybe) the api is not support filtering
  const [data, setData] = React.useState<any[]>();
  const [sortValue, setSortValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);

  const debounceSearch = useDebounce(searchValue, 500); // Debouncing the searchValue

  const initialData = async (): Promise<void> => {
    setLoading(true);
    try {
      const arrayData: any[] = [];

      if (!masterData) {
        const response: any = await get(URL_DUMMIES).catch(() => {});

        /** Mapping data from object to array object */
        Object.keys(response).forEach(key => {
          arrayData.push({
            ...response[key],
            created_at: `${response[key].created_at.replace(' ', 'T')}`,
          });
        });

        setMasterData(arrayData);
      }

      const dataList = masterData || arrayData; // Condition when data from API has saved;

      if (sortValue) {
        onSort(sortValue, true);
      } else {
        setData(dataList);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (): void => {
    if (debounceSearch.length >= 3) {
      const dataSearch: any[] = [];
      const searchValue: string = debounceSearch.toLowerCase();

      data?.forEach(item => {
        const byName = item.beneficiary_name
          .toLowerCase()
          .includes(searchValue);
        const byBankBeneficiary = item.beneficiary_bank
          .toLowerCase()
          .includes(searchValue);
        const byBankSender = item.sender_bank
          .toLowerCase()
          .includes(searchValue);
        const byAmount = item.amount.toString().includes(searchValue);

        if (byName || byBankBeneficiary || byBankSender || byAmount) {
          dataSearch.push(item);
        }
      });

      setData(dataSearch);
    } else if (!debounceSearch && sortValue) {
      onSort(sortValue, true);
    } else {
      initialData();
    }
  };

  const onSort = (value: string, init: boolean = false): void => {
    if (value) {
      setLoading(true);

      const [key, type] = value.split('-');
      const dataWillSort = init ? masterData : data;

      /** Sort data with sort type and sort key */
      const dataSorted = dataWillSort?.sort((a, b) => {
        if (key === 'date') {
          const aDate: any = new Date(a.created_at);
          const bDate: any = new Date(b.created_at);

          return type === 'desc' ? bDate - aDate : aDate - bDate;
        }

        if (key === 'name') {
          const sortNameAsc = a.beneficiary_name.localeCompare(
            b.beneficiary_name,
          );
          const sortNameDesc = b.beneficiary_name.localeCompare(
            a.beneficiary_name,
          );

          return type === 'desc' ? sortNameDesc : sortNameAsc;
        }

        return 0;
      });

      setData(dataSorted);
      setSortValue(value);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleRefresh = React.useCallback(() => {
    initialData();
  }, []);

  const handleRedirect = (item: any): void => {
    navigation.push('Details', item);
  };

  React.useEffect(() => {
    onSearch();
  }, [debounceSearch]);

  return (
    <Box margin="sm" style={styles.container}>
      <SearchInput
        onSearch={(value: string) => setSearchValue(value)}
        onSort={onSort}
      />
      <TransactionList
        data={data}
        onRedirect={handleRedirect}
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
});

export default Home;
