import React from "react";

import { SearchInput } from "./SearchInput";

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
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const form = event.currentTarget;
    // const formData = new FormData(form);
    // const value = formData.get('searchTerm');

    // onChange(value)
  };

  return (
    <form className={styles.container} onSubmit={handleOnSubmit}>
      <SearchInput
        label="Search by user name or age"
        id="searchTerm"
        name="searchTerm"
        value={value}
        disabled={disabled}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
      />
    </form>
  );
};
