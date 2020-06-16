import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://dev.dispatcher.dejavu2.fiyaris.id',
});

instance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JvbGUiOiJEcml2ZXIiLCJhdWQiOlsiYWxsc3RvcmUiXSwiY29tcGFueV9pZCI6IlRLLVRSU0NNUC0yMDE5MTAwOTE4MzQ1MDAwMDAwMDEiLCJ1c2VyX2lkIjoiVEstRFJWLTIwMTkxMDA5MTIwODEwMDAwMDAwNCIsInVzZXJfbmFtZSI6InRhbmFrYS55b2dpQHlhaG9vLmNvbSIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJjb21wYW55X25hbWUiOiJQVC4gRmFsbGluIFVuaXRlZCIsImV4cCI6MTU5MjMzNzczNywiYXV0aG9yaXRpZXMiOlsiRHJpdmVyIl0sImp0aSI6IjI4N2E0OTgwLWU1NDItNGYyNC04MWQ5LTUwMWEyZDI0NTA2ZiIsImNsaWVudF9pZCI6InRydWNraW5nY2xpZW50In0.3reGuMgRZrS63pxcqNYFRkOM6e8ujz-T-qnTI_HRjoY';

    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default instance;
