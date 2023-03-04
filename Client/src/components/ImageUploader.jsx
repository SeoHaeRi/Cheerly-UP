import '../static/Imgupload.css';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ImageUploader = ({ preview_URL, setImage }) => {
  const userID = useSelector((state) => state.user.user.data.user_id);
  let inputRef;

  const token = useSelector((state) => state.token.token);

  axios.interceptors.request.use((config) => {
    /* JWT 토큰 */
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  const [img, setImg] = useState('');
  const [user, setUser] = useState('');
  const [route, setRoute] = useState('');
  const [Viewbutton, SetViewButton] = useState(false);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER_HOST}/user/verify`)
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        setImg(data.profile_img);
        setUser(res.data);
        setRoute(
          `${process.env.REACT_APP_SERVER_HOST}/user/` + data.profile_img,
        );
      });
  }, []);

  const [file, setFile] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [pickedFile, setPickedFile] = useState('');

  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });

      setRoute(fileReader.result);
    };
    ///////

    setPickedFile(e.target.files[0]);

    console.log(e.target.files);
    console.log(pickedFile);
  };

  //사진 저장 버튼 누르면
  const saveImg = async () => {
    if (Viewbutton === true) {
      const formData = new FormData();

      formData.append('id', String(userID));
      formData.append('pw', String(user.pw));
      formData.append('nickname', String(user.nickname));
      formData.append('file', pickedFile);

      const Data = {
        id: formData.get('id'),
        pw: formData.get('pw'),
        nickname: formData.get('nickname'),
        file: formData.get('file'),
      };

      axios
        .patch(
          `${process.env.REACT_APP_SERVER_HOST}/user/upload/${userID}`,
          Data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then((res) => {
          alert('이미지를 수정하였습니다.');
        });
    } else {
      alert('사진을 골라주세요!');
    }
  };

  console.log(route);

  //기본 이미지로 변경 PATCH
  const defaultImg = () => {
    axios
      .patch(`${process.env.REACT_APP_SERVER_HOST}/user/image/${userID}`, {
        id: userID,
      })
      .then((res) => {
        alert('이미지를 기본 이미지로 변경하였습니다.');
        setRoute(
          `${process.env.REACT_APP_SERVER_HOST}/user/user_default_img.jpg`,
        );
      });
  };

  return (
    <div className="uploader-wrapper">
      <input
        type="file"
        accept="image/*"
        onChange={saveImage}
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: 'none' }}
      />
      <div className="img-wrapper">
        <img src={route}></img>
      </div>
      <div className="upload-button">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            inputRef.click();
            SetViewButton(true);
          }}
        >
          😎사진 고르기😎
        </Button>
      </div>

      <div className="btn_box">
        <Button
          color="primary"
          variant="contained"
          type="submit"
          onClick={saveImg}
          size="large"
          style={{ fontFamily: "'Jua', sans-serif", marginTop: '40px' }}
        >
          저장
        </Button>
        <Button
          onClick={defaultImg}
          color="primary"
          variant="contained"
          type="submit"
          size="large"
          style={{
            fontFamily: "'Jua', sans-serif",
            marginLeft: '20px',
            marginTop: '39px',
          }}
        >
          기본 이미지
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
