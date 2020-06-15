/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const ProgressBar2 = ({stateComp}) => {
  console.log('stateComp: ' + stateComp);
  return (
    <View
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 'auto',
        paddingRight: 'auto',
      }}>
      <View style={[{backgroundColor: '#19B2FF'}, styles.task]}>
        <Text style={styles.labelTask}>BO</Text>
      </View>
      <View style={styles.dotTask} />
      <View style={[{backgroundColor: '#19B2FF'}, styles.task]}>
        <Text style={styles.labelTask}>AS</Text>
      </View>
      <View style={styles.dotTask} />
      <View style={[{backgroundColor: '#19B2FF'}, styles.task]}>
        <Text style={styles.labelTask}>AC</Text>
      </View>
      <View
        style={[
          {
            backgroundColor:
              stateComp == 1
                ? '#FFD15C'
                : stateComp > 2
                ? '#19B2FF'
                : stateComp == 2
                ? '#19B2FF'
                : '#F2F2F2',
          },
          styles.link,
        ]}
      />
      <View
        style={[
          {
            backgroundColor:
              stateComp == 1
                ? '#FFD15C'
                : stateComp > 2
                ? '#19B2FF'
                : stateComp == 2
                ? '#19B2FF'
                : '#F2F2F2',
          },
          styles.task,
        ]}>
        <Text style={styles.labelTask}>PU</Text>
      </View>
      <View
        style={[
          {
            backgroundColor:
              stateComp == 2
                ? '#FFD15C'
                : stateComp > 3
                ? '#19B2FF'
                : stateComp == 3
                ? '#19B2FF'
                : '#F2F2F2',
          },
          styles.link,
        ]}
      />
      <View
        style={[
          {
            backgroundColor:
              stateComp == 2
                ? '#FFD15C'
                : stateComp > 3
                ? '#19B2FF'
                : stateComp == 3
                ? '#19B2FF'
                : '#F2F2F2',
          },
          styles.task,
        ]}>
        <Text
          style={{
            color: stateComp == 2 ? '#fff' : stateComp > 2 ? '#fff' : '#000',
          }}>
          L
        </Text>
      </View>
      <View
        style={[
          {
            backgroundColor:
              stateComp == 3
                ? '#FFD15C'
                : stateComp > 4
                ? '#19B2FF'
                : stateComp == 4
                ? '#19B2FF'
                : '#F2F2F2',
          },
          styles.link,
        ]}
      />
      <View
        style={[
          {
            backgroundColor:
              stateComp == 3
                ? '#FFD15C'
                : stateComp > 4
                ? '#19B2FF'
                : stateComp == 4
                ? '#19B2FF'
                : '#F2F2F2',
          },
          styles.task,
        ]}>
        <Text
          style={{
            color: stateComp == 3 ? '#fff' : stateComp > 3 ? '#fff' : '#000',
          }}>
          IT
        </Text>
      </View>
      <View
        style={[
          {
            backgroundColor:
              stateComp == 4
                ? '#FFD15C'
                : stateComp > 5
                ? '#19B2FF'
                : stateComp == 5
                ? '#19B2FF'
                : '#F2F2F2',
          },
          styles.link,
        ]}
      />
      <View
        style={[
          {
            backgroundColor:
              stateComp == 4
                ? '#FFD15C'
                : stateComp > 5
                ? '#19B2FF'
                : stateComp == 5
                ? '#19B2FF'
                : '#F2F2F2',
          },
          styles.task,
        ]}>
        <Text
          style={{
            color: stateComp == 4 ? '#fff' : stateComp > 4 ? '#fff' : '#000',
          }}>
          DO
        </Text>
      </View>
      <View
        style={[
          {
            backgroundColor:
              stateComp == 5
                ? '#FFD15C'
                : stateComp > 6
                ? '#19B2FF'
                : stateComp == 6
                ? '#19B2FF'
                : '#F2F2F2',
          },
          styles.link,
        ]}
      />
      <View
        style={[
          {
            backgroundColor:
              stateComp == 5
                ? '#FFD15C'
                : stateComp > 6
                ? '#19B2FF'
                : stateComp == 6
                ? '#19B2FF'
                : '#F2F2F2',
          },
          styles.task,
        ]}>
        <Text
          style={{
            color: stateComp == 5 ? '#fff' : stateComp > 5 ? '#fff' : '#000',
          }}>
          U
        </Text>
      </View>
      <View
        style={[
          {
            backgroundColor:
              stateComp == 6
                ? '#FFD15C'
                : stateComp > 7
                ? '#19B2FF'
                : stateComp == 7
                ? '#19B2FF'
                : '#F2F2F2',
          },
          styles.link,
        ]}
      />
      <View
        style={[
          {
            backgroundColor:
              stateComp == 6
                ? '#FFD15C'
                : stateComp > 7
                ? '#19B2FF'
                : stateComp == 7
                ? '#19B2FF'
                : '#F2F2F2',
          },
          styles.task,
        ]}>
        <Text
          style={{
            color: stateComp == 6 ? '#fff' : stateComp > 6 ? '#fff' : '#000',
          }}>
          C
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  task: {
    marginRight: 1,
    width: 28,
    height: 28,
    borderRadius: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dotTask: {
    backgroundColor: '#19B2FF',
    margin: 0,
    width: 10,
    height: 5,
    borderRadius: 100,
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  labelTask: {
    color: '#fff',
    fontFamily: 'Montserrat',
    fontSize: 11,
    lineHeight: 13,
  },
  link: {
    // margin:0,
    width: 10,
    height: 5,
    borderRadius: 100,
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default ProgressBar2;
