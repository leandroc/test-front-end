import React from "react";

import { UserSearchProvider } from "./contexts/UserSearch";

import { Header } from "./Header";
import { Main } from "./Main";

import "./App.css";

function App() {
  return (
    <main className="App">
      <Header />

      <UserSearchProvider>
        <Main />
      </UserSearchProvider>
    </main>
  );
}

export default App;
