import Fuse from "fuse.js";

import { UserData } from "./types";

type APIResponse = {
  data?: UserData[];
  errors?: { message: string };
};

type UserSearch = {
  data: UserData[];
  fuse: Fuse<UserData>;
};

export const fetchAllUsers = async (): Promise<UserSearch> => {
  const response = await fetch("https://random-persons.herokuapp.com/users", {
    method: "GET",
  });
  const { data, errors }: APIResponse = await response.json();

  // maybe do as function parameter
  const options = {
    isCaseSensitive: false,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
    shouldSort: true,
    threshold: 0.2,
    keys: [
      { name: "name", weight: 2 },
      { name: "age", weight: 1 },
    ],
  };

  if (response.ok) {
    if (data) {
      // API is returning duplicates
      const uniqs = [...new Set(data)];

      const dataIndex = Fuse.createIndex(options.keys, uniqs);
      const fuse = new Fuse(uniqs, options, dataIndex);

      return {
        data: uniqs,
        fuse,
      };
    }

    return Promise.reject(new Error("Empty return from API"));
  }

  return Promise.reject(errors);
};
