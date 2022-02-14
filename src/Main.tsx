import React from "react";

import { useUserSearch } from "./useUserSearch";

import { SearchBar } from "./SearchBar";
import { List } from "./List";

export type MainProps = {
  fuse: Awaited<ReturnType<typeof useUserSearch>>["fuse"];
};

export const Main = ({ fuse }: MainProps) => {
  const [order, setOrder] = React.useState<"abc" | "cba">("abc");
  const [sort, setSort] = React.useState<"name" | "age" | "score">("score");
  const [term, setTerm] = React.useState("");

  const handleOnSubmit = ({ searchTerm }: { searchTerm: string }) => {
    console.log("searchTerm", searchTerm);
    setTerm(searchTerm);
  };

  const data = fuse?.search(term) || [];

  if (!fuse) {
    return <section>error</section>;
  }

  return (
    <section>
      <SearchBar onSubmit={handleOnSubmit} />

      <form>
        <fieldset>
          <legend>Sort by</legend>

          <label htmlFor="score">
            <input
              id="score"
              name="sort"
              type="radio"
              value="score"
              checked={sort === "score"}
              onChange={() => setSort("score")}
            />
            Similarity
          </label>

          <label htmlFor="name">
            <input
              id="name"
              name="sort"
              type="radio"
              value="name"
              checked={sort === "name"}
              onChange={() => setSort("name")}
            />
            Name
          </label>

          <label htmlFor="age">
            <input
              id="age"
              name="sort"
              type="radio"
              value="age"
              checked={sort === "age"}
              onChange={() => setSort("age")}
            />
            Age
          </label>
        </fieldset>

        {!["name", "age"].includes(sort) ? null : (
          <label htmlFor="order">
            <input
              id="order"
              name="order"
              type="checkbox"
              checked={order === "abc"}
              onChange={() =>
                setOrder((prev) => (prev === "abc" ? "cba" : "abc"))
              }
            />
            Ordering
          </label>
        )}
      </form>

      <List data={data || []} sort={sort} order={order} />
    </section>
  );
};
