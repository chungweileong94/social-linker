import {
  errorResponse,
  ErrorResponse,
  SuccessResponse,
  successResponse,
} from 'js-response';
import type {NextApiRequest, NextApiResponse} from 'next';

import {SocialPage} from '~/typings';
import {encryptText} from '~/utlis/encryption';

export type GenerateTokenAPIResponse =
  | SuccessResponse<{token: string}, undefined>
  | ErrorResponse<undefined>;

type Response = NextApiResponse<GenerateTokenAPIResponse>;

export default (req: NextApiRequest, res: Response) => {
  try {
    const body = JSON.parse(req.body) as SocialPage;
    const base64String = Buffer.from(JSON.stringify(body)).toString('base64');
    const encryptedString = encryptText(base64String);
    res.status(200).json(successResponse({token: encryptedString}));
  } catch (err) {
    // TODO: Implement proper error code/message
    console.log(err);
    res
      .status(500)
      .json(
        errorResponse('E00', 'Oops, We can generate the link at the moment.'),
      );
  }
};
