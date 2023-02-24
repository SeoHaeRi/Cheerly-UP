import '../static/Signup.css';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo.svg';
import ImgUploader from '../components/ImageUploader';
import { useCallback, useState } from 'react';
import axios from 'axios';

export default function MyPage() {
  // const userID = useSelector((state) => state.user.user.data.user_id);
  // const userNickname = useSelector(
  //   (state) => state.user.user.data.user_nickname,
  // );
  const token = useSelector((state) => state.token.token);
  const kakaoToken = useSelector((state) => state.token.kakaoToken);

  const navigate = useNavigate();
  const [image, setImage] = useState({
    image_file: '',
    preview_URL: '../assets/logo.svg',
  });

  const canSubmit = useCallback(() => {
    return image.image_file !== '';
  }, [image]);

  ///유저 정보 불러오기
  const [user, setUser] = useState('');

  function formatDate(string) {
    var options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return new Date(string).toLocaleDateString([], options);
  }
  axios.interceptors.request.use((config) => {
    /* JWT 토큰 */
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // else if (kakaoToken) {
    //   config.headers['Authorization'] = `Bearer ${kakaoToken}`;
    // }
    return config;
  });

  useEffect(() => {
    axios.post(`http://localhost:3030/user/verify`).then((res) => {
      const convertDate = formatDate(res.data.created_at);

      const userData = {
        id: res.data.id,
        date: convertDate,
        nickname: res.data.nickname,
      };
      setUser(userData);
    });
  }, []);

  return (
    <div className="scene flex">
      <section className="card">
        <h1 className="card__heading">
          <Logo />
        </h1>

        <ImgUploader setImage={setImage} preview_URL={image.preview_URL} />
        <div>{user.nickname}님, 안녕하세요!</div>
        <div>가입한 날짜: {user.date}</div>
        <button
          className="card__button"
          type="button"
          onClick={() => navigate('/mypost')}
        >
          <span>내가 쓴 글</span>
        </button>
        <button
          className="card__button"
          type="button"
          onClick={() => navigate('/mystudyrecord')}
        >
          <span>나의 공부 기록</span>
        </button>
        <button
          className="card__button"
          type="button"
          onClick={() => navigate('/mylife')}
        >
          <span>나의 라이프 기록</span>
        </button>
        <button
          className="card__button"
          type="button"
          onClick={() => navigate('/mypageedit')}
        >
          <span>유저 정보 수정</span>
        </button>
      </section>
    </div>
  );
}

/* 나의 공부,라이프 기록도 가져올 것인지*/
