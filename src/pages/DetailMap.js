import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import axios from 'axios';
import OrderAPI from '../api/OrderAPI';

const DetailMap = ({route}) => {
  const orderID = route.params;
  console.log(orderID.orderID);
  const [dataOrder, setDataOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});

  useEffect(() => {
    OrderAPI.get(`/api/v1/orders/${orderID.orderID}`)
      .then((res) => {
        console.log(res);
        setDataOrder(res.data);
        setLoading(false);
        const ori = JSON.parse(res.data.originLatLong);
        const dest = JSON.parse(res.data.destinationLatLong);
        console.log(ori);
        setOrigin({
          latitude: ori.lat,
          longitude: ori.lng,
        });
        setDestination({
          latitude: dest.lat,
          longitude: dest.lng,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    return setLoading(true);
  }, []);

  return (
    <>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>ORDER ID : {dataOrder.orderID}</Text>
          <Text>Origin Lat Lng: {dataOrder.originLatLong}</Text>
          <Text>Destination Lat Lng: {dataOrder.destinationLatLong}</Text>
          <Text>
            Origin doank: {origin.latitude} , {origin.longitude}
          </Text>
          <Text>
            Destination doank: {destination.latitude} , {destination.longitude}
          </Text>
        </View>
      )}
    </>
  );
};

export default DetailMap;

const styles = StyleSheet.create({});
