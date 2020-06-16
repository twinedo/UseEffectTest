/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import ProgressBar from './ProgressBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

const leftActive = <AntDesign name="leftcircle" size={24} color="#19B2FF" />;
const leftInactive = <AntDesign name="leftcircle" size={24} color="#C4C4C4" />;
const rightActive = <AntDesign name="rightcircle" size={24} color="#19B2FF" />;
const rightInactive = (
  <AntDesign name="rightcircle" size={24} color="#C4C4C4" />
);

const DetailTaskInfo = ({dataTripInfo, dataOrderInfo}) => {
  // console.log(dataOrderInfo);
  // console.log('status: ' + dataOrderInfo[0].orderStatus);
  const [stateComp, setStateComp] = useState();

  console.log(dataOrderInfo);

  let refFlat = useRef(null);

  useEffect(() => {
    if (dataOrderInfo[0].orderStatus === 'accepted') {
      setStateComp(1);
    } else if (dataOrderInfo[0].orderStatus === 'pickup') {
      setStateComp(2);
    } else if (dataOrderInfo[0].orderStatus === 'loaded') {
      setStateComp(3);
    } else if (dataOrderInfo[0].orderStatus === 'in_transit') {
      setStateComp(4);
    } else if (dataOrderInfo[0].orderStatus === 'dropoff') {
      setStateComp(5);
    } else if (dataOrderInfo[0].orderStatus === 'unloaded') {
      setStateComp(6);
    } else {
      setStateComp(0);
    }
  }, [dataOrderInfo[0].orderStatus]);

  return (
    <>
      <ScrollView>
        <FlatList
          data={dataOrderInfo}
          horizontal
          scrollEnabled={false}
          ref={(c) => (refFlat = c)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item, index}) => {
            return (
              <>
                <View style={styles.contain}>
                  <View style={styles.tripInfo}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.title}>
                        Trip Information - #{index + 1}
                      </Text>
                      <View
                        style={{
                          margin: 10,
                          justifyContent: 'flex-end',
                          flexDirection: 'row',
                        }}>
                        <View style={{marginRight: 10}}>
                          {index === 0 ? (
                            <TouchableNativeFeedback disabled>
                              <Text>{leftInactive}</Text>
                            </TouchableNativeFeedback>
                          ) : (
                            <TouchableNativeFeedback
                              onPress={() =>
                                refFlat.scrollToIndex({
                                  animated: true,
                                  index: index - 1,
                                })
                              }>
                              <Text>{leftActive}</Text>
                            </TouchableNativeFeedback>
                          )}
                        </View>
                        {index === dataOrderInfo.length - 1 ? (
                          <TouchableNativeFeedback disabled>
                            <Text>{rightInactive}</Text>
                          </TouchableNativeFeedback>
                        ) : (
                          <TouchableNativeFeedback
                            onPress={() =>
                              refFlat.scrollToIndex({
                                animated: true,
                                index: index + 1,
                              })
                            }>
                            <Text>{rightActive}</Text>
                          </TouchableNativeFeedback>
                        )}
                      </View>
                    </View>
                    <View style={styles.tripDetailView}>
                      <View style={styles.tripDetailRow}>
                        <Image source={require('../assets/Distance.png')} />
                        <Text style={styles.subtitle}>Distance</Text>
                      </View>
                      <View style={styles.tripDetailRow}>
                        <Text style={styles.subtitle}>
                          {item.orderDistance}
                        </Text>
                        {/*<Text style={styles.subtitle}>148</Text>*/}
                        <Text style={styles.tripValue}> KM</Text>
                      </View>
                    </View>
                    <View style={styles.tripDetailView}>
                      <View style={styles.tripDetailRow}>
                        <Image source={require('../assets/Vehicle.png')} />
                        <Text style={styles.subtitle}>Vehicle</Text>
                      </View>
                      <View style={styles.tripDetailRow}>
                        <Text style={styles.subtitle}>
                          {/* {dataTripInfo.vehicleTransporterPlateNumber} */}
                          {item.order_trip.vehicleTransporterPlateNumber}
                        </Text>
                        <Text style={styles.tripValue}>
                          {' '}
                          {/* - {dataTripInfo.vehicleTransporterType} */}- {''}
                          {item.order_trip.vehicleTransporterType}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tripDetailView}>
                      <View style={styles.tripDetailRow}>
                        <Image
                          source={require('../assets/CargoDimension.png')}
                        />
                        <Text style={styles.subtitle}>Cargo Dimension</Text>
                      </View>
                      <View style={styles.tripDetailRow}>
                        <Text style={styles.subtitle}>
                          {/* {
                            dataTripInfo.assignedTripVehicleTransporterPlanMaximumCBMDimension
                          } */}
                          {
                            item.order_trip
                              .assignedTripVehicleTransporterPlanMaximumCBMDimension
                          }
                        </Text>
                        <Text style={styles.tripValue}> CBM</Text>
                      </View>
                    </View>
                    <View style={styles.tripDetailView}>
                      <View style={styles.tripDetailRow}>
                        <Image source={require('../assets/CargoWeight.png')} />
                        <Text style={styles.subtitle}>Cargo Weight</Text>
                      </View>
                      <View style={styles.tripDetailRow}>
                        <Text style={styles.subtitle}>
                          {/* {
                            dataTripInfo.assignedTripVehicleTransporterPlanMaximumWeight
                          } */}
                          {
                            item.order_trip
                              .assignedTripVehicleTransporterPlanMaximumWeight
                          }
                        </Text>
                        <Text style={styles.tripValue}> KG</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.orderInfo}>
                    <Text style={styles.title}>Order Information - #1</Text>
                    {item.orderStatus === 'accepted' ? (
                      <ProgressBar stateComp={1} />
                    ) : item.orderStatus === 'pickup' ? (
                      <ProgressBar stateComp={2} />
                    ) : item.orderStatus === 'loaded' ? (
                      <ProgressBar stateComp={3} />
                    ) : item.orderStatus === 'in_transit' ? (
                      <ProgressBar stateComp={4} />
                    ) : item.orderStatus === 'dropoff' ? (
                      <ProgressBar stateComp={5} />
                    ) : item.orderStatus === 'unloaded' ? (
                      <ProgressBar stateComp={6} />
                    ) : (
                      <ProgressBar stateComp={0} />
                    )}
                    <View style={styles.orderDetailView}>
                      <Text style={styles.orderSubtitle}>Order ID</Text>
                      <Text style={styles.tripValue}>{item.orderID}</Text>
                    </View>
                    <View style={styles.orderDetailView}>
                      <Text style={styles.orderSubtitle}>Destination</Text>
                      <Text style={styles.tripValue}>
                        {item.orderDestinationCompanyName}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            );
          }}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    borderWidth: 2,
    borderColor: 'red',
  },
  contain: {
    backgroundColor: '#FAFAFA',
    borderTopWidth: 0.5,
    borderTopColor: '#C4C4C4',
  },
  tripInfo: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  orderInfo: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    margin: 5,
  },
  tripDetailView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    alignItems: 'center',
  },
  orderDetailView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    alignItems: 'center',
  },
  tripValue: {
    marginEnd: 10,
  },
  subtitle: {
    fontWeight: 'bold',
    marginStart: 8,
    alignSelf: 'center',
  },
  orderSubtitle: {
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  tripDetailRow: {
    flexDirection: 'row',
  },
});

export default DetailTaskInfo;
