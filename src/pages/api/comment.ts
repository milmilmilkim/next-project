import type { NextApiRequest, NextApiResponse } from 'next';
import type { List } from '../typing/sheet';
import type { ResponseData, ResponseError } from '../typing/api';
import axios, { AxiosError } from 'axios';

import { generateJson } from '@/utils/sheet';

const spreadsheetId = `1Su3SJUP60i1c-DiS7GZUWbID-vss0mO4bHf-kTQA4J4`;
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/sheet1`;
const key = 'AIzaSyD09vslS07bXDyra8ZZKtZkIyMblT19-RM';

export default async function getComment(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<List[]> | ResponseError>
) {
  try {
    const {
      data: { values },
    }: { data: { values: string[][] } } = await axios.get(url, {
      params: {
        key,
      },
    });

    const data: List[] = generateJson(values);

    res.status(200).json({ data });
  } catch (err) {
    const { message: msg } = err as unknown as AxiosError;
    return res.status(500).send({ msg });
  }
}
