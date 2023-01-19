import type { NextApiRequest, NextApiResponse } from 'next';
import type { Villager } from '@/pages/typing/common';
import type { ResponseError } from '@/pages/typing/api';
import type { AxiosError } from 'axios';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Villager[] | ResponseError>
) {
  const page = Number(req.query.page) || 1;
  const size = Number(req.query.size) || 15;
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

    // 이름 정렬
    // list = list.sort((a, b) => {
    //   if (a.name['name-KRko'] < b.name['name-KRko']) {
    //     return -1;
    //   }
    //   if (a.name['name-KRko'] < b.name['name-KRko']) {
    //     return 1;
    //   }
    //   return 0;
    // });
    // 페이지네이션
    list = list.slice(((page-1) * size),size);

    res.send(list);
  } catch (err) {
    const { message } = err as AxiosError;
    res.status(500).json({ msg: message });
  }
}
