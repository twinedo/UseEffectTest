/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  Button,
} from 'react-native';
import axios from 'axios';
import OrderAPI from '../api/OrderAPI';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {decode} from '@mapbox/polyline';
import MapViewDirections from 'react-native-maps-directions';
import openMap from 'react-native-open-maps';
import {createOpenLink} from 'react-native-open-maps';

const {width, height} = Dimensions.get('window');
const GOOGLE_MAPS_APIKEY = 'AIzaSyCL8zOvpJQdp0l6hWuHP-ccfekTftSrWBo';

const getDirections = async (startLoc, destinationLoc) => {
  try {
    const KEY = 'AIzaSyCL8zOvpJQdp0l6hWuHP-ccfekTftSrWBo';
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}&language=id&units=metric&region=id`,
    );
    console.log(resp);
    let respJson = await resp.json();
    console.log(respJson);
    let points = decode(respJson.routes[0].overview_polyline.points);
    console.log(points);
    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1],
      };
    });

    return coords;
  } catch (error) {
    return error;
  }
};

const DetailMap2 = ({route}) => {
  const orderID = route.params;
  console.log(orderID.orderID);
  const [dataOrder, setDataOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState({
    latitude: -2.548926,
    longitude: 118.0148634,
    latitudeDelta: 0.04,
    longitudeDelta: 0.09,
  });
  const [destination, setDestination] = useState({
    latitude: -2.548926,
    longitude: 118.0148634,
    latitudeDelta: 0.04,
    longitudeDelta: 0.09,
  });
  const [region, setRegion] = useState({
    latitude: -6.2279143,
    longitude: 106.8253402,
    latitudeDelta: 0.04,
    longitudeDelta: 0.3,
  });
  const [coords, setCoords] = useState([]);
  const _map = useRef(null);
  const [mapView, setMapView] = useState('');

  useEffect(() => {
    getOrderData();
    Directions();
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
        const ori = JSON.parse(res.data.originLatLong);
        const dest = JSON.parse(res.data.destinationLatLong);
        setOrigin({
          latitude: JSON.parse(res.data.originLatLong).lat,
          longitude: JSON.parse(res.data.originLatLong).lng,
        });
        setDestination({
          latitude: JSON.parse(res.data.destinationLatLong).lat,
          longitude: JSON.parse(res.data.destinationLatLong).lng,
        });
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  };

  // useEffect(() => {
  //   Directions();
  //   return console.log('ini unmount');
  // }, []);

  const Directions = () => {
    getDirections(
      `${origin.latitude},${origin.longitude}`,
      `${destination.latitude},${destination.longitude}`,
    )
      .then((coord) => {
        console.log(coord);
        setCoords(coord);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const start = 'SOHO, New York City, NY';
  const end = 'Monumen Nasional, Jakarta';
  const travelType = 'drive';
  const navigate_mode = 'navigate';
  const zoom = 21;
  // const koor = {latitude: -6.3476733, longitude: 106.8662174};
  const koor = 'Noble House, Jakarta';

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
              {origin.latitude}
            </Text>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={region}
              onRegionChangeComplete={(reg) => setRegion(reg)}
              ref={(c) => setMapView(c)}>
              {coords.length > 0 && (
                <>
                  <Polyline
                    coordinates={coords}
                    strokeWidth={5}
                    strokeColor="blue"
                  />
                </>
              )}
              {!loading ? (
                <>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <ActivityIndicator size="large" color="blue" />
                  </View>
                </>
              ) : (
                <>
                  <Marker
                    coordinate={origin}
                    title={dataOrder.orderOriginCompanyName}
                  />
                  <Marker
                    coordinate={destination}
                    title={dataOrder.orderDestinationCompanyName}
                  />
                </>
              )}
              <MapViewDirections
                origin={{
                  latitude: origin.latitude,
                  longitude: origin.longitude,
                }}
                destination={{
                  latitude: destination.latitude,
                  longitude: destination.longitude,
                }}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={5}
                strokeColor="blue"
                mode="DRIVING"
                language="id"
                onStart={(params) => {
                  console.log(
                    `Started routing between "${params.origin}" and "${params.destination}"`,
                  );
                }}
                onReady={(result) => {
                  console.log(`Distance: ${result.distance} km`);
                  console.log(`Duration: ${result.duration} min.`);

                  mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: width / 20,
                      bottom: height / 20,
                      left: width / 20,
                      top: height / 20,
                    },
                  });
                }}
                onError={(errorMessage) => {
                  console.log('GOT AN ERROR. ' + errorMessage);
                }}
                resetOnChange={false}
              />
            </MapView>
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
          <Text>Origin doank: {origin.latitude}</Text>
          <Text>Destination doank: {destination.latitude}</Text>
          <Button
            title="Go To Monas"
            onPress={createOpenLink({
              travelType,
              end: koor,
              navigate_mode,
              zoom,
              provider: 'google',
            })}
          />
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
