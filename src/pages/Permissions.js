import React from 'react';
import {Platform, Alert} from 'react-native';
import {requestMultiple, PERMISSIONS, request} from 'react-native-permissions';

export const Permissions = async () => {
  if (Platform.OS === 'android') {
    await requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_PHONE_STATE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ])
      .then((status) => {
        console.log('LOKASI', status[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
        console.log('CAMERA', status[PERMISSIONS.ANDROID.CAMERA]);
        if (status[PERMISSIONS.ANDROID.CAMERA] == 'denied') {
          Alert.alert(
            'Warning!!',
            'Aplikasi ini membutuhkan akses Kamera, mohon untuk diijinkan',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  request(PERMISSIONS.ANDROID.CAMERA)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                },
              },
            ],
          );
        }
        console.log(
          'RSTORAGE',
          status[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE],
        );
        console.log(
          'WSTORAGE',
          status[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE],
        );
        console.log('PHONE', status[PERMISSIONS.ANDROID.READ_PHONE_STATE]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export default Permissions;
