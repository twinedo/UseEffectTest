import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import axios from 'axios';
import moment from 'moment';

const Detail = () => {
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');

  let interval = useRef();

  const startTimer = () => {
    var arrivalTime = moment
      .utc('2020-06-22T01:45:19.000Z')
      .format('DD MMM YYYY, HH:mm:ss');
    var arrTime = new Date(arrivalTime).getTime();
    interval = setInterval(() => {
      var currentTime = new Date().getTime();
      var diffTime = arrTime - currentTime;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      var minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

      if (diffTime <= 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }

      console.log(
        days +
          'hari, ' +
          hours +
          'jam, ' +
          minutes +
          'menit, ' +
          seconds +
          'detik, ',
      );
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          {timerDays +
            'hari, ' +
            timerHours +
            'jam, ' +
            timerMinutes +
            'menit, ' +
            timerSeconds +
            'detik'}
        </Text>
      </View>
    </>
  );
};

export default Detail;

const styles = StyleSheet.create({});
