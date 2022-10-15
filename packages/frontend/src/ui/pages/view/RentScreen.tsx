import { gql, InMemoryCache, useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, RefreshControl} from 'react-native';
import HeaderComponent from '../../fragments/view/HeaderComponent';
import OweContainer from '../../fragments/view/OweComponent';
import UpcomingRentComponent from '../../fragments/view/UpcomingRentComponent';
import DebtListComponent from '../../fragments/view/DebtlListComponent';
  
export type Props = {
    houseId: string;
    userId: string;
};

const RentScreen: React.FC<Props> = ({
    houseId,
    userId
}
) => {
    // for testing purposes, enter houseId, userId here (ex '777', 'Seven Abou') c:
    // we can also just pass in the properties when using rentscreen
    houseId = '777';
    userId = 'Seven Abou';
    return (
        <View style={styles.container}>
            <HeaderComponent screenName='Rent & Finance'/>
            <UpcomingRentComponent houseId={houseId}/>

            <SafeAreaView style={styles.scrollContainer}>
                <DebtListComponent userId={userId}/>
            </SafeAreaView>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#DCF6FB',
    height: '100%',
    width: '100%',
  },

  scrollContainer: {
    height: '50%',
  }
});

export default RentScreen;