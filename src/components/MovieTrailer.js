import ReactPlayer from "react-player";
import "./styles.scss";

export function MovieTrailer({ movie }) {
  function trailerUrl() {
    let trailersArray = movie?.videos?.results?.filter((movie) => {
      if (movie?.type === "Trailer") return movie?.key;
    });
    if (trailersArray) return trailersArray[0]?.key;
    // trailersArray[0]?.key is the url
    // this error is solved by the  if (trailer) statement above :  Uncaught TypeError: Cannot read properties of undefined (reading '0')
  }
  return (
    <div className="movie-trailer-container">
      {movie !== null ? (
        <ReactPlayer
          className="movie-react-player"
          // playIcon={<PlayIcon />}
          playing
          controls
          light
          url={`https://www.youtube.com/watch?v=${trailerUrl()}`}
          // when using react-player, must type watch in the url , rather than embed
        />
      ) : null}
    </div>
  );
}
