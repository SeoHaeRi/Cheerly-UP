const GETUSERINFO = 'GETUSERINFO';
const LOGOUT = 'LOGOUT';

const initialState = {
  user: {
    isLogIn: false,
    data: null,
  },
};

function setUserInfo(userInfo, isLogIn) {
  return {
    type: GETUSERINFO,
    userInfo,
    isLogIn,
  };
}

function logout() {
  localStorage.removeItem('accesstoken');
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_nickname');
  // window.location.href = '/';
  //일단 세션 정보를 지우는 걸로 로그아웃 설정
  //추후에 JWT 토큰을 사용한다면 수정해야함.
  return {
    type: LOGOUT,
  };
}

function user(state = initialState, action) {
  switch (action.type) {
    case GETUSERINFO:
      return {
        ...state,
        user: {
          isLogIn: action.isLogIn,
          data: action.userInfo,
        },
      };
    case LOGOUT:
      return {
        ...state,
        user: {
          isLogIn: false,
          data: null,
        },
      };
    default:
      return state;
  }
}

export default user;
export { setUserInfo, logout };
