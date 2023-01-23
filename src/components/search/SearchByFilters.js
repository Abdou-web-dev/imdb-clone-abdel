import { Button, Select } from "antd";
import { useContext, useState } from "react";
import arrow_down from "../../assets/img/arrow_down.svg";
import { MoviesContext } from "../../contextApi/MoviesProvider";
import "./styles.scss";
export const SearchByFilters = ({
  setFilteredResults,
  setshowResultsByFilterApplied,
}) => {
  const { EditPickmovies } = useContext(MoviesContext);
  // const [filteredResults, setFilteredResults] = useState([]);
  const [genereSelect, setGenereSelect] = useState("");
  const [ratingSelect, setRatingSelect] = useState(null);
  const [languageSelect, setLanguageSelect] = useState("");
  let dynamicVal = "";

  const searchMoviesByGenre = () => {
    if (genereSelect) {
      const filteredData = EditPickmovies?.filter((movie) => {
        let movieGenres = [
          movie?.genres[0]?.name,
          movie?.genres[1]?.name,
          movie?.genres[2]?.name,
        ];
        return Object.values(movieGenres)
          .join("")
          .toLowerCase()
          .includes(genereSelect.toString().toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(EditPickmovies);
    }
  };
  const searchMoviesByLang = () => {
    if (languageSelect) {
      const filteredDataByLang = EditPickmovies?.filter((movie) => {
        return Object.values(movie?.original_language)
          .join("")
          .toLowerCase()
          .includes(languageSelect.toString().toLowerCase());
      });
      setFilteredResults(filteredDataByLang);
    } else {
      setFilteredResults(EditPickmovies);
    }
  };
  const searchMoviesByVote = () => {
    //not working !!
    // by vote_average
    if (ratingSelect) {
      console.log(ratingSelect, "ratingSelect");
      const filteredDataByVote = EditPickmovies?.filter((movie) => {
        console.log(movie?.vote_average, "imdb api note");
        return Object.values(movie?.vote_average)
          .join("")
          .toLowerCase()
          .includes(ratingSelect.toString().toLowerCase());
      });
      setFilteredResults(filteredDataByVote);
      //not working !!
    } else {
      setFilteredResults(EditPickmovies);
    }
  };
  const searchMoviesByLangAndGenre = () => {
    if (languageSelect && genereSelect) {
      const filteredDataByAll = EditPickmovies?.filter((movie) => {
        let movieGenres = [
          movie?.genres[0]?.name,
          movie?.genres[1]?.name,
          movie?.genres[2]?.name,
        ];
        return (
          Object.values(movieGenres)
            .join("")
            .toLowerCase()
            .includes(genereSelect.toString().toLowerCase()) &&
          Object.values(movie?.original_language)
            .join("")
            .toLowerCase()
            .includes(languageSelect.toString().toLowerCase())
        );
      });
      setFilteredResults(filteredDataByAll);
    } else {
      setFilteredResults(EditPickmovies);
    }
  };

  function handleApplyFilters() {
    if (genereSelect) {
      searchMoviesByGenre();
    } else if (languageSelect) {
      searchMoviesByLang();
    } else if (ratingSelect) {
      searchMoviesByVote();
    }
    if (genereSelect && languageSelect) {
      searchMoviesByLangAndGenre();
    }
    setshowResultsByFilterApplied(true);
    // console.log(ratingSelect);
  }
  const arrowIcon = (
    <img
      style={{
        width: "20px",
        height: "20px",
      }}
      src={arrow_down}
      alt=""
    />
  );

  return (
    <div className="search-filters-container">
      <div className="search-filters-genre-select-wrapper">
        <label>Genre :</label>
        <Select
          className={"search-filters-genre-select"}
          value={genereSelect}
          onChange={(value) => {
            setGenereSelect(value);
          }}
          style={{ width: "200px" }}
          size={"large"}
          filterOption={(input, option) =>
            (option?.value ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            //if optionA.value is null ou undefined then "" will be returned instead, and if it has a value , this value will be returned and used
            (optionA?.value ?? "")
              .toLowerCase()
              .localeCompare((optionB?.value ?? "").toLowerCase())
          }
          options={[
            { value: "Drama" },
            { value: "Romance" },
            { value: "War" },
            { value: "Western" },
            { value: "Adventure" },
            { value: "Crime" },
            { value: "Kids" },
            { value: "Action" },
            { value: "Thriller" },
            { value: "Mystery" },
            { value: "Comedy" },
          ]}
          status={""}
          suffixIcon={arrowIcon}
        />
      </div>
      <div className="search-filters-rating-select-wrapper">
        <label>Rating :</label>
        <Select
          className={"search-filters-rating-select"}
          value={ratingSelect}
          onChange={(value) => setRatingSelect(value)}
          style={{ width: "200px" }}
          size={"large"}
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={[
            { value: `8.48`, label: "1 Star" },
            { value: "8.516", label: "2 Stars" },
            { value: "0", label: "3 Stars" },
            { value: "1", label: "4 Stars" },
            { value: "11", label: "5 Stars" },
          ]}
          status={""}
          suffixIcon={arrowIcon}
        />
      </div>
      <div className="search-filters-language-select-wrapper">
        <label>Language :</label>
        <Select
          className={"search-filters-language-select"}
          value={languageSelect}
          onChange={(value) => setLanguageSelect(value)}
          style={{ width: "200px" }}
          size={"large"}
          filterOption={(input, option) =>
            (option?.value ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.value ?? "")
              .toLowerCase()
              .localeCompare((optionB?.value ?? "").toLowerCase())
          }
          options={[
            { value: "de" },
            { value: "fr" },
            { value: "ar" },
            { value: "en" },
            { value: "es" },
            { value: "it" },
            { value: "ko" }, //koorean
          ]}
          status={""}
          suffixIcon={arrowIcon}
        />
      </div>

      <Button className="search-filters-btn" onClick={handleApplyFilters}>
        <span>Apply filters</span>
      </Button>
    </div>
  );
};
