import React, { useEffect, useState } from 'react';
import { blogSearch } from '../components/api';
import styled from 'styled-components';
import BookItem from '../components/BookItem';
import BookList from '../components/BookList';
const LiBraryWrapper = styled.div`
  font-family: 'Jua', sans-serif;
  /* font-family: 'DM Serif Text', serif; */
  width: 90rem;
  margin: 3rem auto;
  border-radius: 4px;
  background-color: var(--white-color);
  padding: 2rem;
  overflow: hidden;
  box-shadow: 0 10px 10px rgb(217 228 255), 0 12px 11px rgba(0, 0, 0, 0.23);
  .input_search {
    width: 100%;
    height: 3rem;
    border-left-width: 0;
    border-right-width: 0;
    font-size: 1.5rem;
    padding: 10px;
    /*  
    background: skyblue;
    border-color: white;
    border-radius: 10px; */
  }
  .title {
    font-family: 'Jua', sans-serif;
    color: var(--navy-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
  }
  .books {
    display: flex;
  }
  .searchBox {
    position: relative;
    width: 70%;
    height: 5rem;
    padding: 0 10rem;
    margin: 4rem auto;
    background: #fff;
    text-align: left;
    box-sizing: border-box;
  }
`;
const BookItemWrapper = styled.li`
  background-color: var(--grey-color);
  display: grid;
  width: 90rem;
  min-height: 40rem;
  margin: auto;
  grid-gap: 3rem;
  grid-template-columns: repeat(4, 1fr);
`;

const Healing = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query.length > 0) {
      blogSearchHttpHandler(query, true); // 컴포넌트 마운트 후에, 함수를 호출한다.
    }
  }, [query]);

  // 엔터를 눌렀을 때 호출 되는 함수
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      setQuery(text);
    }
  };

  // text 검색어가 바뀔 때 호출되는 함수.
  const onTextUpdate = (e) => {
    setText(e.target.value);
  };

  // blog search 핸들러
  const blogSearchHttpHandler = async (query, reset) => {
    // paramter 설정
    const params = {
      query: query,
      sort: 'accuracy', // accuracy | recency 정확도 or 최신
      page: 1, // 페이지번호
      size: 12, // 한 페이지에 보여 질 문서의 개수
    };

    const { data } = await blogSearch(params); // api 호출
    // console.log(data); // 결과 호출
    if (reset) {
      setBlogs(data.documents);
    } else {
      setBlogs(blogs.concat(data.documents));
    }
  };

  return (
    <LiBraryWrapper>
      <h1 className="title">LIBRARY</h1>
      <div className="searchBox">
        <input
          type="search"
          placeholder="검색어를 입력하세요..."
          name="query"
          className="input_search"
          onKeyDown={onEnter} //enter
          onChange={onTextUpdate} //change
          value={text} //view
        />
      </div>
      <ul>
        {/* <BookList /> */}
        <BookItemWrapper>
          {' '}
          {blogs.map((blog, index) => (
            <BookItem
              key={index}
              thumbnail={blog.thumbnail}
              title={blog.title}
              blogname={blog.blogname}
              contents={blog.contents}
              url={blog.url}
            />
          ))}
        </BookItemWrapper>
      </ul>
    </LiBraryWrapper>
  );
};

export default Healing;
