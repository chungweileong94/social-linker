import React from 'react';
import {NextPage} from 'next';

import {SocialPage} from '~/typings';
import {decryptText} from '~/utlis/encryption';

type Props = {
  pageData: SocialPage | null;
};

const Page: NextPage<Props> = props => {
  return <div>{JSON.stringify(props, null, 2)}</div>;
};

Page.getInitialProps = ({query}) => {
  const {token} = query;
  try {
    const decryptedText = decryptText(token as string);
    const pageDataJSONString = Buffer.from(decryptedText, 'base64').toString();
    const pageData = JSON.parse(pageDataJSONString);
    return {pageData};
  } catch {
    return {pageData: null};
  }
};

export default Page;
