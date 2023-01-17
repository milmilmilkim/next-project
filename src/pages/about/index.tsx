import axios, {AxiosResponse} from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Pagination from '../components/common/Pagination';

type IndexProps = {
  data: any;
};

type Villager = {
  id: number;
  'file-name': string;
  name: {
    'name-USen': string;
    'name-EUen': string;
    'name-EUde': string;
    'name-EUes': string;
    'name-USes': string;
    'name-EUfr': string;
    'name-USfr': string;
    'name-EUit': string;
    'name-EUnl': string;
    'name-CNzh': string;
    'name-TWzh': string;
    'name-JPja': string;
    'name-KRko': string;
    'name-EUru': string;
  };
  personality: string;
  'birthday-string': string;
  birthday: string;
  species: string;
  gender: string;
  'catch-phrase': string;
  icon_uri: string;
  image_uri: string;
};

const page: React.FC<IndexProps> = ({ data }) => {
  const [villagers, setVillagers] = useState<Villager[]>();

  useEffect(() => {
    const keys = Object.keys(data).slice(0, 20);
    const villagers : Villager[] = [];

    keys.forEach((key:string) => {
      villagers.push(data[key]);
    })

    setVillagers(villagers);
  }, []);

  return (
    <>
      <h1>이웃들</h1>
      <span>총 {villagers?.length} 마리</span>
      <hr />
      {villagers?.map((item)=> (
        <div className='item' key={item.id}>
          <h2>{item.name['name-KRko']}</h2>
          <img src={item.icon_uri} alt={item.name['name-KRko']} />
          <span>{item.birthday}</span>
        </div>
      ))}
      <div className="item">

      </div>
      <style jsx>
        {`
          h1 {
            font-size: 32px;
          }
          p {
            color: red;
          }
        `}
      </style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ()  => {
  const { data } = await axios.get('http://acnhapi.com/v1/villagers/');

  return { props: { data } };
};

export default page;
