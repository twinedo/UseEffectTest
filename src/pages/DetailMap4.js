/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import OrderAPI from '../api/OrderAPI';
const DetailMap2 = ({route}) => {
  const orderID = route.params;
  console.log(orderID.orderID);
  const [dataOrder, setDataOrder] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOrderData();
    return console.log('unmount');
  }, []);

  useEffect(() => {
    setLoading(true);
  }, []);

  const getOrderData = async () => {
    await OrderAPI.get(`/api/v1/orders/${orderID.orderID}`)
      .then((res) => {
        console.log(res);
        console.log(res.data.numberOrder.split(', '));
        setDataOrder(res.data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  };

  return (
    <>
      {!loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <Text style={{position: 'absolute', top: 20, bottom: 100}}>
              Test
            </Text>
          </View>
        </>
      )}
      <SafeAreaView>
        <View
          style={{
            backgroundColor: 'yellow',
            justifyContent: 'flex-end',
            zIndex: 5,
          }}>
          <Text>ORDER ID : {dataOrder.orderID}</Text>
          <Text>ORDER NUMBER: {dataOrder.numberOrder}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default DetailMap2;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
});
