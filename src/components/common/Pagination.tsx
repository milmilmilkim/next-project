import React from 'react';
import { useState, useEffect } from 'react';

interface PaginationProps {
  totalRows: number;
  currentPage: number;
  perPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  totalRows,
  currentPage,
  perPage,
  setCurrentPage,
}) => {
  const [pages, setPages] = useState<number[]>([]);
  const [groupNum, setGroupNum] = useState<number>(1);
  const [firstPage, setFirstPage] = useState<number>(1);

  const GROUP_SIZE = 5;
  const LAST_PAGE = Math.ceil(totalRows / perPage);
  const LAST_GROUP = Math.ceil(LAST_PAGE / GROUP_SIZE);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const nextGroup = () => {
    const nextGroupNum = groupNum + 1;
    changeGroup(nextGroupNum);
  };

  const prevGroup = () => {
    const nextGroupNum = groupNum - 1;
    changeGroup(nextGroupNum);
  };

  const changeGroup = (nextGroupNum: number) => {
    setFirstPage((nextGroupNum - 1) * GROUP_SIZE + 1);
    setGroupNum(nextGroupNum);
  };

  useEffect(() => {
    const pages = new Array(GROUP_SIZE);
    if (totalRows > 0) {
      for (let i = firstPage; i <= GROUP_SIZE * groupNum; i++) {
        pages.push(i);
        if (i === LAST_PAGE) break;
      }
    }
    setPages(pages);
  }, [firstPage, totalRows]);

  useEffect(() => {
    const groupNum = Math.floor((currentPage - 1) / GROUP_SIZE) + 1;
    changeGroup(groupNum);
  }, [currentPage]);

  return (
    <div>
      <ul>
        {groupNum > 1 && <li onClick={() => changeGroup(1)}>⇤</li>}
        {groupNum > 1 && <li onClick={prevGroup}>◀︎</li>}
        {pages?.map((page) => (
          <li
            className={currentPage === page ? 'active' : ''}
            key={page}
            onClick={() => changePage(page)}>
            {page}
          </li>
        ))}
        {groupNum < LAST_GROUP && <li onClick={nextGroup}>►</li>}
        {groupNum < LAST_GROUP && (
          <li onClick={() => changeGroup(LAST_GROUP)}>⇥</li>
        )}
      </ul>
      <style jsx>
        {`
          ul {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;
          }
          li {
            border: 1px solid #000;
            text-align: center;
            width: 25px;
            height: 25px;
            box-sizing: border-box;
            line-height: 25px;
            cursor: pointer;
            margin: 5px;
          }

          li.active {
            background-color: #eee;
          }
        `}
      </style>
    </div>
  );
};

export default Pagination;
