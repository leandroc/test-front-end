import React from "react";

import styles from "./Loading.module.css";

export type LoadingProps = React.HTMLProps<HTMLDivElement>;

export const Loading = ({ children }: LoadingProps) => {
  return (
    <div role="status" className={styles.container}>
      <span className={styles.loader}></span>

      {!children ? null : <div className={styles.message}>{children}</div>}
    </div>
  );
};
