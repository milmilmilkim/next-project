import type { NextApiRequest, NextApiResponse } from 'next';
import { getComment, addComment } from '../../../controller/comment.ctrl';
import type { ResponseData, ResponseError } from '@/typing/api';
import type { List } from '@/typing/sheet';

export default async function comment(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<List[]> | ResponseError>
) {
  if(req.method === 'GET') getComment(req, res);
  if(req.method === 'POST') addComment(req,res);
}
