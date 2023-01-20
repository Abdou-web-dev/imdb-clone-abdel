import { useState } from "react";
import { EditorsPick } from "../components/EditorsPick";
import {
  FilteredMovies,
  FilteredMovies as FilteredMoviesByCriteria,
} from "../components/FilteredMovies";
import { LatestMovies } from "../components/LatestMovies";
import { SearchBar } from "../components/SearchBar";

function Home() {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState(``);

  const [showResultsByFilterApplied, setshowResultsByFilterApplied] =
    useState(false);

  return (
    <div className="home-container">
      <div className="home-searchbar">
        <SearchBar
          {...{
            setFilteredResults,
            searchInput,
            setSearchInput,
            setshowResultsByFilterApplied,
          }}
        ></SearchBar>
      </div>

      <div className="home-editors-pick-container">
        {searchInput?.length === 0 && !showResultsByFilterApplied && (
          <EditorsPick {...{ searchInput }}></EditorsPick>
        )}
      </div>

      <div className="home-filtered-movies-container">
        {searchInput?.length >= 1 && !showResultsByFilterApplied ? (
          //FilteredMoviesBySearchInput
          <FilteredMovies
            {...{ filteredResults, searchInput }}
          ></FilteredMovies>
        ) : showResultsByFilterApplied ? (
          <FilteredMoviesByCriteria
            {...{ filteredResults }}
          ></FilteredMoviesByCriteria>
        ) : null}
      </div>

      <div className="home-latest-movies-container">
        <br />
        LatestMovies !!!
        <br />
        <LatestMovies></LatestMovies>
      </div>
    </div>
  );
}

export default Home;
