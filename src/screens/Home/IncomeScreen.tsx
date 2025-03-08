import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Header from '../../components/Header';
import Spacer from '../../components/Spacer';
import TransactionCard from '../../components/TransactionCard';
import {useGetIncomeOfUserQuery} from '../../redux/services';
import {styles} from '../../styles/IncomeScreenStyles';

const IncomeScreen = ({navigation}) => {
  const isFocused = useIsFocused();

  const {
    data: incomeData,
    error,
    isLoading: isIncomeLoading,
    refetch,
  } = useGetIncomeOfUserQuery({});

  const {data = []} = incomeData || {};

  const renderIncome = ({item}) => {
    return (
      <TransactionCard
        data={item}
        onPress={() => {
          // navigation.navigate('ExpenseDetailScreen', {id: item?.id});
        }}
      />
    );
  };

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  return (
    <View style={styles.container}>
      <Header title="Income" drawer />

      <View style={styles.subContainer}>
        <Text style={styles.headingText}>Income</Text>

        {isIncomeLoading ? (
          <>
            <Spacer mT={15} />
            <SkeletonPlaceholder borderRadius={10}>
              <SkeletonPlaceholder.Item width={'100%'} height={140} />
            </SkeletonPlaceholder>

            <Spacer mT={15} />
            <SkeletonPlaceholder borderRadius={10}>
              <SkeletonPlaceholder.Item width={'100%'} height={140} />
            </SkeletonPlaceholder>

            <Spacer mT={15} />
            <SkeletonPlaceholder borderRadius={10}>
              <SkeletonPlaceholder.Item width={'100%'} height={140} />
            </SkeletonPlaceholder>

            <Spacer mT={15} />
            <SkeletonPlaceholder borderRadius={10}>
              <SkeletonPlaceholder.Item width={'100%'} height={140} />
            </SkeletonPlaceholder>
          </>
        ) : (
          <FlatList
            data={data}
            renderItem={renderIncome}
            contentContainerStyle={{marginTop: 15}}
          />
        )}
      </View>
    </View>
  );
};

export default IncomeScreen;
