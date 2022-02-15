import React from "react";

import styles from "./SearchBar.module.css";

export type SearchBarProps = {
  value?: string;
  disabled?: boolean;
  onChange: (args: string) => void;
};

export const SearchBar = ({
  onChange,
  value = "",
  disabled = false,
}: SearchBarProps) => {
  // const [searchTerm, setSearchTerm] = React.useState(value);

  // const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   onSubmit({ searchTerm });
  // };

  return (
    <form
      className={styles.container}
      // onSubmit={handleOnSubmit}
      onSubmit={e => e.preventDefault()}
    >
      <label className={styles.input} htmlFor="searchTerm">
        <input
          id="searchTerm"
          name="searchTerm"
          type="search"
          placeholder="Search by user name or age"
          value={value}
          disabled={disabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
          }}
        />
        <span>Search by user name or age</span>
      </label>

      {/* <button
        type="submit"
        className={styles.button}
        disabled={disabled || !searchTerm.length}
      >
        Search
      </button> */}
    </form>
  );
};
