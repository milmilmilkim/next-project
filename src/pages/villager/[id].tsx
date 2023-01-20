// import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import axios from '@/utils/axios';
import { Villager, Species } from '../../typing/villager';

type PageProps = {
  data: { data: Villager };
};

const page: React.FC<PageProps> = ({ data: { data } }) => {
  // const router = useRouter();

  const {
    name: { 'name-KRko': nameKr },
    image_uri,
    gender,
    personality,
    'catch-translations': { 'catch-KRko': catchPhrase },
    'text-color': textColor,
    birthday,
    species,
  } = data;

  useEffect(() => {}, []);
  return (
    <section>
      <h2>{nameKr}</h2>
      <img src={image_uri} alt={nameKr} style={{ borderRadius: '50%' }} />

      <hr />
      <ul>
        <li>
          한마디:{' '}
          <span style={{ color: textColor }} className='outline'>
            {catchPhrase}
          </span>
        </li>
        <li>성별: {gender === 'Femail' ? '여' : '남'}</li>
        <li>
          생일: {`${birthday.split('/')[1]}월 ${birthday.split('/')[0]}일`}
        </li>
        <li>성격: {personality}</li>
        <li>종류: {Species[species as keyof typeof Species]}</li>
      </ul>

      <style jsx>
        {`
          h2 {
            font-size: 32px;
          }

          .outline {
            text-shadow: 0.125em 0 0 #000, -0.125em 0 0 #000, 0 0.125em 0 #000,
              0 -0.125em 0 #000, 0.125em 0.125em 0 #000,
              -0.125em -0.125em 0 #000, 0.125em -0.125em 0 #000,
              -0.125em 0.125em 0 #000, 0 0.125em 0 #000, -0.125em 0.125em 0 #000,
              0.125em 0.125em 0 #000;
          }

          section {
            padding: 10px;
          }
        `}
      </style>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await axios.get('/api/villager/' + query.id);

  return {
    props: {
      data,
    },
  };
};

export default page;
