import { createContext, useState } from "react";

export const MoviesContext = createContext();

export const MoviesContextProvider = ({ children }) => {
  const [EditPickmovies, setEditPickmovies] = useState([{}]); //an array of objects
  const [latestMovies, setLatestMovies] = useState([{}]);

  return (
    <MoviesContext.Provider
      value={{
        EditPickmovies,
        setEditPickmovies,
        latestMovies,
        setLatestMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
