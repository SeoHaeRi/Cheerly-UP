import React from 'react';
import styled from 'styled-components';

const BookDL = styled.dl`
  position: relative;
  width: 70%;
  cursor: pointer;
  overflow: hidden;
  .article {
    max-width: 50%;
    max-height: 50%;
  }
  .bookImg {
    img {
      width: 100%;
    }
  }
  .bookContents {
    position: absolute;
    text-align: left;
    position: absolute;
    bottom: 0;
    margin: 0 auto;
    background-color: rgba(36, 76, 112, 0.9);
    padding: 15px;
    opacity: 0;
    visibility: visible;
    width: 100%;
  }
  &:hover {
    .bookImg {
      img {
        opacity: 0.5;
      }
    }
    .bookContents {
      opacity: 1;
      transition: all 0.6s 0s;
      .bookPublisher {
        margin-bottom: 0.5rem;
        font-size: 1rem;
        font-weight: 300;
        color: var(--darkgrey-color);
        max-width: 50%;
      }
      .bookTitle {
        margin-bottom: 1.2rem;
        /* margin: 1rem; */
        font-size: 1rem;
        font-weight: 600;
        line-height: 25px;
        color: whitesmoke;
      }
    }
    .icons {
      display: flex;
      cursor: pointer;
      justify-content: flex-end;
      img {
        width: 3rem;
        height: 3rem;
        margin-left: 2rem;
      }
    }
  }
`;

export default function BookItem(props) {
  return (
    <>
      <BookDL>
        <div className="bookImg">
          <a href={props.url} target="_blank" rel="noreferrer">
            <img src={props.thumbnail} alt={props.thumbnail} />
          </a>
        </div>
        {/* <dt>
        </dt> */}
        <div className="bookContents">
          <div className="bookPublisher">
            {' '}
            <p>{props.blogname}</p>
          </div>
          <div className="bookTitle">{props.title}</div>
          {/* <article>{props.contents}</article> */}
        </div>
      </BookDL>
    </>
  );
}
