import React from "react";
import { FzfResultItem } from "fzf";

import {
  SORT_KEYS,
  ORDER_KEYS,
  UserData,
  OrderType,
  SortByType,
} from "./types";

import styles from "./List.module.css";

export type ListProps = {
  order?: OrderType;
  sort?: SortByType;
  data: FzfResultItem<UserData>[];
};

const sortBy = (
  arr: FzfResultItem<UserData>[],
  sortKey: SortByType,
  order: OrderType
) => {
  if (sortKey === "SCORE") {
    return arr;
  }

  return [...arr].sort((a, b) => {
    if (sortKey === SORT_KEYS.NAME) {
      if (order === ORDER_KEYS.REVERSE) {
        return b.item.name?.localeCompare(a.item.name ?? "") || 0;
      }

      return a.item.name?.localeCompare(b.item.name ?? "") || 0;
    }

    if (order === ORDER_KEYS.REVERSE) {
      return b.item.age! - a.item.age!;
    }

    return a.item.age! - b.item.age!;
  });
};

const getMatchedString = (str: string, arr: number[]) => {
  if (arr.length < 1) {
    return <>{str}</>;
  }

  const splitedString = str.split("");
  const nodes = splitedString.map((item, i) => {
    if (arr.includes(i)) {
      return <b key={i}>{item}</b>;
    }

    return item;
  });

  return <>{nodes}</>;
};

export const List = ({
  data = [],
  sort = SORT_KEYS.SCORE,
  order = ORDER_KEYS.FORWARD,
}: ListProps) => {
  const list = sortBy(data, sort, order);

  return (
    <div className={styles.container}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>

      <tbody>
        {(list ?? []).map(({ item, positions, score }) => {
          const newName = getMatchedString(item.name || "", [...positions]);

          return (
            <tr key={`${score}__${item.name}__${item.age}`}>
              <td>{newName}</td>
              <td>{item.age}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
};
