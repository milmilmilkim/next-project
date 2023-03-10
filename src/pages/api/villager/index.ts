import type { NextApiRequest, NextApiResponse } from 'next';
import { Villager, Species, Personality } from '@/typing/villager';
import type { ResponseError, ResponseData } from '@/typing/api';
import type { AxiosError } from 'axios';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<Villager[]> | ResponseError>
) {
  const page: number = Number(req.query.page) || 1;
  const size: number = Number(req.query.size) || 15;

  const keyword = (req.query.keyword as string) || '';

  try {
    const { data } = await axios.get('http://acnhapi.com/v1/villagers/');
    const keys = Object.keys(data);
    let list: Villager[] = [];
    keys.forEach((key: string) => {
      list.push(data[key]);
    });

    // 검색 필터링..
    if (keyword?.trim()) {
      list = list?.filter((villager) => villager.name['name-KRko'] === keyword);
    }

    if (req.query.species) {
      const species = Object.keys(Species)[Object.values(Species).indexOf(req.query.species as Species)];
      list = list?.filter((villager) => villager.species === species);
    }

    if (req.query.personality) {
      const personality = Object.keys(Personality)[Object.values(Personality).indexOf(req.query.personality as Personality)];
      list = list?.filter((villager) => villager.personality === personality);
    }

    // 이름 정렬
    list = list.sort((a, b) => {
      if (a.name['name-KRko'] < b.name['name-KRko']) {
        return -1;
      }
      if (a.name['name-KRko'] < b.name['name-KRko']) {
        return 1;
      }
      return 0;
    });

    const total = list.length;
    // 페이지네이션
    const offset = (page - 1) * size;
    list = list.slice(offset, offset + size);
    res.send({ data: list, total });
  } catch (err) {
    const { message } = err as AxiosError;
    res.status(500).json({ msg: message });
  }
}
