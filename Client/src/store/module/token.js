const SETTOKEN = 'SETTOKEN';
const SETKAKAOTOKEN = 'SETKAKAOTOKEN';

const AuthInitialState = {
  token: null,
  kakaoToken: null,
};

export const setToken = (token) => ({
  type: SETTOKEN,
  token,
});

export const setKakaoToken = (kakaoToken) => ({
  type: SETKAKAOTOKEN,
  kakaoToken,
});
const token = (state = AuthInitialState, action) => {
  switch (action.type) {
    case SETTOKEN:
      return {
        ...state,
        token: action.token,
      };
    case SETKAKAOTOKEN:
      return {
        ...state,
        kakaoToken: action.kakaoToken,
      };
    default:
      return state;
  }
};
export default token;
