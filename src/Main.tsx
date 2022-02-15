import React from "react";

import { useUserSearch } from "./contexts/UserSearch";
import { useDebounce } from "./hooks/useDebounce";

import { SearchBar } from "./SearchBar";
import { List } from "./List";

import styles from "./Main.module.css";

export const Main = () => {
  const { search } = useUserSearch();

  const [status, setStatus] = React.useState<"NONE" | "LOADING">("NONE");
  const [list, setList] = React.useState(
    [] as Awaited<ReturnType<typeof search>>
  );
  const [order, setOrder] = React.useState<"FORWARD" | "REVERSE">("FORWARD");
  const [sort, setSort] = React.useState<"NAME" | "AGE" | "SCORE">("SCORE");
  const [term, setTerm] = React.useState("");
  const debouncedTerm = useDebounce(300, term);

  const handleOnSearchFn = async (value: string) => {
    setStatus("LOADING");

    try {
      const data = await search(value);

      setList(data);

      return setStatus("NONE");
    } catch (err) {
      setStatus("NONE");
    }
  };
  const handleOnSearch = React.useCallback(handleOnSearchFn, [search]);

  React.useEffect(() => {
    handleOnSearch(debouncedTerm);
  }, [debouncedTerm, handleOnSearch]);

  return (
    <section className={styles.container}>
      <SearchBar value={term} onChange={(value) => setTerm(value)} />

      {!debouncedTerm ? null : (
        <>
          {status === "LOADING" ? (
            <div>Looking for {debouncedTerm}</div>
          ) : list.length < 1 ? (
            <div>USER NOT FOUND: {debouncedTerm}</div>
          ) : (
            <>
              <div
                className={styles.coisa}
                onSubmit={(e) => e.preventDefault()}
              >
                <div
                  aria-labelledby="sortby-label"
                  className={styles.sortContainer}
                >
                  <label
                    htmlFor="score"
                    id="sortby-label"
                    className={styles.label}
                  >
                    Sort by
                  </label>

                  <label htmlFor="score">
                    <input
                      id="score"
                      name="sort"
                      type="radio"
                      value="SCORE"
                      checked={sort === "SCORE"}
                      onChange={() => setSort("SCORE")}
                    />
                    Similarity
                  </label>

                  <label htmlFor="name">
                    <input
                      id="name"
                      name="sort"
                      type="radio"
                      value="NAME"
                      checked={sort === "NAME"}
                      onChange={() => setSort("NAME")}
                    />
                    Name
                  </label>

                  <label htmlFor="age">
                    <input
                      id="age"
                      name="sort"
                      type="radio"
                      value="age"
                      checked={sort === "AGE"}
                      onChange={() => setSort("AGE")}
                    />
                    Age
                  </label>
                </div>

                {!["NAME", "AGE"].includes(sort) ? null : (
                  <div className={styles.orderContainer}>
                    <label htmlFor="order">
                      <input
                        id="order"
                        name="order"
                        type="checkbox"
                        checked={order === "FORWARD"}
                        onChange={() =>
                          setOrder((prev) =>
                            prev === "FORWARD" ? "REVERSE" : "FORWARD"
                          )
                        }
                      />
                      {order === "FORWARD" ? "Order A/Z" : "Order Z/A"}
                    </label>
                  </div>
                )}
              </div>

              <List data={list || []} sort={sort} order={order} />
            </>
          )}
        </>
      )}
    </section>
  );
};
