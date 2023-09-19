/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios, { AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import handleError from '../utils/message';

export const firebaseConfig = {
  apiKey: "AIzaSyDlVRo9PJvCmtXv9hF5-5TH5_lOc-586b4",
  authDomain: "chat-suport-2be9f.firebaseapp.com",
  projectId: "chat-suport-2be9f",
  storageBucket: "chat-suport-2be9f.appspot.com",
  messagingSenderId: "452243484795",
  appId: "1:452243484795:web:0a9c2aa480a06ca825f2de",
  measurementId: "G-GCNGD60PEC"
};

// firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();

interface myAxios extends CreateAxiosDefaults{
  myPost(): any;

}

export const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
});

async function myPost<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>{
  try{
    return api.post(url, data, config);
  }
  catch(err){
    handleError(err)
  }
  return {} as R;
}

api.interceptors.request.use(
  async config => {

    const accessToken = localStorage.getItem('@token:accessToken');
    console.log("configurando o axios com o token", accessToken)
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default api;

export async function refreshAccessToken() {
  try {
    const credentials = localStorage.getItem('@token:refreshToken');

    if (typeof credentials === 'string') {
      const { data } = await api.put('/users/session', {
        refresh_token: credentials,
      });
      localStorage.setItem('@token:accessToken', data.access_token);
      localStorage.setItem('@token:refreshToken', data.refresh_token);
      return data?.access_token;
    }
  } catch (error) {
    localStorage.clear();
    window.location.href = '/';
  }

  localStorage.clear();
  window.location.href = '/';
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
        error.response.status === 401 &&
        !originalRequest.retry &&
        originalRequest.url !== '/user/session'
      ) {
      originalRequest.retry = true;
      const accessToken = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);
