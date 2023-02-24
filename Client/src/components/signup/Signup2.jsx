import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Signup2.css';
import { ReactComponent as Logo } from '../../assets/logo.svg';

const SignUp = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    id: Yup.string().required('아이디를 입력하세요'),
    nickname: Yup.string()
      .min(2, '닉네임은 최소 2글자 이상입니다!')
      .max(10, '닉네임은 최대 10글자입니다!')
      .matches(
        /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
        '닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!',
      )
      .required('닉네임을 입력하세요!'),
    pw: Yup.string()
      .min(8, '비밀번호는 최소 8자리 이상입니다')
      .max(16, '비밀번호는 최대 16자리입니다!')
      .required('비밀번호를 입력하세요!')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
        '알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다!',
      ),
    pw2: Yup.string()
      .oneOf([Yup.ref('pw'), null], '비밀번호가 일치하지 않습니다!')
      .required('필수 입력 값입니다!'),
  });
  const submit = async (values) => {
    const { id, nickname, pw } = values;
    try {
      await axios.post('http://localhost:3030/user/signup', {
        id,
        nickname,
        pw,
      });
      toast.success(
        <h3>
          회원가입이 완료되었습니다.
          <br />
          로그인 하세요😎
        </h3>,
        {
          position: 'top-center',
          autoClose: 2000,
        },
      );
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      toast.error(e.response.data.message + '😭', {
        position: 'top-center',
      });
    }
  };

  // 카카오 로그인 버튼 클릭
  const viewKakao = () => {
    window.location.href = 'http://localhost:3030/user/kakao';
  };

  return (
    <Formik
      initialValues={{
        id: '',
        nickname: '',
        pw: '',
        pw2: '',
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
      validateOnMount={true}
    >
      {({ values, handleSubmit, handleChange, errors }) => (
        <div className="signup-wrapper">
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
                <div className="input-label">닉네임</div>
                <TextField
                  value={values.nickname}
                  name="nickname"
                  variant="outlined"
                  onChange={handleChange}
                />
                <div className="error-message">{errors.nickname}</div>
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
              <div className="input-forms-item">
                <div className="input-label">비밀번호 확인</div>
                <TextField
                  value={values.password2}
                  name="pw2"
                  variant="outlined"
                  type="password"
                  onChange={handleChange}
                />
                <div className="error-message">{errors.pw2}</div>
              </div>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                회원가입
              </Button>
              <button
                className="card__button1"
                type="button"
                onClick={viewKakao}
              >
                <span>카카오로 가입하기</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
