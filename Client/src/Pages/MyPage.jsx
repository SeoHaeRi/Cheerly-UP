import '../static/Signup.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo.svg';
import ImgUploader from '../components/ImageUploader';
import { useCallback, useState } from 'react';
import axios from 'axios';

export default function MyPage() {
  const userID = useSelector((state) => state.user.user.data.user_id);
  const userNickname = useSelector(
    (state) => state.user.user.data.user_nickname,
  );

  const navigate = useNavigate();
  const [image, setImage] = useState({
    image_file: '',
    preview_URL: '../assets/logo.svg',
  });

  const canSubmit = useCallback(() => {
    return image.image_file !== '';
  }, [image]);

  const handleSubmit = useCallback(async () => {
    const formData = new FormData();
    formData.append('file', image.image_file);

    console.log();

    // axios
    //   .patch(
    //     `http://localhost:3030/user/image/${userID}`,
    //     {
    //       userId: userID,
    //       profile_img: formData,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     },
    //   )
    //   .then((res) => alert('수정!'));
    // window.alert('😎프로필 이미지 등록이 완료되었습니다😎');
  }, [canSubmit]);

  return (
    <div className="scene flex">
      <section className="card">
        <h1 className="card__heading">
          <Logo />
        </h1>

        <ImgUploader setImage={setImage} preview_URL={image.preview_URL} />
        <button className="card_button" onClick={handleSubmit}>
          등록
        </button>
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
        <div className="card__button" onClick={() => navigate('/myinfo')}>
          유저 정보
        </div>
      </section>
    </div>
  );
}

/* 나의 공부,라이프 기록도 가져올 것인지*/
