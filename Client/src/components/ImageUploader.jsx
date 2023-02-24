import '../static/Imgupload.css';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ImageUploader = ({ preview_URL, setImage }) => {
  const userID = useSelector((state) => state.user.user.data.user_id);
  let inputRef;

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

  let pickedFile = [];

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
    };
    ///////

    if (e.target.files) {
      pickedFile.push(e.target.files[0]);

      setFile([pickedFile]);
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    console.log(e.target.files);
    console.log(pickedFile[0]);
  };

  const saveImg = async () => {
    const formData = new FormData();

    formData.append('file', pickedFile[0]);

    try {
      const response = await axios({
        method: 'patch',
        url: `http://localhost:3030/user/image/${userID}`,
        data: { formData, userID, pickedFile },
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (e) {
      console.log(e);
    }
  };

  //삭제
  const defaultImg = () => {};

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
        <img src={preview_URL} />
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
