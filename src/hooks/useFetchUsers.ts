import { useReducer, useEffect } from "react";

import { fetchAllUsers } from "../utils/fetchAllUsers";

type UserSearch = Awaited<ReturnType<typeof fetchAllUsers>>;

type ActionType =
  | {
      type: "SET_SUCCESS";
      payload: UserSearch;
    }
  | {
      type: "SET_ERROR";
      payload: Error;
    }
  | {
      type: "SET_LOADING";
    };

type State =
  | {
      status: "LOADING";
      error: null;
      data: null;
      search: null;
    }
  | {
      status: "SUCCESS";
      error: null;
      data: UserSearch["data"];
      search: UserSearch["search"];
    }
  | {
      status: "ERROR";
      error: Error;
      data: null;
      search: null;
    };

const INITIAL_STATE: State = {
  status: "LOADING",
  error: null,
  data: null,
  search: null,
};

const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "SET_SUCCESS": {
      return {
        ...state,
        status: "SUCCESS",
        error: null,
        ...action.payload,
      };
    }

    case "SET_ERROR": {
      return {
        ...state,
        status: "ERROR",
        error: action.payload,
        data: null,
        search: null,
      };
    }

    case "SET_LOADING": {
      return INITIAL_STATE;
    }

    default: {
      return state;
    }
  }
};

export const useFetchUsers = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const init = async () => {
    try {
      const response = await fetchAllUsers();

      dispatch({ type: "SET_SUCCESS", payload: response });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: "SET_ERROR", payload: err });
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  return state;
};
