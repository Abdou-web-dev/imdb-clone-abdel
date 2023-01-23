import { useState } from "react";
import { EditorsPick } from "../components/EditorsPick";
import {
  FilteredMovies,
  FilteredMovies as FilteredMoviesByCriteria,
} from "../components/FilteredMovies";
import { LatestMovies } from "../components/LatestMovies";
import { SearchBar } from "../components/SearchBar";
import "./styles.scss";

function Home() {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState(``);
  const [showResultsByFilterApplied, setshowResultsByFilterApplied] =
    useState(false);

  return (
    <div className="home-container">
      <div className="home-searchbar-container">
        <SearchBar
          {...{
            setFilteredResults,
            searchInput,
            setSearchInput,
            setshowResultsByFilterApplied,
          }}
        ></SearchBar>
      </div>

      <div className="home-movies-container">
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
          LatestMovies !!!
          {searchInput?.length === 0 && !showResultsByFilterApplied && (
            <LatestMovies></LatestMovies>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
