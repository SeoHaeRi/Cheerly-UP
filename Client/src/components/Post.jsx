// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import elect from '../assets/elect.svg';
// import axios from 'axios';
// import inf from '../assets/inf.svg';
// import Paging from '../components/Paging';

// const Maindiv = styled.div`
//   background-color: transparent;
// `;
// const Earlydiv = styled.div`
//   background-color: transparent;
//   position: absolute;
//   top: 18%;
//   left: 10%;
// `;
// const Mainp = styled.p`
//   position: relative;
//   top: 15rem;
//   left: 15%;
//   color: #1363df;
//   font-size: 3.5rem;
// `;

// const GroupHeader = styled.div`
//   position: relative;
//   width: 100%;
//   height: 4rem;
//   top: 20px;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   background-color: #44adff;
//   font-size: 2.5rem;
//   font-weight: 900;
//   color: white;
// `;

// const Titlediv = styled.div`
//   background-color: transparent;
//   display: flex;
//   align-content: center;
//   /* justify-content: center; */
//   margin: 50px;
//   /* padding: 50px; */
//   width: 34rem;
//   height: 6.5rem;
//   border-radius: 20px;
//   border: #b6dfff solid 4px;
// `;

// const Groupbadge = styled.p`
//   color: white;
//   position: absolute;
//   /* left: 50%; */
//   font-size: 1rem;
//   background-color: #66bcff;
//   height: 30px;
//   width: 84%;
//   text-align: center;
//   border-radius: 10px;
// `;
// const Grouptitle = styled.p`
//   color: #44adff;
//   font-size: 1.15rem;
//   top: 40%;
//   vertical-align: center;
//   font-weight: 800;
//   position: relative;
// `;
// const Groupurl = styled.a`
//   color: #3f683f;
//   position: absolute;
//   left: 80%;
//   font-size: 1rem;
// `;

// const Imgdiv = styled.img`
//   position: absolute;
//   top: 15%;
//   left: 55%;
//   width: 50rem;
//   height: 50rem;
// `;

// const Infdiv = styled.img`
//   position: relative;
//   top: 10%;
//   width: 20%;
// `;
// export default function Post() {
//   return (
//     <>
//       {loading && <div> loading... </div>}
//       {groups.map((group, index) => {
//         return (
//           <Titlediv key={index}>
//             <Infdiv src={inf} />
//             <Groupbadge>{group.badge}</Groupbadge>
//             <br />
//             <Grouptitle>{group.title}</Grouptitle>
//             <br />
//             <Groupurl href={group.url} target="_blank">
//               Inflearn
//             </Groupurl>
//           </Titlediv>
//         );
//       })}
//     </>
//   );
// }
