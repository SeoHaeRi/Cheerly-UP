import axios from 'axios';

const Kakao = axios.create({
  baseURL: 'https://dapi.kakao.com', // 공통 요청 경로를 지정해준다.
  headers: {
    Authorization: 'KakaoAK d2551f0d028162f6cd352aa455d1dd6c ', // 공통으로 요청 할 헤더
  },
});
// const Kakao = axios.create({
//   baseURL: 'http://dapi.kakao.com',
//   headers: {
//     Authorization: 'KakaoAK' + process.env.REACT_APP_KAKAO_API_KEY,
//   },
// });

// search blog api
export const blogSearch = (params) => {
  return Kakao.get('/v3/search/book?target=title', { params });
};

export default function api() {
  return <></>;
}
