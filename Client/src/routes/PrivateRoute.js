import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtUtils } from '../utils/jwtUtils';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = (props) => {
  // 넘어오는 props를 파악하는게 중요.
  // path, component ....
  const getCookie = (name) => {
    const value = document.cookie.match(`(^|;)?${name}=([^;]*)(;|$)`);
    return value ? value[2] : null;
  };

  const token = useSelector((state) => state.token.token);
  const kakaoToken = getCookie('kakao');

  const { component: RouteComponent, path } = props;
  // redirectUrl은 로그인이 성공후 돌아갈 화면이다.
  if (!jwtUtils.isAuth(token)) {
    if (!kakaoToken) {
      alert('로그인이 필요한 페이지입니다.');
      return <Navigate to={`/signin?redirectUrl=${path}`} />;
    }
  }
  return <RouteComponent />;
};

export default PrivateRoute;
