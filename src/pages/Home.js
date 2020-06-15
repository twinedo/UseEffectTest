import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  BackHandler,
  Alert,
  Platform,
} from 'react-native';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import ServiceTripAPI from '../api/ServiceTrip';
import Permissions from './Permissions';
import {useTranslation} from '../context/LanguageContext';

const Home = ({navigation}) => {
  const [counterExit, setCounterExit] = useState(false);
  const [issue, setIssue] = useState([]);

  const {welcome} = useTranslation();
  useEffect(() => {
    Permissions();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      ServiceTripAPI.get('/trip/issuetrip/byassignedtripid', {
        params: {
          issueAssignedTripID: 'TK-TRP-202005100910330000023',
          // issueAssignedTripID: data.order_trip.assignedTripID,
        },
      })
        .then((res) => {
          console.log(res.data);
          setIssue(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      const backAction = () => {
        if (counterExit == false) {
          setCounterExit(true);
          Toast.show(
            'Back sekali lagi untuk keluar dari app',
            Toast.SHORT,
            Toast.BOTTOM,
          );
        } else if (counterExit == true) {
          BackHandler.exitApp();
        }
        setTimeout(() => {
          setCounterExit(false);
        }, 2000);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, [counterExit]),
  );

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>INI HOME</Text>
      <Text>INI HOME</Text>
      <Text>{welcome}</Text>
      <Button
        title="Go To Detail 1"
        onPress={() =>
          navigation.navigate('Detail', {
            orderID: 1,
          })
        }
      />
      <Button
        title="Go To Detail 10"
        onPress={() =>
          navigation.navigate('Detail', {
            orderID: 10,
          })
        }
      />
      <Button
        title="Go To Detail Map TRANSINDO"
        onPress={() =>
          navigation.navigate('DetailMap', {
            orderID: 'TK-ORD-202051816300700000007',
          })
        }
      />
      <Button
        title="Go To Detail Map GOJEK"
        onPress={() =>
          navigation.navigate('DetailMap', {
            orderID: 'TK-ORD-202051816202200000006',
          })
        }
      />
      <Button
        title="Go To Detail Map 3"
        onPress={() => navigation.navigate('DetailMap3')}
      />
      <Button
        title="Go To Detail Map 4"
        onPress={() =>
          navigation.navigate('DetailMap4', {
            orderID: '',
          })
        }
      />
      <Button
        title="Go To ViewPager"
        onPress={() => navigation.navigate('ViewPage', issue)}
      />
      <Button
        title="Go To Detail Task View"
        onPress={() =>
          navigation.navigate('DetailTaskView', {
            orderIdDispatcher: 'TK-ORD-202061215172900000006',
          })
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
