import React from 'react';
import Pagination from 'react-js-pagination';
import '../static/Paging.css';

const Paging = ({ page, count, setPage }) => {
  return (
    <div>
      <Pagination
        activePage={page}
        itemsCountPerPage={5}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={'<'}
        nextPageText={'>'}
        onChange={setPage}
      />
    </div>
  );
};

export default Paging;
