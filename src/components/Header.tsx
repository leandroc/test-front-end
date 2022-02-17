import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>User search</h1>
    </header>
  );
};
