type Copy<T> = {
  [P in keyof T]: T[P];
};

export type Merge<T, U> = T extends null
  ? null
  : T extends undefined
  ? undefined
  : Copy<Omit<T, keyof T & keyof U> & U>;
