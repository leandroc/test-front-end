import React from "react";

import styles from "./SearchInput.module.css";

export type SearchInputProps = React.HTMLProps<HTMLInputElement> & {
  label: string;
};

export const SearchInput = ({
  id,
  label,
  placeholder,
  ...props
}: SearchInputProps) => {
  return (
    <label className={styles.input} htmlFor={id}>
      <input
        type="search"
        id={id}
        placeholder={placeholder || label}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
};
