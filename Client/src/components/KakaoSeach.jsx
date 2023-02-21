import React, { useState } from 'react';
import axios from 'axios';

// const KAKAO_KEY = ""
const kakao = axios.create({
  baseURL: 'http://dapi.kakao.com',
  headers: {
    Authorization: 'KakaoAK' + process.env.REACT_APP_KAKAO_API_KEY,
  },
});

let searchOption = {
  url: 'https://dapi.kakao.com/v3/search/book?target=title', // target에 해당하는 것을 적기
  method: 'GET',
  headers: {
    Authorization: 'KakaoAK (REST API KEY)',
  },
  qs: {
    query: '미움받을용기', // 현재 책으로 검색할 것이라 책 제목을 적었다.
  },
  encoding: 'UTF-8',
};

const [books, setBooks] = useState([]);

const getBooks = async () => {
  const search = value; //검색
  try {
    if (search === '') {
      setBooks([]); //값이 없을때
    } else {
      const params = {
        query: search,
        size: 45,
        target: searchOption, // 'title' or 'person'
      };
      const result = await KakaoSearch(params);
      if (result) {
        setBooks(result.data.documents);
        // Navigate('/books', { state: result.data.document });
      } else {
        console.log('fail');
      }
    }
  } catch (e) {
    console.log('error', e);
  }
};

export const KakaoSearch = (params) => {
  return kakao.get('/v3/search/book', { params });
};

// export default function KakaoSeach() {
//   return (
//     <>
//     </>
//   )
// }
