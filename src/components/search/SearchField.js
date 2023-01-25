import { Button, Input } from "antd";
import { useContext, useState } from "react";
import chercher from "../../assets/img/chercher.png";
import clearIcon from "../../assets/img/remove.png";
import { MoviesContext } from "../../contextApi/MoviesProvider";

import "./styles.scss";

export const SearchField = ({
  setFilteredResults,
  searchInput,
  setSearchInput,
}) => {
  const { EditPickmovies } = useContext(MoviesContext);
  const handleClearClick = () => {
    setSearchInput("");
  };

  const searchMovies = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = EditPickmovies?.filter((movie) => {
        let movieStars = [
          movie?.credits?.cast[0]?.name,
          movie?.credits?.cast[1]?.name,
          movie?.credits?.cast[2]?.name,
          movie?.credits?.cast[3]?.name,
          movie?.credits?.cast[4]?.name,
          movie?.credits?.cast[5]?.name,
        ];
        let movieDirectors = [
          movie?.credits?.crew[0]?.name,
          movie?.credits?.crew[1]?.name,
          movie?.credits?.crew[2]?.name,
          movie?.credits?.crew[3]?.name,
          movie?.credits?.crew[4]?.name,
          movie?.credits?.crew[5]?.name,
          movie?.credits?.crew[6]?.name,
        ];

        // a search either by the movie title, its director, or its stars
        return (
          Object.values(movie?.original_title || {})
            .join("")
            .toLowerCase()
            .includes(searchInput.toString().toLowerCase()) ||
          Object.values(movieStars || [])
            .join("")
            .toLowerCase()
            .includes(searchInput.toString().toLowerCase()) ||
          Object.values(movieDirectors || [])
            .join("")
            .toLowerCase()
            .includes(searchInput.toString().toLowerCase())
        );
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(EditPickmovies);
    }
  };
  const handleChange = (e) => {
    searchMovies(e.target.value);
  };
  const [invertIcon, setinvertIcon] = useState("invert(0.7)");

  const handleHover = (e) => {
    if (invertIcon === "invert(0.7)") {
      setinvertIcon("invert(0)");
    }
  };
  const handleLeave = (e) => {
    if (invertIcon === "invert(0)") {
      setinvertIcon("invert(0.7)");
    }
  };

  const clearIconJSX = (
    <Button onClick={handleClearClick}>
      <img style={{ width: "20px", height: "20px" }} src={clearIcon} alt="" />
    </Button>
  );
  const searchIcon = (
    <img
      style={{
        filter: invertIcon,
        width: "20px",
        height: "20px",
      }}
      src={chercher}
      alt=""
    />
  );

  return (
    <div className="search-field-container">
      <Input
        className="search-field-input"
        suffix={clearIconJSX}
        value={searchInput}
        onChange={handleChange}
        style={{ width: "800px" }}
        placeholder=" &nbsp;Search a movie"
        disabled={false}
        prefix={searchIcon}
        onMouseOver={handleHover}
        onMouseLeave={handleLeave}
      ></Input>
    </div>
  );
};
// Object.values(movie?.release_date).join("").toLowerCase() === searchInput.toString().toLowerCase() for exact search matching
// let isDirector =
// movie?.credits?.crew[0].known_for_department === `Directing` ||
// movie?.credits?.crew[1].known_for_department === `Directing` ||
// movie?.credits?.crew[2].known_for_department === `Directing` ||
// movie?.credits?.crew[3].known_for_department === `Directing`;

// some directors of the movies of the editors pick : Tosca Musk ,	Robert Zemeckis, Orson Welles,Bong Joon-ho,
// Martin Scorsese...
