// import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import Pagination from '../components/common/Pagination';
import React from 'react';
import { useRouter } from 'next/router';
import useVillager from '../hooks/queries/useVillagerList';
import { SearchOptions } from '@/pages/typing/villager';

type SearchForm = {
  keyword?: string;
};

const page = () => {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchForm, setSearchForm] = useState<SearchForm>({});
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    page: 1,
    size: 15,
    keyword: '',
  });
  const [currentPage, setCurrentPage] = useState<number>(searchOptions.page);
  const { data, isLoading, error } = useVillager(searchOptions);
  const router = useRouter();

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchOptions({
      ...searchOptions,
      keyword: searchForm.keyword,
      page: 1,
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setSearchForm({
      ...searchForm,
      [name]: value,
    });
  };

  const movePage = (id: number) => {
    const current = router.asPath;

    router.push(`${current}/${id}`);
  };

  useEffect(() => {
    setSearchOptions({ ...searchOptions, page: currentPage });
  }, [currentPage]);

  return (
    <>
      <h1>이웃들</h1>
      <form onSubmit={(e) => search(e)}>
        <input placeholder='이름' name='keyword' onChange={onChange} />
        <button type='submit'>검색</button>
      </form>
      <hr />
      <span>총 {data?.total} 마리</span>
      <hr />
      {!isLoading && data ? (
        <>
          <div className='item-wrapper'>
            {data?.data.map((item) => (
              <div
                className='item'
                key={item.id}
                onClick={() => movePage(item.id)}>
                <span className='villager-name'>{item.name['name-KRko']}</span>
                <img src={item.icon_uri} alt={item.name['name-KRko']} />
              </div>
            ))}
          </div>
          <Pagination
            totalRows={data.total!}
            perPage={searchOptions.size}
            currentPage={searchOptions.page}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <div>loading...</div>
      )}

      {error && <>{error.response?.data.msg || error.message}</>}

      <style jsx>
        {`
          h1 {
            font-size: 32px;
            margin-bottom: 20px;
          }
          p {
            color: red;
          }

          .item-wrapper {
            display: grid;
            width: 100%;
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
          }

          .item-wrapper .item {
            border: 2px solid #000;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            flex-direction: column;
            cursor: pointer;
          }

          .item img {
            max-width: 80%;
            height: auto;
          }

          .item .villager-name {
            padding: 10px;
          }

          @media (max-width: 800px) {
            .item-wrapper {
              grid-template-columns: repeat(3, 1fr);
            }
          }
        `}
      </style>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { data } = await axios.get('http://acnhapi.com/v1/villagers/');
//   const keys = Object.keys(data);
//   const list: Villager[] = [];
//   keys.forEach((key: string) => {
//     list.push(data[key]);
//   });
//   return {
//     props: {
//       data: list.sort((a, b) => {
//         if (a.name['name-KRko'] < b.name['name-KRko']) {
//           return -1;
//         }
//         if (a.name['name-KRko'] < b.name['name-KRko']) {
//           return 1;
//         }
//         return 0;
//       }),
//       species,
//     },
//   };
// };

export default page;
