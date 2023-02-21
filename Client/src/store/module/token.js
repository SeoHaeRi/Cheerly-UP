const SETTOKEN = 'SETTOKEN';

const AuthInitialState = {
  token: null
}

export const setToken = (token) => ({
  type: SETTOKEN,
  token
})


const AuthReducer = (state = AuthInitialState, action) => {
  switch(action.type) {
    case SETTOKEN:
      return {
        ...state,
        token: action.token
      }
    default:
      return state;
  }
}
export default AuthReducer;