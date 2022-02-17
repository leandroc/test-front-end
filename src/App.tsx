import React from "react";

import { UserSearchProvider } from "./contexts/UserSearch";

import { Header } from "./components/Header";

import { Main } from "./views/Main";

import styles from "./App.module.css";

function App() {
  return (
    <main className={styles.container}>
      <Header />

      <UserSearchProvider>
        <Main />
      </UserSearchProvider>
    </main>
  );
}

export default App;
