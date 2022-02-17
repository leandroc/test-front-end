import React from "react";

import { useFetchUsers } from "../hooks/useFetchUsers";

import { ErrorMessage } from "../components/ErrorMessage";
import { Loading } from "../components/Loading";

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
      {["LOADING", "ERROR"].includes(status) ? null : children}
      {status !== "LOADING" ? null : <Loading>Loading application...</Loading>}
      {status !== "ERROR" ? null : (
        <ErrorMessage>
          An error has ocurred!
          <br />
          Couldn't load the application
        </ErrorMessage>
      )}
    </Context.Provider>
  );
};

export const useUserSearch = () =>
  React.useContext(Context) as UseSearchContext;
