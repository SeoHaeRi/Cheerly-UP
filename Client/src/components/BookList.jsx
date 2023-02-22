// import React from 'react';
// import styled from 'styled-components';

// const BookLi = styled.li`
//   background: #136;
//   position: relative;
//   right: 0px;
//   top: 30px;
//   color: white;
//   width: 40rem;
//   /* height: 50%; */
//   text-align: center;
//   margin: 0 auto;
//   padding: 10px 50px;
// `;

// export default function BookList(props) {
//   return (
//     <>
//       <BookListWrapper>
//         {blogs.map((blog, index) => {
//           const { index, thumbnail, title, blogname, contents, url } = book;
//           const click = () => {
//             addToOrder(isbn);
//           };
//           return (
//             <BookItem key={isbn}>
//               <div className="bookImg">
//                 <a href={url} target="_blank" rel="noreferrer">
//                   <img src={thumbnail} alt={thumbnail} />
//                 </a>
//               </div>
//               <div className="bookContents">
//                 <div className="bookPublisher">{publisher}</div>
//                 <div className="bookTitle">{title}</div>
//                 <div className="bookPrice">
//                   &#8361; {sale_price.toLocaleString()}
//                   <strike>{price.toLocaleString()}</strike>{' '}
//                 </div>
//                 <div className="icons">
//                   <img src="/img/cart.png" alt="cart" onClick={click} />
//                   <a href={url} target="_blank" rel="noreferrer">
//                     <img src="/img/increase.png" alt="increase" />
//                   </a>
//                 </div>
//               </div>
//             </BookItem>
//           );
//         })}
//       </BookListWrapper>
//       );
//       <BookLi>
//         <dl>
//           <dt>
//             <img src={props.thumbnail} alt={props.thumbnail} />
//           </dt>
//           <dd>
//             <h3>{props.title}</h3>
//             <p>{props.blogname}</p>
//             <article>{props.contents}</article>
//             <a href={props.url}>링크 바로가기</a>
//           </dd>
//         </dl>
//       </BookLi>
//       {blogs.map((blog, index) => (
//         <BookItem
//           key={index}
//           thumbnail={blog.thumbnail}
//           title={blog.title}
//           blogname={blog.blogname}
//           contents={blog.contents}
//           url={blog.url}
//         />
//       ))}
//     </>
//   );
// }
