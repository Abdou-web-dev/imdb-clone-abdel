import { createContext, useState } from "react";

export const MoviesContext = createContext();

export const MoviesContextProvider = ({ children }) => {
  const [EditPickmovies, setEditPickmovies] = useState([{}]); //an array of objects

  return (
    <MoviesContext.Provider value={{ EditPickmovies, setEditPickmovies }}>
      {children}
    </MoviesContext.Provider>
  );
};
