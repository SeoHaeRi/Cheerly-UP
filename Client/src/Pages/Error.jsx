import React from 'react';
import Emark from '../assets/inf.svg';

export default function Error() {
  return (
    <div>
      <p
        style={{
          fontFamily: 'Jua',
          textAlign: 'center',
          fontWeight: 'bold',
          height: '100vh',
          display: 'flex',
          fontSize: '35px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {' '}
        <img
          src={Emark}
          alt="bang"
          style={{
            height: '30px',
            fontWeight: 'bold',
            height: '15vh',
          }}
        />{' '}
        요청하신 페이지를 찾을 수 없습니다.
        <br /> 다시 한번 확인해주세요!
      </p>
    </div>
  );
}
