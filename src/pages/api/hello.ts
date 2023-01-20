// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  [key:string]: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  
  res.status(200).json({})
}
