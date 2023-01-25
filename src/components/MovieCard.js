import { Button, Popover } from "antd";
import { useEffect, useState } from "react";
import Highlight from "react-highlighter";
import { Link } from "react-router-dom";
import chief from "../assets/img/chief.svg";
import star from "../assets/img/star.svg";

import "./styles.scss";

export const MovieCard = ({
  editorMovie,
  filteredResult,
  searchInput,
  latestMovie,
}) => {
  // console.log(editorMovie?.videos?.results[0].key);
  let keyUrl = editorMovie?.videos?.results[0].key;
  let movieItem = editorMovie || filteredResult || latestMovie;
  const img_url = "http://image.tmdb.org/t/p/w500"; //w500 or 'original' for full size

  let star1 = filteredResult?.credits?.cast[0]?.name;
  let star2 = filteredResult?.credits?.cast[1]?.name;
  let star3 = filteredResult?.credits?.cast[2]?.name;
  let star4 = filteredResult?.credits?.cast[3]?.name;
  let star5 = filteredResult?.credits?.cast[4]?.name;
  let directorName = filteredResult?.credits?.crew[0]?.name;

  const directorPhoto = (
    <img
      width={`350px`}
      height={`350px`}
      className="director-photo"
      src={`${img_url}${DirectorPathUrl()}`}
      alt=""
    />
  );
  function GuessDirectorNAme() {
    let DirectorsNamesArray = filteredResult?.credits?.crew?.filter(
      (filteredResult) => {
        if (
          filteredResult?.known_for_department === "Directing" &&
          filteredResult?.department === "Directing"
        )
          return filteredResult?.name;
      }
    );
    if (DirectorsNamesArray) return DirectorsNamesArray[0]?.name;
    // this error is solved by the  if (trailer) statement above :  Uncaught TypeError: Cannot read properties of undefined (reading '0')
  }

  function DirectorPathUrl() {
    let DirectorsArray = filteredResult?.credits?.crew?.filter(
      (filteredResult) => {
        if (
          filteredResult?.known_for_department === "Directing" &&
          filteredResult?.department === "Directing"
        )
          return filteredResult?.profile_path;
      }
    );
    if (DirectorsArray) return DirectorsArray[0]?.profile_path;
    // this error is solved by the  if (trailer) statement above :  Uncaught TypeError: Cannot read properties of undefined (reading '0')
  }

  const rel_date = movieItem?.release_date?.slice(0, 4); //to get only the year

  useEffect(() => {
    if (filteredResult) console.log(DirectorPathUrl(), "here");
  }, [filteredResult]);

  // let movieGenres = [
  // movieItem?.genres[0]?.name,
  // movieItem?.genres[1]?.name,
  // movieItem?.genres[2]?.name,
  // ];

  const [watchList, setWatchList] = useState([]);

  function handleAddToWatchList(id) {
    const newList = [...watchList, id];
    // let array = watchList?.push(movieItem?.id);
    setWatchList(newList);
    // setWatchList([array, movieItem]);
  }
  console.log(watchList);

  return (
    <div
      className={
        latestMovie
          ? "latest-movie-card-container movie-card-container"
          : filteredResult
          ? "movie-card-container filtered-card"
          : "movie-card-container"
      }
    >
      <div className="movie-card-inner">
        <div className="movie-card-genres">
          {searchInput?.length !== 0 && !latestMovie && (
            <div>
              {/* <span>genres :</span> <br /> */}
              {/* {movieGenres && <div>{movieGenres[0]}</div>} */}
            </div>
          )}
        </div>

        <div className="movie-card-infos">
          <img
            className="movie-card-infos-img"
            src={`${img_url}${movieItem?.poster_path}`}
          ></img>
          <div>
            <span className="movie-card-infos-title">
              <Highlight search={searchInput}>
                {movieItem?.original_title}
              </Highlight>
            </span>
          </div>

          <span className="movie-card-infos-date">{rel_date}</span>
          <div className="movie-card-infos-vote-wrapper">
            <img className="movie-card-infos-vote-img" src={star} alt="" />
            <span className="movie-card-infos-vote-text">
              {movieItem?.vote_average}
            </span>
          </div>

          <div className="movie-card-btns">
            <Button
              className="movie-card-add-btn"
              onClick={() => handleAddToWatchList(editorMovie?.id)}
            >
              <span>Add to WatchList</span>
            </Button>
            <Link
              to={`/movie/${movieItem?.id}`}
              style={{ textDecoration: "none" }}
              className=""
            >
              <Button className="movie-card-infos-btn">
                <span>View Infos</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* <span>{movieItem?.overview}</span> */}
      </div>
      {searchInput?.length !== 0 && !latestMovie && (
        <div className="movie-card-stars-and-director-wrapper">
          <div className="movie-card-director">
            <span className="text">Directed by :</span>
            <div className="movie-card-director-highlighted-text">
              <Popover content={directorPhoto}>
                <img className="photo-icon" src={chief} alt="" />
              </Popover>
              <Highlight search={searchInput}>{GuessDirectorNAme()}</Highlight>
            </div>
          </div>

          <div className="movie-card-stars">
            <span className="text">Starring :</span>
            <div className="movie-card-stars-highlighted-text">
              <Highlight search={searchInput}>{star1}</Highlight>
              {/* means search if the word typed in the input field exists in star1 */}
              <Highlight search={searchInput}>{star2}</Highlight>
              <Highlight search={searchInput}>{star3}</Highlight>
              <Highlight search={searchInput}>{star4}</Highlight>
              <Highlight search={searchInput}>{star5}</Highlight>
            </div>
          </div>
        </div>
      )}

      {/* <ReactPlayer
        width="100%"
        height="90%"
        className="react-player"
        // playIcon={<PlayIcon />}
        controls
        light
        url={`https://www.youtube.com/watch?v=${keyUrl}`}
        // when using react-player, must type watch in the url , rather than embed
      /> */}
    </div>
  );
};
