import { Button, Popover } from "antd";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import infoIcon from "../assets/img/infoIcon.svg";
import photo from "../assets/img/photo.svg";
import star from "../assets/img/star.svg";
import video from "../assets/img/videoo.svg";
import { MovieImages } from "../components/MovieImages";
import { MovieReviews } from "../components/MovieReviews";
import { MovieTrailer } from "../components/MovieTrailer";
import { MoviesContext } from "../contextApi/MoviesProvider";

import "./styles.scss";

function Movie() {
  const { id } = useParams();
  const { EditPickmovies, latestMovies } = useContext(MoviesContext);
  const [movie, setMovie] = useState({}); //object
  const [showTrailer, setshowTrailer] = useState(false);
  const [showImages, setshowImages] = useState(false);
  let star1 = movie?.credits?.cast[0]?.name;
  let star2 = movie?.credits?.cast[1]?.name;
  let star3 = movie?.credits?.cast[2]?.name;
  let star4 = movie?.credits?.cast[3]?.name;
  let star5 = movie?.credits?.cast[4]?.name;
  let stars = [star1, star2, star3, star4, star5];
  const img_url = "http://image.tmdb.org/t/p/w500"; //w500 or 'original' for full size

  let star1Photo = movie?.credits?.cast[0]?.profile_path;
  let star2Photo = movie?.credits?.cast[1]?.profile_path;
  let star3Photo = movie?.credits?.cast[2]?.profile_path;
  let star4Photo = movie?.credits?.cast[3]?.profile_path;
  let star5Photo = movie?.credits?.cast[4]?.profile_path;
  let directorName = movie?.credits?.crew[0]?.name;
  // let movieImagePath1 = movie?.images?.posters[0]?.file_path;
  // let movieImagePath2 = movie?.images?.posters[0]?.file_path;
  let movieImagePath3 = movie?.images?.posters[0]?.file_path;
  let movieImagePath4 = movie?.images?.posters[1]?.file_path;
  let movieImagePath5 = movie?.images?.logos[0]?.file_path;
  let movieImagePath6 = movie?.images?.logos[1]?.file_path;
  //2 backdrop and 2 logos
  let images = [
    movieImagePath3,
    movieImagePath4,
    movieImagePath5,
    movieImagePath6,
  ];
  //but 30 backdrops for each movie
  let movieImgUrls = movie?.images?.backdrops?.slice(0, 30).map((poster) => {
    return poster?.file_path;
  });

  let movieImages = images?.concat(movieImgUrls);
  let numberOfPhotos = movieImages?.length;

  let movieTrailerKey = movie?.videos?.results[0]?.key;
  let cast1 = star1?.slice(0, 1);
  let cast2 = star2?.slice(0, 1);
  let cast3 = star3?.slice(0, 1);
  let cast4 = star4?.slice(0, 1);

  // const [trailer] = trailers;

  // type === '"Trailer"';
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
    console.log(movieImgUrls);
  }, [movie, movieImgUrls]);

  function handleClick() {}

  return (
    <div className="movie-page-container">
      {movie && (
        <>
          <div className="movie-page-inner">
            <Link className="movies-goBack" to="/">
              <Button className="arrow">
                {" "}
                <span>&#8592;</span>
              </Button>
              {/* <span className="go-back">Go Back</span> */}
            </Link>

            <div className="movie-page-title">
              <span>{movie?.original_title}</span>
            </div>

            <div className="movie-page-vote">
              <img className="movie-card-infos-vote-img" src={star} alt="" />
              <span>{movie?.vote_average}</span>
            </div>

            <div className="movie-page-overview">
              <span>{movie?.overview}</span>
            </div>

            <div className="movie-page-creators">
              <span className="creators">Creators : </span>
              <span className="director">{directorName}</span>
            </div>

            <div className="movie-page-stars">
              <div className="star-wrapper">
                <span>Stars :</span>
              </div>
              <div className="stars-list">
                {stars &&
                  stars?.map((star, index) => (
                    <div className="the-list">
                      <Popover
                        className="stars-popover"
                        content={
                          index === 0 ? (
                            <img
                              className="pop-img"
                              width={`350px`}
                              height="350px"
                              src={`${img_url}${star1Photo}`}
                            ></img>
                          ) : index === 1 ? (
                            <img
                              className="pop-img"
                              width={`350px`}
                              height="350px"
                              src={`${img_url}${star2Photo}`}
                            ></img>
                          ) : index === 2 ? (
                            <img
                              className="pop-img"
                              width={`350px`}
                              height="350px"
                              src={`${img_url}${star3Photo}`}
                            ></img>
                          ) : index === 3 ? (
                            <img
                              className="pop-img"
                              width={`350px`}
                              height="350px"
                              src={`${img_url}${star4Photo}`}
                            ></img>
                          ) : index === 4 ? (
                            <img
                              className="pop-img"
                              width={`350px`}
                              height="350px"
                              src={`${img_url}${star5Photo}`}
                            ></img>
                          ) : null
                        }
                        title="Title"
                      >
                        <img src={infoIcon} alt="" />
                        <span key={index}>
                          {star} {index < 4 && <span> , </span>}
                        </span>
                      </Popover>
                    </div>
                  ))}
              </div>
            </div>

            <div className="movie-page-add-btn-wrapper">
              <Button onClick={handleClick} className="movie-page-add-btn">
                <span>Add to WatchList</span>
              </Button>
            </div>

            <div className="movie-page-top-casts">
              <span className="casts">Top Casts :</span>
              <div className="top-casts-letters">
                <Popover content={star1}>
                  <div>
                    <span>{cast1}</span>
                  </div>
                </Popover>
                <Popover content={star2}>
                  <div>
                    <span>{cast2}</span>
                  </div>
                </Popover>
                <Popover content={star3}>
                  <div>
                    <span>{cast3}</span>
                  </div>
                </Popover>
                <Popover content={star4}>
                  <div>
                    <span>{cast4}</span>
                  </div>
                </Popover>
              </div>
              {/* <img src="" alt="" /> */}
            </div>

            <div className="movie-page-date">
              <span className="txt1">Released on : </span>
              <span className="txt2">{movie?.release_date}</span>
            </div>

            <div className="movie-page-reviews">
              <span className="reviews">Reviews : </span>
              {movie?.reviews ? (
                <div className="movie-page-reviews-inner">
                  <MovieReviews movie={movie}></MovieReviews>
                </div>
              ) : (
                <span className="nothing-available">
                  No Review Available for this movie !
                </span>
              )}
            </div>
          </div>

          <div className="movie-page-trailer-and-images">
            <div className="movie-page-trailer">
              {showTrailer ? (
                <MovieTrailer movie={movie}></MovieTrailer>
              ) : showImages ? (
                <MovieImages
                  {...{
                    movieImages,
                    movie,
                  }}
                ></MovieImages>
              ) : null}
            </div>

            <div className="movie-page-images"></div>
            <div className="video-btn-wrapper">
              <Button
                onClick={() => {
                  setshowTrailer(true);
                  setshowImages(false);
                }}
                className="video-btn"
              >
                <img src={video} alt="" />
                <span>Trailer</span>
              </Button>
            </div>
            <div className="images-btn-wrapper">
              <Button
                onClick={() => {
                  setshowImages(true);
                  setshowTrailer(false);
                }}
                className="images-btn"
              >
                <img src={photo} alt="" />
                <span>{numberOfPhotos} Photos</span>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Movie;
