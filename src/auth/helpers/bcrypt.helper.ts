import * as bcrypt from 'bcrypt';

export const cryptPassword = (password: string): string =>
  bcrypt.hashSync(password, 10);

export const compareCrypt = (password: string, crypt: string): boolean =>
  bcrypt.compareSync(password, crypt);
