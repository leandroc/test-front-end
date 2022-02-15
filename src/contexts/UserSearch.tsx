import React from "react";

import { useFetchUsers } from "../hooks/useFetchUsers";

import { UserData } from "../types";

const Context = React.createContext({});

export type UseSearchContext = {
  search: NonNullable<ReturnType<typeof useFetchUsers>["search"]>;
  data: UserData[];
};

export const UserSearchProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { status, data, search } = useFetchUsers();

  return (
    <Context.Provider
      value={{
        search,
        data,
      }}
    >
      {status !== "LOADING" ? null : "Loading application..."}
      {status !== "ERROR" ? null : "An error has ocurred"}
      {["LOADING", "ERROR"].includes(status) ? null : children}
    </Context.Provider>
  );
};

export const useUserSearch = () =>
  React.useContext(Context) as UseSearchContext;
