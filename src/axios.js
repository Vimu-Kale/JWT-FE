import axios from "axios";

const BASE_URL = "http://localhost:4000";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// axiosInstance.all = axios.all;
// axiosInstance.spread = axios.spread;

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const { accessToken } = useSelector((state) => state.userAuth);
//     // const accessToken = store?.getState().userAuth?.accessToken;
//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;
//     const dispatch = useDispatch();
//     if (err.response) {
//       if (err.response.status === 403 && !originalConfig._retry) {
//         originalConfig._retry = true;
//         try {
//           const rs = await dispatch(getToken()).unwrap();
//           console.log("axios token resp", rs);
//           axiosInstance.defaults.headers.common[
//             "Authorization"
//           ] = `Bearer ${rs.accessToken}`;

//           return axiosInstance(originalConfig);
//         } catch (_error) {
//           if (_error.response && _error.response.date) {
//             return Promise.reject(_error.response.data);
//           }
//           return Promise.reject(_error);
//         }
//       }
//       //   if (err.response.status === 403 && err.response.data) {
//       //     return Promise.reject(err.response.data);
//       //   }
//     }
//     return Promise.reject(err);
//   }
// );
