import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Button, StyleSheet, Text, View, Image, Pressable, FlatList, RefreshControl } from 'react-native';
import OweContainer from './OweComponent';

export type Props = {
    userId: string;
};

const GET_DEBTS =
gql`
query GetDebts($debtFrom: String!, $debtTo: String!) {
    getDebts(debtFrom: $debtFrom, debtTo: $debtTo) {
        debtId, debtTo, debtFrom, amount
    }
}`

const DebtListComponent: React.FC<Props> = ({
    userId
}) => {

    const { loading, data, refetch } = useQuery(GET_DEBTS, {
        variables: { debtTo: userId, debtFrom: userId},
    });

    if (loading) return <Text>Loading ...</Text>;

    return data.getDebts.map((element: { debtTo: string, debtFrom: string, amount: number}) => {

        const findNameDisplay = (debtTo: string, debtFrom: string) => {
            if (debtTo == userId)
                return debtFrom
            return debtTo;
        }

        const findWhoOwes = (debtTo: string) => {
            if (debtTo == userId)
                return 'Owes You'
            return 'You Owe'
        }

        const DATA = data.getDebts;

        return (
            <FlatList
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={DATA as readonly any[] | null | undefined}
                    renderItem={({item}) => <OweContainer from={findNameDisplay(item.debtTo, item.debtFrom)} amount={item.amount} whoOwes={findWhoOwes(item.debtTo)}/> }
            />
        );
      })[0];

}

export default DebtListComponent;