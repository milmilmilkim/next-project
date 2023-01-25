import type { NextApiRequest, NextApiResponse } from 'next';
import type { Villager } from '@/typing/villager';
import type { ResponseError, ResponseData } from '@/typing/api';
import type { AxiosError } from 'axios';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<Villager> | ResponseError>
) {
  const id = Number(req.query.id);

  try {
    const { data } = await axios.get<Villager>(
      'http://acnhapi.com/v1/villagers/' + id
    );
    res.json({ data });
  } catch (err) {
    const { message } = err as AxiosError;
    res.status(500).json({ msg: message });
  }
}
