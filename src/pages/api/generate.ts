import type {NextApiRequest, NextApiResponse} from 'next';

import {SocialPage} from '~/typings';

type Response = NextApiResponse<{
  token: string;
}>;

export default (req: NextApiRequest, res: Response) => {
  const body = JSON.parse(req.body) as SocialPage;
  res.status(200).json({
    token: Buffer.from(JSON.stringify(body)).toString('base64'),
  });
};
