// import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import Pagination from '../../components/common/Pagination';
import React from 'react';
import { useRouter } from 'next/router';
import useVillager from '../../hooks/queries/useVillagerList';
import { SearchOptions } from '@/typing/villager';
import { useAtom } from 'jotai';
import { searchOptionAtom } from '@/state/villager';
import { Species } from '@/typing/villager';
import { Personality } from '@/typing/villager';

const page = () => {
  const [searchForm, setSearchForm] = useState<SearchOptions>({});
  const [searchOption, setSearchOption] = useAtom(searchOptionAtom);
  const [currentPage, setCurrentPage] = useState<number>(
    searchOption.page || 1
  );
  const { data, isLoading, error } = useVillager(searchOption);
  const router = useRouter();

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchOption({
      ...searchOption,
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

  const addSpecies = (species: Species) => {
    let next;

    if (searchOption.species === species) {
      next = null;
    } else {
      next = species;
    }

    setSearchOption({
      ...searchOption,
      species: next,
      page: 1,
    });
  };

  const addPersonality = (personality: Personality) => {
    let next;

    if (searchOption.personality === personality) {
      next = null;
    } else {
      next = personality;
    }

    setSearchOption({
      ...searchOption,
      personality: next,
      page: 1,
    });
  };

  const movePage = (id: number) => {
    const current = router.asPath;

    router.push(`${current}/${id}`);
  };

  useEffect(() => {
    setSearchOption({ ...searchOption, page: currentPage });
  }, [currentPage]);

  return (
    <>
      <h1>이웃들</h1>
      <form onSubmit={(e) => search(e)}>
        <input placeholder='이름' name='keyword' onChange={onChange} />
        <button type='submit'>검색</button>
      </form>
      <hr />
      {Object.values(Species).map((species, index) => (
        <span
          className={
            (searchOption.species === species ? 'selected' : '') + ' tag'
          }
          key={index}
          onClick={() => addSpecies(species)}>
          {species}
        </span>
      ))}
      <hr />
      {Object.values(Personality).map((personality, index) => (
        <span
          className={
            (searchOption.personality === personality ? 'selected' : '') +
            ' tag'
          }
          key={index}
          onClick={() => addPersonality(personality)}>
          {personality}
        </span>
      ))}

      <hr />
      {!isLoading && data ? (
        <>
          <span>총 {data?.total} 마리</span>
          <hr />
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
            totalRows={data.total || 0}
            perPage={searchOption.size || 15}
            currentPage={searchOption.page || 1}
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

          span.tag {
            display: inline-block;
            border: 1px solid #000;
            padding: 2px;
            margin: 2px 4px 0 0;
            cursor: pointer;
            background-color: #fff;
          }

          span.tag.selected::after {
            content: 'X';
            position: relative;
            top: 50%;
            font-size: 7px;
            margin: 2px;
            color: red;
          }

          span.tag.selected {
            background-color: #000;
            color: #fff;
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

export default page;
