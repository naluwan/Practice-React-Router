// @flow
import axios from 'axios';
import Cookies from 'js-cookie';

const JWT_TOKEN = 'JWT_TOKEN';

const axiosInstance = axios.create();

export const getJWTToken = () => {
  return Cookies.get(JWT_TOKEN);
};

export const cleanToken = () => {
  Cookies.remove(JWT_TOKEN);
  delete axiosInstance.defaults.headers.authorization;
};

export const setToken = (token: string) => {
  console.log('setToken', token);
  Cookies.set(JWT_TOKEN, token);
  axiosInstance.defaults.headers.authorization = `Bearer ${token}`;
};

export const verifyToken = (token) => {
  return axios('http://192.168.10.127:3030/users/react/auth', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(({ data }) => {
      console.log('驗證成功:', data);
      return data;
    })
    .catch(() => {
      console.log('verifyToken error');
      cleanToken();
      return Promise.reject();
    });
};

export type UserType = {
  CPY_ID: string,
  CPY_NAME: string,
  EMAIL: string,
  ISADMIN: boolean,
  EMAIL: string,
};
export type LoginResponseType = {
  token: string,
  user: UserType,
};

export const fetchLogin = (
  email: string,
  password: string,
): Promise<LoginResponseType> => {
  return axios
    .post('http://192.168.10.127:3030/users/react/login', {
      email,
      password,
      // expiresIn: '10000', // 20 seconds
    })
    .then(({ data }) => {
      setToken(data.token);
      return data;
    });
};

export const fetchLicense = (cpnyId) => {
  return axiosInstance
    .get(
      `http://192.168.10.127:3030/train/react/jh/trainingData?cpnyId=${cpnyId}`,
    )
    .then(({ data }) => {
      console.log(data);
      return data;
    });
};
