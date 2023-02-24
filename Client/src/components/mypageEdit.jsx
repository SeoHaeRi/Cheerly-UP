import React, { useRef, useState } from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import './signup/Signup2.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../store/module/token';

export default function MypageEdit() {
  const getCookie = (name) => {
    const value = document.cookie.match(`(^|;)?${name}=([^;]*)(;|$)`);
    return value ? value[2] : null;
  };
  const deleteCookie = (name) => {
    const date = new Date();
    document.cookie = `${name}='';expires=${date.toUTCString()};path=/`;
  };
  const token = useSelector((state) => state.token.token);
  const [isAuth, setIsAuth] = useState(false);
  const kakaoToken = getCookie('kakao');
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const userID = useSelector((state) => state.user.user.data.user_id);
  const userNickname = useSelector(
    (state) => state.user.user.data.user_nickname,
  );

  const nicknameRef = useRef();
  const pwRef = useRef();
  axios.interceptors.request.use((config) => {
    /* JWT 토큰 */
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  const editInfo = async () => {
    const nicknameInput = String(nicknameRef.current.value);
    const pwInput = String(pwRef.current.value);
    console.log(nicknameInput, pwInput);
    try {
      await axios.patch(`http://localhost:3030/user/edit/${userID}`, {
        id: userID,
        nickname: nicknameInput,
        pw: pwInput,
      });
      sessionStorage.setItem('user_nickname', nicknameInput);

      alert('회원정보 수정이 완료되었습니다');
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      alert('잠시후 다시 시도해주세요.');
    }
  };

  const deleteInfo = () => {
    const confirm = window.confirm(
      '정말로 탈퇴하시겠습니까? 그동안의 모든 기록들이 사라지게 됩니다.',
    );
    if (confirm === true) {
      axios
        .delete(`http://localhost:3030/user/${userID}`, {
          id: String(userID),
        })
        .then((res) => {
          alert('회원 탈퇴가 완료되었습니다.');

          if (kakaoToken) {
            deleteCookie('kakao');
            dispatch(setToken(''));
          } else {
            dispatch(setToken(''));
            sessionStorage.clear();
          }

          navigate('/');
        });
    }
  };

  return (
    <div className="scene flex">
      <section className="card">
        <h1 className="card__heading">
          <Logo />
          <p style={{ marginTop: '20px' }}>회원 정보 수정</p>
        </h1>
        <form className="card__form" id="form_login">
          <label htmlFor="id">현재 아이디</label>
          <input
            id="id"
            className="card__input"
            value={userID}
            type="text"
            name="id"
            disabled
            placeholder="ID"
          />
          {/* {아이디는 수정할 수 없다는 메시지} */}
          <label htmlFor="id">닉네임</label>
          <input
            id="id"
            className="card__input"
            type="text"
            name="id"
            required
            placeholder="nickname"
            ref={nicknameRef}
          />
          <label htmlFor="id">새 비밀번호</label>
          <input
            id="password"
            className="card__input"
            type="password"
            required
            placeholder="PW"
            name="pw"
            ref={pwRef}
          />
          {/* <label htmlFor="id">새 비밀번호 확인</label>
          <input
            id="password"
            className="card__input"
            type="password"
            required
            placeholder="PW"
            name="pw"
          /> */}

          <button className="card__button" type="button" onClick={editInfo}>
            <span>수정 하기</span>
          </button>

          <button className="card__button" type="button" onClick={deleteInfo}>
            <span>회원 탈퇴</span>
          </button>
        </form>
      </section>
    </div>
  );
}
