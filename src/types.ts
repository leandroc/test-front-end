export type UserData = {
  name: string;
  age: number;
};

export enum ORDER_KEYS {
  FORWARD = "FORWARD",
  REVERSE = "REVERSE",
}

export enum SORT_KEYS {
  NAME = "NAME",
  AGE = "AGE",
  SCORE = "SCORE",
}

export type OrderType = keyof typeof ORDER_KEYS;

export type SortByType = keyof typeof SORT_KEYS;
