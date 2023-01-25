import { Button, Tooltip } from "antd";
import ellipsis from "../assets/img/ellipsis.svg";
import "./styles.scss";

export function MovieReviews({ movie }) {
  let movieReviewAuthor = movie?.reviews?.results[0]?.author;
  let movieReviewContent = movie?.reviews?.results[0]?.content;
  let movieReviewAuthor2 = movie?.reviews?.results[1]?.author;
  let movieReviewContent2 = movie?.reviews?.results[1]?.content;
  let movieReviewUrl = movie?.reviews?.results[0]?.url;
  let movieReviewUrl2 = movie?.reviews?.results[1]?.url;

  function countWords(str) {
    const arr = str?.split(" ");
    return arr?.filter((word) => word !== "").length;
  }

  const KnowMore = ({ url }) => {
    return (
      <Button target="_blank" href={url} className="reviews-btn">
        <Tooltip title="Read more">
          <img src={ellipsis} alt="" />
        </Tooltip>
      </Button>
    );
  };

  return (
    <div className="movie-reviews-container">
      <div className="movie-reviews-review1">
        <span className="movie-reviews-r1-auth"> by : {movieReviewAuthor}</span>
        <br />
        <br />
        <div
          className="movie-reviews-r1-cont-wrapper"
          style={{
            overflowY:
              countWords(movieReviewContent) > 100 ? "scroll" : "hideen",
          }}
        >
          <span className="movie-reviews-r1-cont">{movieReviewContent}</span>
        </div>
        <KnowMore url={movieReviewUrl}></KnowMore>
      </div>

      <div className="movie-reviews-review2">
        {movieReviewAuthor2 && (
          <span className="movie-reviews-r2-auth">
            by : {movieReviewAuthor2}
          </span>
        )}
        <br /> <br />
        <div
          className="movie-reviews-r2-cont-wrapper"
          style={{
            overflowY:
              countWords(movieReviewContent) > 100 ? "scroll" : "hideen",
          }}
        >
          {movieReviewContent2 && (
            <span className="movie-reviews-r2-cont">{movieReviewContent2}</span>
          )}
        </div>
        {movieReviewContent2 && movieReviewAuthor2 && (
          <KnowMore url={movieReviewUrl2}></KnowMore>
        )}
      </div>
    </div>
  );
}
