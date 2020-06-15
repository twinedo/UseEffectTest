import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';

const DetailMap3 = () => {
  const [region, SetRegion] = useState({
    latitude: -6.2279143,
    longitude: 106.8253402,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log(region);
  }, []);

  const onRegionChangeComplete = (reg) => {
    console.log(reg);
    SetRegion(reg);
  };

  return (
    <>
      {!loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator color="blue" size="large" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <MapView
            region={region}
            style={{flex: 1}}
            onRegionChangeComplete={onRegionChangeComplete}
          />
        </View>
      )}
    </>
  );
};

export default DetailMap3;

const styles = StyleSheet.create({});
