import crypto from 'crypto';

import {env} from '~/config/env';

const ALGORITHM = 'aes-256-cbc';
const ENCRYPTION_KEY = env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

/**
 * Encrypt text
 */
export const encryptText = (text: string): string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY),
    iv,
  );

  let encryptedText = cipher.update(text);
  encryptedText = Buffer.concat([encryptedText, cipher.final()]);
  return `${iv.toString('hex')}:${encryptedText.toString('hex')}`;
};

/**
 * Decrypt text
 */
export const decryptText = (text: string): string => {
  const parts = text.split(':');
  const iv = Buffer.from(parts.shift() as string, 'hex');
  const encryptedText = Buffer.from(parts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY),
    iv,
  );

  let decryptedText = decipher.update(encryptedText);
  decryptedText = Buffer.concat([decryptedText, decipher.final()]);
  return decryptedText.toString();
};
