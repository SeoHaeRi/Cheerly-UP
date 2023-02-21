import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import { json, useNavigate } from 'react-router-dom';
import '../static/Signup2.css';
import { Cookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';

const SignUp = () => {
  const cookies = new Cookies();

  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    id: Yup.string().required('아이디를 입력하세요'),

    pw: Yup.string()
      .min(8, '비밀번호는 최소 8자리 이상입니다')
      .max(16, '비밀번호는 최대 16자리입니다!')
      .required('패스워드를 입력하세요!')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
        '알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다!',
      ),
  });
  const submit = async (values) => {
    const { id, pw } = values;
    try {
      const { data } = await axios.post('http://localhost:3030/user/login', {
        id,
        pw,
      });
      toast.success(
        <h3>
          로그인 완료되었습니다.😎
          <br />
        </h3>,
        {
          position: 'top-center',
          autoClose: 2000,
        },
      );
      setTimeout(() => {
        const decodedUserInfo = jwt_decode(data.accessToken);

        sessionStorage.setItem('user_id', decodedUserInfo.id);
        sessionStorage.setItem('user_nickname', decodedUserInfo.nickname);

        window.location.href = '/';
      }, 2000);
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      toast.error(e.response.data.message + '😭', {
        position: 'top-center',
      });
    }
  };

  return (
    <Formik
      initialValues={{
        id: '',
        pw: '',
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
      validateOnMount={true}
    >
      {({ values, handleSubmit, handleChange, errors }) => (
        <div className="signup-wrapper">
          <ToastContainer />
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="input-forms">
              <div className="input-forms-item">
                <div className="input-label">아이디</div>
                <TextField
                  value={values.id}
                  name="id"
                  variant="outlined"
                  onChange={handleChange}
                />
                <div className="error-message">{errors.id}</div>
              </div>

              <div className="input-forms-item">
                <div className="input-label">비밀번호</div>
                <TextField
                  value={values.pw}
                  name="pw"
                  variant="outlined"
                  type="password"
                  onChange={handleChange}
                />
                <div className="error-message">{errors.pw}</div>
              </div>

              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                로그인
              </Button>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
