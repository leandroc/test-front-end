import React from "react";

import { ORDER_KEYS, SORT_KEYS } from "../types";

import { useUserSearch } from "../contexts/UserSearch";
import { useDebounce } from "../hooks/useDebounce";

import { Loading } from "../components/Loading";
import { ErrorMessage } from "../components/ErrorMessage";
import { SearchBar } from "../components/SearchBar";
import { SortOptions } from "../components/SortOptions";
import { List } from "../components/List";

import styles from "./Main.module.css";

export const Main = () => {
  const { search } = useUserSearch();

  const [status, setStatus] = React.useState<"NONE" | "LOADING">("NONE");
  const [list, setList] = React.useState(
    [] as Awaited<ReturnType<typeof search>>
  );
  const [order, setOrder] = React.useState<ORDER_KEYS>(ORDER_KEYS.FORWARD);
  const [sort, setSort] = React.useState<SORT_KEYS>(SORT_KEYS.SCORE);
  const [term, setTerm] = React.useState("");
  const debouncedTerm = useDebounce(500, term);

  const handleOnSearchFn = async (value: string) => {
    if (value.length < 2) {
      return;
    }

    try {
      const data = await search(value);

      setList(data);

      return setStatus("NONE");
    } catch (err) {
      setStatus("NONE");
    }
  };
  const handleOnSearch = React.useCallback(handleOnSearchFn, [search]);

  const canShowLoading = debouncedTerm && status === "LOADING";
  const canShowError = debouncedTerm && status !== "LOADING" && list.length < 1;
  const canShowContent =
    debouncedTerm && status !== "LOADING" && list.length > 0;

  React.useEffect(() => {
    handleOnSearch(debouncedTerm);
  }, [debouncedTerm, handleOnSearch]);

  return (
    <section className={styles.container}>
      <SearchBar
        value={term}
        onChange={(value) => {
          if (value.length > 1) {
            setStatus("LOADING");
          }

          setTerm(value);
        }}
      />

      {!canShowLoading ? null : (
        <Loading>
          Looking for <b>{debouncedTerm}</b>
        </Loading>
      )}

      {!canShowError ? null : (
        <ErrorMessage>USER NOT FOUND: {debouncedTerm}</ErrorMessage>
      )}

      {!canShowContent ? null : (
        <>
          <SortOptions
            sort={sort}
            order={order}
            onChange={(type, value) => {
              if (type === "SORT") {
                return setSort(value as SORT_KEYS);
              }

              return setOrder(value as ORDER_KEYS);
            }}
          />

          <List data={list} sort={sort} order={order} />
        </>
      )}
    </section>
  );
};
