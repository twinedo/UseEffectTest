/* eslint-disable no-lone-blocks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef, useReducer} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
  FlatList,
  BackHandler,
} from 'react-native';
import DetailTaskInfo from './DetailTaskInfo';
import SwipeButton from 'rn-swipe-button';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {SafeAreaView} from 'react-native-safe-area-context';
import OrderApi from '../api/OrderAPI';
import OrderDispatcherApi from '../api/OrderDispatcherAPI';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
export const DataCoordContext = React.createContext();

const {width, height} = Dimensions.get('window');
const GOOGLE_MAPS_APIKEY = 'AIzaSyCL8zOvpJQdp0l6hWuHP-ccfekTftSrWBo';
const initialState = {
  loading: true,
  error: '',
  dataAssignedTrip: {},
  dataOrderTrip: null,
  listOrder: [],
  origin: {},
  destination: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_ASSIGNED_SUCCESS':
      return {
        ...state,
        loading: false,
        dataAssignedTrip: action.dataAssignedTrip,
      };
    case 'FETCH_ASSIGNED_ERROR':
      return {
        ...state,
        loading: false,
        error: action.assignedError,
      };
    case 'FETCH_ORDER_SUCCESS':
      return {
        ...state,
        loading: false,
        dataOrderTrip: action.dataOrderTrip,
      };
    case 'FETCH_ORDER_ERROR':
      return {
        ...state,
        loading: false,
        error: action.orderError,
      };
    default:
      return state;
  }
};

const DetailTaskView = ({navigation, route}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [mapView, setMapView] = useState('');
  let _panel = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [coords, setCoords] = useState([
    {
      latitude: -6.3476835,
      longitude: 106.8662345,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    },
    {
      latitude: -6.3476835,
      longitude: 106.8662345,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    },
  ]);
  const [origin, setOrigin] = useState({
    latitude: -6.3476835,
    longitude: 106.8662345,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [destination, setDestination] = useState({
    latitude: -6.3476835,
    longitude: 106.8662345,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // console.log('ini paramnya di detail2', route.params.assignedTripID);
  console.log('ini order1 di detail2', route.params.orderIdDispatcher);
  // AsyncStorage.setItem('assignedTripId', route.params.assignedTripID);
  // useEffect(() => {
  //   getDataAssignedTrip();
  //   return console.log('unmount');
  // }, []);

  useEffect(() => {
    getDataOrderTrip();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // const getDataAssignedTrip = async () => {
  //   await ServiceTrip.get('/trip/getbytripid', {
  //     params: {
  //       assignedTripID: route.params.assignedTripID,
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response.data);
  //       dispatch({
  //         type: 'FETCH_ASSIGNED_SUCCESS',
  //         dataAssignedTrip: response.data,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       dispatch({
  //         type: 'FETCH_ASSIGNED_ERROR',
  //         assignedError: error,
  //       });
  //     });
  // };

  const getDataOrderTrip = async () => {
    await OrderDispatcherApi.get(
      `/api/v1/dispatcher/detail/${route.params.orderIdDispatcher}`,
    )
      .then((res) => {
        console.log(res.data);
        var myArray = res.data.order_combine;
        var array1 = res.data;
        var newArray = [];
        newArray.push(array1);

        for (var i = 1; i < myArray.length; i++) {
          var obj = myArray[i];
          // console.log(obj);
          newArray.push(obj.order);
        }
        // console.log(newArray);
        var coordArray = [];
        var markerArray = [];
        for (var i = 0; i <= newArray.length - 1; i++) {
          var ori = newArray[i].originLatLong;
          var des = newArray[i].destinationLatLong;
          console.log('ini ori ' + JSON.parse(ori));
          console.log('ini des ' + JSON.parse(des));
          coordArray.push(
            {
              latitude: JSON.parse(ori).lat,
              longitude: JSON.parse(ori).lng,
            },
            {
              latitude: JSON.parse(des).lat,
              longitude: JSON.parse(des).lng,
            },
          );
          markerArray.push(
            {
              coordinate: {
                latitude: JSON.parse(ori).lat,
                longitude: JSON.parse(ori).lng,
              },
              title: 'Origin: ' + newArray[i].orderOriginCompanyName,
              description: 'Origin: ' + newArray[i].originCompanyAddress,
            },
            {
              coordinate: {
                latitude: JSON.parse(des).lat,
                longitude: JSON.parse(des).lng,
              },
              title:
                `Destination #${[i + 1]}: ` +
                newArray[i].orderDestinationCompanyName,
              description:
                `Destination #${[i + 1]}: ` +
                newArray[i].destinationCompanyAddress,
            },
          );

          // console.log(coordArray);
        }

        setCoords(coordArray);
        setMarkers(markerArray);

        dispatch({type: 'FETCH_ORDER_SUCCESS', dataOrderTrip: newArray});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const backIcon = <Icon name="ios-arrow-back" size={24} color="#FFF" />;
  const openSheet = <FontAwesome5 name="minus" size={32} color="#C4C4C4" />;

  const AppIcon = () => (
    <Image source={require('../assets/Logo.png')} style={styles.icon} />
  );

  // const declineHandler = () => {
  //   Alert.alert(
  //     'Confirm Decline Task',
  //     `You are about to decline a trip ${state.dataAssignedTrip.assignedTripID}`,
  //     [
  //       {text: 'Yes', onPress: () => decline(state.dataAssignedTrip.orderID)},
  //       {text: 'No', onPress: () => console.log('No'), style: 'cancel'},
  //     ],
  //     {cancelable: false},
  //   );
  //   console.log(state.origin);
  //   console.log(state.destination);
  // };

  // const decline = async (orderID) => {
  //   console.log(orderID);
  //   await OrderApi.put(`/api/v1/orders/status/${orderID}`, {
  //     orderStatus: 'confirmed',
  //     data: {
  //       status: '',
  //       reason: null,
  //     },
  //   })
  //     .then((responses) => {
  //       // AsyncStorage.setItem('order_id', assignedTrip.orderID);
  //       console.log('berhasil update dengan status', responses);
  //       navigation.navigate('TaskManager', {
  //         initialRouteName: 'Task Schedule',
  //       });
  //       // setStateComp(states);
  //     })
  //     .catch((err) => {
  //       console.log('ini error', err);
  //     });
  // };

  // const swipeSuccess = async (orderID) => {
  //   await OrderApi.put(`/api/v1/orders/status/${orderID}`, {
  //     orderStatus: 'accepted',
  //     data: {
  //       status: 'pickup_estimated / pickup_actual',
  //       reason: null,
  //     },
  //   })
  //     .then((responses) => {
  //       AsyncStorage.setItem('order_id', state.dataAssignedTrip.orderID);
  //       AsyncStorage.setItem(
  //         'id_vehicle',
  //         state.dataAssignedTrip.vehicleTransporterID,
  //       );
  //       console.log('berhasil update dengan status', responses);
  //       // setStateComp(states);
  //     })
  //     .catch((err) => {
  //       console.log('ini error', err);
  //     });
  // };

  // const navigasi = async () => {
  //   await AsyncStorage.setItem('order_id', state.dataAssignedTrip.orderID);
  //   navigation.replace('TaskManager', {
  //     initialRouteName: 'Active Task',
  //     orderID: state.dataAssignedTrip.orderID,
  //   });
  // };

  return (
    <>
      {state.loading && state.origin === '' && state.destination === '' ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <StatusBar backgroundColor="#F3F3F3" />
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          <StatusBar backgroundColor="#19B2FF" />
          <View style={styles.viewToolbar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text>{backIcon}</Text>
            </TouchableOpacity>
            <Text style={styles.titleToolbar}>
              {/* {state.dataOrderTrip.order_trip.assignedTripID} */}
              {/* {state.dataOrderTrip[0].orderID} */}
            </Text>
          </View>
          <View style={styles.container}>
            {state.loading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
              </View>
            ) : (
              <View style={StyleSheet.absoluteFillObject}>
                <MapView
                  style={StyleSheet.absoluteFillObject}
                  provider={PROVIDER_GOOGLE}
                  initialRegion={{
                    latitude: -6.3476835,
                    longitude: 106.8662345,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.001,
                  }}
                  ref={(c) => setMapView(c)}
                  showsMyLocationButton
                  showsCompass>
                  {markers.map((marker, index) => {
                    console.log(marker);
                    return (
                      <MapView.Marker
                        key={index}
                        title={marker.title}
                        description={marker.description}
                        coordinate={{
                          latitude: marker.coordinate.latitude,
                          longitude: marker.coordinate.longitude,
                        }}>
                        {index == 0 ||
                        index == 2 ||
                        index == 4 ||
                        index == 6 ||
                        index == 8 ? (
                          <MaterialCommunityIcons
                            name="map-marker"
                            color="red"
                            size={30}
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name="map-marker-check"
                            color="red"
                            size={30}
                          />
                        )}
                      </MapView.Marker>
                    );
                  })}

                  {/* <MapView.Marker
                    coordinate={coords[0]}
                    title={
                      'Origin: ' + state.dataOrderTrip.orderOriginCompanyName
                    }
                    description={
                      'Alamat: ' + state.dataOrderTrip.originCompanyAddress
                    }>
                    <MaterialCommunityIcons
                      name="map-marker"
                      color="red"
                      size={50}
                    />
                  </MapView.Marker>
                  <MapView.Marker
                    coordinate={coords[1]}
                    title={
                      'Destination: ' +
                      state.dataOrderTrip.orderDestinationCompanyName
                    }
                    description={
                      'Alamat: ' + state.dataOrderTrip.destinationCompanyAddress
                    }>
                    <MaterialCommunityIcons
                      name="map-marker-check"
                      color="red"
                      size={50}
                    />
                  </MapView.Marker>
                  <MapView.Marker
                    coordinate={coords[2]}
                    title={
                      'Origin: ' + state.dataOrderTrip.orderOriginCompanyName
                    }
                    description={
                      'Alamat: ' + state.dataOrderTrip.originCompanyAddress
                    }>
                    <MaterialCommunityIcons
                      name="map-marker"
                      color="red"
                      size={50}
                    />
                  </MapView.Marker>
                  <MapView.Marker
                    coordinate={coords[3]}
                    title={
                      'Destination: ' +
                      state.dataOrderTrip.orderDestinationCompanyName
                    }
                    description={
                      'Alamat: ' + state.dataOrderTrip.destinationCompanyAddress
                    }>
                    <MaterialCommunityIcons
                      name="map-marker-check"
                      color="red"
                      size={50}
                    />
                  </MapView.Marker> */}
                  {coords.length >= 2 && (
                    <MapViewDirections
                      origin={coords[0]}
                      waypoints={
                        coords.length > 2 ? coords.slice(1, -1) : coords[2]
                      }
                      destination={coords[coords.length - 1]}
                      apikey={GOOGLE_MAPS_APIKEY}
                      strokeWidth={5}
                      strokeColor="blue"
                      onStart={(params) => {
                        console.log(
                          `Started routing between "${params.origin}" and "${params.destination}"`,
                        );
                        console.log(params);
                      }}
                      onReady={(result) => {
                        console.log(`Distance: ${result.distance} km`);
                        console.log(`Duration: ${result.duration} min.`);
                        console.log(result);
                        mapView.fitToCoordinates(result.coordinates, {
                          edgePadding: {
                            right: width / 10,
                            bottom: height / 10,
                            left: width / 10,
                            top: height / 10,
                          },
                        });
                      }}
                      onError={(errorMessage) => {
                        // console.log('GOT AN ERROR');
                      }}
                    />
                  )}
                </MapView>
                {/* <View style={{position: 'absolute', top: 100, left: 50}} /> */}
              </View>
            )}
            <SlidingUpPanel
              draggableRange={{top: 300, bottom: 20}}
              backdropOpacity={0.2}
              ref={(c) => (_panel = c)}>
              {(dragHandler) => (
                <View style={styles.panelContainer}>
                  <View style={styles.dragHandler} {...dragHandler}>
                    <TouchableOpacity
                      style={{alignItems: 'center', alignSelf: 'stretch'}}
                      onPress={() => _panel.show()}>
                      <Text>{openSheet}</Text>
                    </TouchableOpacity>
                  </View>
                  <DetailTaskInfo
                    dataTripInfo={state.dataAssignedTrip}
                    dataOrderInfo={state.dataOrderTrip}
                  />
                </View>
              )}
            </SlidingUpPanel>
          </View>
          <SafeAreaView>
            <View style={styles.footer}>
              <View style={styles.subFooter}>
                <SwipeButton
                  height={28}
                  width="70%"
                  swipeSuccessThreshold={70}
                  thumbIconBackgroundColor="#FFFFFF"
                  thumbIconComponent={AppIcon}
                  railBackgroundColor="#F3F3F3"
                  thumbIconBorderColor="transparent"
                  railBorderColor="#F3F3F3"
                  railFillBackgroundColor="#FFD15C"
                  railFillBorderColor="#F3F3F3"
                  // titleColor="#818181"
                  // titleFontSize={16}
                  titleStyles={styles.swipeText}
                  title="Swipe to Accept Task"
                  onSwipeSuccess={() => {
                    // navigation.navigate('TabScreen');
                    // swipeSuccess(state.dataAssignedTrip.orderID);
                    // navigasi();
                  }}
                />

                <TouchableOpacity
                  style={styles.buttonDecline}
                  onPress={() => alert('decline')}>
                  <Text style={styles.buttonText}>Decline</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelContainer: {
    height: 300,
    zIndex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewToolbar: {
    backgroundColor: '#19B2FF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  titleToolbar: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    paddingStart: 14,
  },
  buttonDecline: {
    backgroundColor: 'red',
    width: 100,
    height: 32,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  dragHandler: {
    alignSelf: 'stretch',
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  footer: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    borderTopWidth: 0.5,
    borderTopColor: '#C4C4C4',
    zIndex: 10,
    bottom: 0,
  },
  subFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 5,
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
  },
  swipeText: {
    color: '#818181',
    fontStyle: 'italic',
    fontSize: 16,
  },
  viewIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 16,
    height: 16,
  },
});

export default DetailTaskView;
