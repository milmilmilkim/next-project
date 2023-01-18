import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Pagination from '../components/common/Pagination';
import React from 'react';
import { useRouter } from 'next/router';
import { Villager, Species } from '../typing/common';

type IndexProps = {
  data: Villager[];
  species: string[];
};

type SearchForm = {
  name?: string;
};

const page: React.FC<IndexProps> = ({ data, species }) => {
  const [villagers, setVillagers] = useState<Villager[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(data.length);
  const [searchForm, setSearchForm] = useState<SearchForm>({});
  const PER_PAGE = 15;

  const router = useRouter();

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentPage === 1) {
      getList();
    } else {
      setCurrentPage(1);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setSearchForm({
      ...searchForm,
      [name]: value,
    });
  };

  const getList = () => {
    let fData = data;
    if (searchForm.name) {
      fData = data.filter((villager: Villager) =>
        villager.name['name-KRko'].includes(searchForm.name as string)
      );
    }
    const offset = (currentPage - 1) * PER_PAGE;
    setTotalRows(fData.length);
    setVillagers(fData?.slice(offset, offset + PER_PAGE));
  };

  const movePage = (id: number) => {
    const current = router.asPath;

    router.push(`${current}/${id}`);
  };

  useEffect(() => {
    getList();
  }, [currentPage]);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <h1>이웃들</h1>
      <form onSubmit={(e) => search(e)}>
        <input placeholder='이름' name='name' onChange={onChange} />
        <button type='submit'>검색</button>
      </form>
      <hr />
      <span>총 {totalRows} 마리</span>
      {/* {species.map((item:string) => <span>{Species[item as keyof typeof Species]}</span>)} */}
      <hr />
      <div className='item-wrapper'>
        {villagers?.map((item) => (
          <div className='item' key={item.id} onClick={() => movePage(item.id)}>
            <span className='villager-name'>{item.name['name-KRko']}</span>
            <img src={item.icon_uri} alt={item.name['name-KRko']} />
          </div>
        ))}
      </div>
      <Pagination
        totalRows={totalRows}
        perPage={PER_PAGE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
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

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get('http://acnhapi.com/v1/villagers/');
  const keys = Object.keys(data);
  const list: Villager[] = [];
  keys.forEach((key: string) => {
    list.push(data[key]);
  });
  const set = new Set(list.map((v) => v.species))
  const species = Array.from(set);
  return {
    props: {
      data: list.sort((a, b) => {
        if (a.name['name-KRko'] < b.name['name-KRko']) {
          return -1;
        }
        if (a.name['name-KRko'] < b.name['name-KRko']) {
          return 1;
        }
        return 0;
      }),
      species,
    },
  };
};

export default page;
