import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import { json, useNavigate, useSearchParams } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/module/token';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import './Signin2.css';

const SignIn = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const validationSchema = Yup.object().shape({
    id: Yup.string().required('아이디를 입력하세요'),

    pw: Yup.string()
      .min(8, '비밀번호는 최소 8자리 이상입니다')
      .max(16, '비밀번호는 최대 16자리입니다!')
      .required('비밀번호를 입력하세요!')
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

      const decodedUserInfo = jwt_decode(data.accessToken);

      sessionStorage.setItem('accesstoken', data.accessToken);
      sessionStorage.setItem('user_id', decodedUserInfo.id);
      sessionStorage.setItem('user_nickname', decodedUserInfo.nickname);

      dispatch(setToken(data.accessToken));
      const redirectUrl = searchParams.get('redirectUrl');

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
      // redirecturl이 쿼리스트링으로 존재하면
      // 원래 가고자했던 페이지로 돌아가기
      setTimeout(() => {
        if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          window.location.href = '/';
        }
      }, 2000);
    } catch (e) {
      // 로그인 실패시
      toast.error('다시 한 번만 확인해주세요 !' + '😭', {
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
        <div className="signin-wrapper">
          <Logo />
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

export default SignIn;
