import {decryptText, encryptText} from '~/utils/encryption.server';

type Bio = {
  title: string;
  description?: string;
  links: Array<{value: string}>;
};

export const encryptBioData = (bio: Bio) => {
  const base64String = Buffer.from(JSON.stringify(bio)).toString('base64');
  const encryptedString = encryptText(base64String);
  return encryptedString;
};

export const decryptBioData = (encryptedString: string) => {
  const decryptedString = decryptText(encryptedString);
  const base64String = Buffer.from(decryptedString, 'base64').toString();
  const bio = JSON.parse(base64String) as Bio;
  return bio;
};
