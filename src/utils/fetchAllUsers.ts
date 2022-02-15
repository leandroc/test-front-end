import { AsyncFzf, AsyncFzfOptions, FzfResultItem } from "fzf";

import { UserData } from "../types";

type APIResponse = {
  data?: UserData[];
  errors?: { message: string };
};

type UserSearch = {
  data: UserData[];
  search: (pattern: string) => Promise<FzfResultItem<UserData>[]>;
};

export const fetchAllUsers = async (
  options: AsyncFzfOptions<UserData> = {
    selector: (item) => `${item.name} (${item.age})`,
  }
): Promise<UserSearch> => {
  const response = await fetch("https://random-persons.herokuapp.com/users", {
    method: "GET",
  });
  const { data, errors }: APIResponse = await response.json();

  if (response.ok) {
    if (data) {
      // API is returning duplicates
      const dataAsStringSet = new Set(data.map((item) => JSON.stringify(item)));
      const uniqData = Array.from(dataAsStringSet).map((item) =>
        JSON.parse(item)
      );

      const fzf = new AsyncFzf(uniqData, {
        ...(options || {}),
        selector: options.selector || ((item) => `${item.name} (${item.age})`),
      });

      return {
        data: uniqData,
        search: async (pattern: string) => fzf.find(pattern),
      };
    }

    return Promise.reject(new Error("Empty return from API"));
  }

  return Promise.reject(errors);
};
