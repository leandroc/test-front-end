import React from "react";

import { useUserSearch } from "./useUserSearch";

import { Main } from "./Main";

import "./App.css";

function App() {
  const { status, data, fuse } = useUserSearch();

  return (
    <main className="App">
      <header>
        <h1>User search</h1>
      </header>

      {status === "LOADING" ? "Loading application..." : <Main fuse={fuse} />}
    </main>
  );
}

export default App;
