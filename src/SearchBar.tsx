import React from "react";

export type SearchBarProps = {
  disabled?: boolean;
  onSubmit: (args: { searchTerm: string }) => void;
};

const SearchBarComponent = ({ onSubmit, disabled = false }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({ searchTerm });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="searchTerm">Search by user name or age</label>
      <input
        id="searchTerm"
        name="searchTerm"
        type="search"
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e.target.value);
        }}
      />

      <button type="submit" disabled={disabled}>
        Search
      </button>
    </form>
  );
};

export const SearchBar = SearchBarComponent;
