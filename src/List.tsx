import React from "react";
import Fuse from "fuse.js";

import { UserData } from "./types";

export type ListProps = {
  order?: "abc" | "cba";
  sort?: "name" | "age" | "score";
  data: Fuse.FuseResult<UserData>[];
};

export const List = ({
  data = [],
  sort = "score",
  order = "abc",
}: ListProps) => {
  const alpha =
    sort === "score"
      ? data
      : [...(data ?? [])].sort((a, b) => {
          if (order === "cba") {
            if (sort === "name") {
              return b.item.name?.localeCompare(a.item.name ?? "") || 0;
            }

            return b.item.age! - a.item.age!;
          }

          if (sort === "name") {
            return a.item.name?.localeCompare(b.item.name ?? "") || 0;
          }

          return a.item.age! - b.item.age!;
        });

  return (
    <div className="list">
      <ul>
        {(alpha ?? []).map(({ item, matches, refIndex }) => {
          const name = (item.name || "").split("");

          return (
            <li key={refIndex}>
              {item.name} | {item.age}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
