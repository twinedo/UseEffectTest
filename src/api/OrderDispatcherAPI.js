import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://dev.dispatcher.dejavu2.fiyaris.id',
});

instance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3JvbGUiOiJEcml2ZXIiLCJhdWQiOlsiYWxsc3RvcmUiXSwiY29tcGFueV9pZCI6IlRLLVRSU0NNUC0yMDE5MTAwOTE4MzQ1MDAwMDAwMDEiLCJ1c2VyX2lkIjoiVEstRFJWLTIwMTkxMDA5MTIwODEwMDAwMDAwNCIsInVzZXJfbmFtZSI6InRhbmFrYS55b2dpQHlhaG9vLmNvbSIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJjb21wYW55X25hbWUiOiJQVC4gRmFsbGluIFVuaXRlZCIsImV4cCI6MTU5MjEzNTY0OSwiYXV0aG9yaXRpZXMiOlsiRHJpdmVyIl0sImp0aSI6ImQ0ZTZkZDkzLTdmNTUtNDExZS1hM2FiLWY0MTlkNmYzOGM2YSIsImNsaWVudF9pZCI6InRydWNraW5nY2xpZW50In0.q1bb2n9_fQtgbEZ4vFSAmg8HyBkkJIiQfeE8xiK_k0Y';

    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default instance;
