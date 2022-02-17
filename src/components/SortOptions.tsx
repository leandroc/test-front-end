import React from "react";

import { ORDER_KEYS, SORT_KEYS } from "../types";

import { ButtonCheckbox } from "./ButtonCheckbox";

import styles from "./SortOptions.module.css";

export type SortOptionsProps = {
  sort: SORT_KEYS;
  order: ORDER_KEYS;
  onChange: (type: "SORT" | "ORDER", value: SORT_KEYS | ORDER_KEYS) => void;
};

export const SortOptions = ({ sort, order, onChange }: SortOptionsProps) => {
  return (
    <div className={styles.container} onSubmit={(e) => e.preventDefault()}>
      <div aria-labelledby="sortby-label" className={styles.sortContainer}>
        <label htmlFor="score" id="sortby-label" className={styles.label}>
          Sort by
        </label>

        <label htmlFor="score">
          <input
            id="score"
            name="sort"
            type="radio"
            value={SORT_KEYS.SCORE}
            checked={sort === SORT_KEYS.SCORE}
            onChange={() => onChange("SORT", SORT_KEYS.SCORE)}
          />
          Similarity
        </label>

        <label htmlFor="name">
          <input
            id="name"
            name="sort"
            type="radio"
            value={SORT_KEYS.NAME}
            checked={sort === SORT_KEYS.NAME}
            onChange={() => onChange("SORT", SORT_KEYS.NAME)}
          />
          Name
        </label>

        <label htmlFor="age">
          <input
            id="age"
            name="sort"
            type="radio"
            value={SORT_KEYS.AGE}
            checked={sort === SORT_KEYS.AGE}
            onChange={() => onChange("SORT", SORT_KEYS.AGE)}
          />
          Age
        </label>
      </div>

      {!["NAME", "AGE"].includes(sort) ? null : (
        <ButtonCheckbox
          id="order"
          name="order"
          checked={order === ORDER_KEYS.FORWARD}
          onChange={() =>
            onChange(
              "ORDER",
              order === ORDER_KEYS.FORWARD
                ? ORDER_KEYS.REVERSE
                : ORDER_KEYS.FORWARD
            )
          }
        >
          {order === ORDER_KEYS.FORWARD ? "Order A/Z" : "Order Z/A"}
        </ButtonCheckbox>
      )}
    </div>
  );
};
