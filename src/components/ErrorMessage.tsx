import React from "react";

import styles from "./ErrorMessage.module.css";

export type ErrorMessageProps = React.HTMLProps<HTMLDivElement>;

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <div role="status" className={styles.container}>
      <span className={styles.icon}>:(</span>

      <div className={styles.message}>{children}</div>
    </div>
  );
};
