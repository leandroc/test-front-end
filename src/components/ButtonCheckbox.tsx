import React from "react";

import styles from "./ButtonCheckbox.module.css";

export type ButtonCheckboxProps = React.HTMLProps<HTMLInputElement> & {
  children: string;
};

export const ButtonCheckbox = ({
  id,
  children,
  ...props
}: ButtonCheckboxProps) => {
  return (
    <label htmlFor={id} className={styles.container}>
      <input id={id} type="checkbox" {...props} className={styles.input} />

      {children}
    </label>
  );
};
