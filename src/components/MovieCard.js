import { useEffect } from "react";
import Highlight from "react-highlighter";
import ReactPlayer from "react-player/youtube";
import { Link } from "react-router-dom";

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

  let star1 = filteredResult?.credits?.cast[0].name;
  let star2 = filteredResult?.credits?.cast[1].name;
  let star3 = filteredResult?.credits?.cast[2].name;
  let star4 = filteredResult?.credits?.cast[3].name;
  let star5 = filteredResult?.credits?.cast[4].name;
  let directorName = filteredResult?.credits?.crew[0].name;

  useEffect(() => {
    if (searchInput) console.log(searchInput);
  }, [searchInput]);

  let movieGenres = [
    editorMovie?.genres[0]?.name,
    editorMovie?.genres[1]?.name,
    editorMovie?.genres[2]?.name,
  ];

  return (
    <div>
      <div>
        <Link to={`/movie/${movieItem?.id}`} style={{ textDecoration: "none" }}>
          <div>
            {!latestMovie && (
              <div>
                <span>genres :</span> <br />
                <div>{movieGenres[0]}</div>
              </div>
            )}
            <div>{movieItem?.id}</div>
            <span>{movieItem?.original_title}</span> <br />
            <span>{movieItem?.release_date}</span>
            <br />
            <span>{movieItem?.vote_average}</span>
            <br />
            <img
              width={`100px`}
              height="100px"
              src={`${img_url}${movieItem?.poster_path}`}
            ></img>
            <div>
              {/* <iframe
                // width={`150px`}
                // height={`150px`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowfullscreen
                src={"https://www.youtube.com/embed?v=tlTdbc5byAs"}
                frameborder="0"
              ></iframe> */}
            </div>
            <br />
            <span>{movieItem?.overview}</span>
          </div>
          {searchInput?.length !== 0 && !latestMovie && (
            <div>
              <div>
                <span>Directed by :</span>
                <Highlight search={searchInput}>{directorName}</Highlight>
              </div>

              <div>
                <span>Starring :</span>
                <Highlight search={searchInput}>{star1}</Highlight>
                {/* means search if the word typed in the input field exists in star1 */}
                <Highlight search={searchInput}>{star2}</Highlight>
                <Highlight search={searchInput}>{star3}</Highlight>
                <Highlight search={searchInput}>{star4}</Highlight>
                <Highlight search={searchInput}>{star5}</Highlight>
              </div>
            </div>
          )}
        </Link>
        <ReactPlayer
          width="100%"
          height="90%"
          className="react-player"
          // playIcon={<PlayIcon />}
          controls
          light
          url={`https://www.youtube.com/watch?v=${keyUrl}`}
          // when using react-player, must type watch in the url , rather than embed
        />
      </div>
    </div>
  );
};
