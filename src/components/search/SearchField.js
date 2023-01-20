import { Button, Input } from "antd";
import { useContext } from "react";
import clearIcon from "../../assets/img/remove.png";
import { MoviesContext } from "../../contextApi/MoviesProvider";

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
      const filteredData = EditPickmovies.filter((movie) => {
        let movieStars = [
          movie?.credits?.cast[0].name,
          movie?.credits?.cast[1].name,
          movie?.credits?.cast[2].name,
          movie?.credits?.cast[3].name,
          movie?.credits?.cast[4].name,
          movie?.credits?.cast[5].name,
        ];
        let movieDirectors = [movie?.credits?.crew[0].name];

        console.log(movieDirectors);
        // a search either by the movie title, its director, or its stars
        return (
          Object.values(movie?.original_title)
            .join("")
            .toLowerCase()
            .includes(searchInput.toString().toLowerCase()) ||
          Object.values(movieStars)
            .join("")
            .toLowerCase()
            .includes(searchInput.toString().toLowerCase()) ||
          Object.values(movieDirectors)
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

  const clearIconJSX = (
    <Button onClick={handleClearClick}>
      <img style={{ width: "20px", height: "20px" }} src={clearIcon} alt="" />
    </Button>
  );

  return (
    <div>
      <Input
        suffix={clearIconJSX}
        value={searchInput}
        onChange={handleChange}
        className=""
        style={{ width: "800px" }}
        placeholder=" &nbsp;Search a movie"
        disabled={false}
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
