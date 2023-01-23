import { Button } from "antd";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MoviesContext } from "../contextApi/MoviesProvider";

function Movie() {
  const { id } = useParams();
  const { EditPickmovies, latestMovies } = useContext(MoviesContext);
  const [movie, setMovie] = useState({}); //object
  const img_url = "http://image.tmdb.org/t/p/w500"; //w500 or 'original' for full size
  let star1 = movie?.credits?.cast[0]?.name;
  let star2 = movie?.credits?.cast[1]?.name;
  let star3 = movie?.credits?.cast[2]?.name;
  let star4 = movie?.credits?.cast[3]?.name;
  let star5 = movie?.credits?.cast[4]?.name;
  let directorName = movie?.credits?.crew[0]?.name;

  let movieImagePath1 = movie?.images?.posters[0]?.file_path;
  let movieImagePath2 = movie?.images?.posters[0]?.file_path;

  let movieImagepath3 = movie?.images?.backdrops[0]?.file_path;
  let movieImagepath4 = movie?.images?.backdrops[1]?.file_path;

  let movieImagepath5 = movie?.images?.logos[0]?.file_path;
  let movieImagepath6 = movie?.images?.logos[1]?.file_path;

  useEffect(() => {
    let movieElem = EditPickmovies?.find(
      (movieItem) => movieItem.id === parseInt(id)
    );
    let movieElem2 = latestMovies?.find(
      (movieItem) => movieItem.id === parseInt(id)
    );
    if (movieElem) {
      setMovie(movieElem);
    }
    if (movieElem2) {
      setMovie(movieElem2);
    }
  }, []);

  useEffect(() => {
    console.log(movie);
  }, [movie]);

  function handleClick(params) {}

  return (
    <div className="movie-page-container">
      <Link className="movies-goBack" to="/">
        <span> &#8592;</span> <span>Go Back</span>
      </Link>

      {movie && (
        <div className="movie-page-inner">
          <div>
            <span>{movie?.original_title}</span>
          </div>
          <div>
            <span>{movie?.vote_average}</span>
          </div>
          <div>
            <span>{movie?.overview}</span>
          </div>
          <div>
            <div>
              <span>stars</span>
            </div>
            <span>{star1}</span>
            <span>{star2}</span>
            <span>{star3}</span>
            <span>{star4}</span>
            <span>{star5}</span>
          </div>
          <div>
            <div>
              <span>Creators : </span>
            </div>
            <span>{directorName}</span>
          </div>
          <div>
            <Button onClick={handleClick} className="">
              <span>Add to WatchList</span>
            </Button>
          </div>
          <div>
            <span>Top Casts :</span>
            <img src="" alt="" />
          </div>
          <span>{movie?.release_date}</span>
          <img
            width={`100px`}
            height="100px"
            src={`${img_url}${movie?.poster_path}`}
          ></img>
          <img
            width={`100px`}
            height="100px"
            src={`${img_url}${movie?.images?.posters[10]?.file_path}`}
          ></img>
          <img
            width={`100px`}
            height="100px"
            src={`${img_url}${movieImagepath3}`}
          ></img>
          <img
            width={`100px`}
            height="100px"
            src={`${img_url}${movieImagepath4}`}
          ></img>
          <br />
        </div>
      )}
    </div>
  );
}

export default Movie;
