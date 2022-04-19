import ApiClient from './apiClient';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

export const refreshToken = async () => {
  const cookies = parseCookies();
  const user = JSON.parse(cookies.user);

  setCookie(null, 'user', JSON.stringify({ ...user, token: user.refresh }), {
    maxAge: process.env.REACT_APP_BASE_EXPIRE_DATE,
  });

  try {
    const res = await ApiClient('login/refresh', {
      method: 'POST',
    });

    setCookie(null, 'user', JSON.stringify(res), {
      maxAge: process.env.REACT_APP_BASE_EXPIRE_DATE,
    });
  } catch (err) {
    destroyCookie(null, 'user');
    window.location.replace('/login');
  }
};
