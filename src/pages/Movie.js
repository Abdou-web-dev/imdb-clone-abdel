import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MoviesContext } from "../contextApi/MoviesProvider";

function Movie() {
  const { id } = useParams();
  const { EditPickmovies } = useContext(MoviesContext);
  const [movie, setMovie] = useState({}); //object
  const img_url = "http://image.tmdb.org/t/p/w500"; //w500 or 'original' for full size

  useEffect(() => {
    let movieElem = EditPickmovies.find(
      (movieItem) => movieItem.id === parseInt(id)
    );
    if (movieElem) {
      setMovie(movieElem);
    }
  }, []);
  return (
    <div>
      <Link className="blog-goBack" to="/">
        <span> &#8592;</span> <span>Go Back</span>
      </Link>
      {movie && (
        <div>
          <div style={{ border: "1px solid" }}>
            <div>
              <div>{movie?.id}</div>
              <span>{movie?.original_title}</span> <br />
              <span>{movie?.release_date}</span>
              <br />
              <span>{movie?.vote_average}</span>
              <br />
              <img
                width={`100px`}
                height="100px"
                src={`${img_url}${movie?.poster_path}`}
              ></img>
              <br />
              <span>{movie?.overview}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Movie;
