import axios from "axios";
// import client2 from "./client_refreshToken";

let headers = {};

async function saveToken(key, val) {
  await SecureStore.setItemAsync(key, val);
}

async function getToken(key) {
  await SecureStore.getItemAsync(key);
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/",
  // baseURL: "http://3.93.242.30:4000/",
  headers,
});

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const token = await SecureStore.getItemAsync("access");
//     console.log("access token is " + token + "\n");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// const refreshAccessToken = async () => {
//   const res = await client2.post("/auth/token", {}).catch((error) => {
//     console.log("refreshAccessToken() error: " + error.message + "\n");
//   });

//   return res.data.access_token;
// };

//Add a response interceptor

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;
//     // if (error.response.status === 401 && originalRequest.url ===
//     //   'http://192.168.1.2:3000/api/auth/token') {
//     //     console.log("____________________________")
//     //          router.push('/login');
//     //          return Promise.reject(error);
//     //      }
//     //console.log(originalRequest);

//     if (error.response.status === 401 && !originalRequest._retry) {
//       console.log("this error occured at " + originalRequest.url + "\n");
//       originalRequest._retry = true;

//       const access_token = await refreshAccessToken();
//       console.log("new access_token received : " + access_token + "\n");
//       saveToken("access", access_token);

//       axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
//       return axiosInstance(originalRequest);
//     }

//     // return Error object with Promise
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
