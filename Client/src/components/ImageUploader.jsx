import '../static/Imgupload.css';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ImageUploader = ({ preview_URL, setImage }) => {
  const userID = useSelector((state) => state.user.user.data.user_id);
  let inputRef;

  const token = useSelector((state) => state.token.token);
  const kakaoToken = useSelector((state) => state.token.kakaoToken);

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

  const [img, setImg] = useState('');
  const [user, setUser] = useState('');
  const [route, setRoute] = useState('');

  useEffect(() => {
    axios.post(`http://localhost:3030/user/verify`).then((res) => {
      console.log(res.data);
      const data = res.data;
      setImg(data.profile_img);
      setUser(res.data);
      setRoute('http://localhost:3030/user/' + data.profile_img);
    });
  }, []);

  // const saveImage = (e) => {
  //   e.preventDefault();
  //   const fileReader = new FileReader();
  //   if (e.target.files[0]) {
  //     fileReader.readAsDataURL(e.target.files[0]);
  //   }
  //   fileReader.onload = () => {
  //     setImage({
  //       image_file: e.target.files[0],
  //       preview_URL: fileReader.result,
  //     });
  //   };
  // };

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
    const formData = new FormData();

    formData.append('id', String(userID));
    formData.append('pw', String(user.pw));
    formData.append('nickname', String(user.nickname));
    formData.append('file', pickedFile);
    console.log(pickedFile);

    const Data = {
      id: formData.get('id'),
      pw: formData.get('pw'),
      nickname: formData.get('nickname'),
      file: formData.get('file'),
    };

    axios
      .patch(`http://localhost:3030/user/upload/${userID}`, Data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        alert('이미지를 수정하였습니다.');
      });
  };

  console.log(route);

  //기본 이미지로 변경 PATCH
  const defaultImg = () => {
    axios
      .patch(`http://localhost:3030/user/image/${userID}`, { id: userID })
      .then((res) => {
        alert('이미지를 수정하였습니다.');
        setRoute('http://localhost:3030/user/user_default_img.jpg');
      });
  };

  return (
    <div className="uploader-wrapper">
      {/* <form encType="multipart/form-data"> */}
      <input
        type="file"
        accept="image/*"
        onChange={saveImage}
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: 'none' }}
      />
      {/* </form> */}
      <div className="img-wrapper">
        <img src={route}></img>
      </div>
      <div className="upload-button">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => inputRef.click()}
        >
          😎사진 고르기😎
        </Button>
      </div>
      <button onClick={saveImg}>저장</button>
      <button onClick={defaultImg}>기본 이미지</button>
    </div>
  );
};

export default ImageUploader;
