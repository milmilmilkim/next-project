import React, { PropsWithChildren } from 'react';
import { useState, useEffect } from 'react';

interface PaginationProps {
  totalRows: number;
  currentPage: number;
  perPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination : React.FC<PaginationProps> = ({totalRows, currentPage, perPage, setCurrentPage}) => {
  const [pages, setPages] = useState<number[]>([]);
  const [groupNum, setGroupNum] = useState<number>(1);
  const [firstPage, setFirstPage] = useState<number>(1);

  const GROUP_SIZE = 5;
  const LAST_PAGE = Math.ceil(totalRows / perPage);
  const LAST_GROUP = LAST_PAGE / GROUP_SIZE;


  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const nextGroup = () => {
    const nextGroupNum = groupNum + 1;
    const nextFirstPage = (nextGroupNum - 1) * GROUP_SIZE + 1;
    setFirstPage(nextFirstPage);
    setGroupNum(nextGroupNum);
    setCurrentPage(nextFirstPage);
  };

  const prevGroup = () => {
    const nextGroupNum = groupNum - 1;
    const nextFirstPage = (nextGroupNum - 1) * GROUP_SIZE + 1;
    setFirstPage(nextFirstPage);
    setGroupNum(nextGroupNum);
    setCurrentPage(nextFirstPage + GROUP_SIZE - 1);
  };

  useEffect(() => {
    const pages = new Array(GROUP_SIZE);
    for (let i = firstPage; i <= GROUP_SIZE * groupNum; i++) {
      pages.push(i);
    }
    setPages(pages);
  }, [firstPage]);

  useEffect(() => {
    const groupNum = Math.floor((currentPage - 1) / GROUP_SIZE) + 1;
    setGroupNum(groupNum);
  }, [currentPage]);

  return (
    <div>
      <ul>
        {groupNum !== 1 && <li onClick={prevGroup}>◀︎</li>}
        {pages?.map((page) => (
          <li
            className={currentPage === page ? 'active' : ''}
            key={page}
            onClick={() => changePage(page)}>
            {page}
          </li>
        ))}
        {LAST_GROUP !== groupNum && <li onClick={nextGroup}>►</li>}
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
