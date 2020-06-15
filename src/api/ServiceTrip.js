import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
  baseURL: 'https://d-trip.truckking.id',
});

instance.interceptors.request.use(
  async (config) => {
    // var token = await AsyncStorage.getItem('token');
    config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JvbGUiOiJEcml2ZXIiLCJhdWQiOlsiYWxsc3RvcmUiXSwiY29tcGFueV9pZCI6IlRLLVRSU0NNUC0yMDE5MTAwOTE4MzQ1MDAwMDAwMDEiLCJ1c2VyX2lkIjoiVEstRFJWLTIwMTkxMDA5MTIwODEwMDAwMDAwNCIsInVzZXJfbmFtZSI6InRhbmFrYS55b2dpQHlhaG9vLmNvbSIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJjb21wYW55X25hbWUiOiJQVC4gRmFsbGluIFVuaXRlZCIsImV4cCI6MTU5MDgzOTQ0OCwiYXV0aG9yaXRpZXMiOlsiRHJpdmVyIl0sImp0aSI6IjJiZDhlZGZhLTBiMjctNGVhYS04YzFiLWNiZDBmZGYxMjQxYSIsImNsaWVudF9pZCI6InRydWNraW5nY2xpZW50In0._T7frQjJ6I6iqnC8l1PUM2vGTc4FDNJFAA_V-hsRqGY';

    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default instance;
