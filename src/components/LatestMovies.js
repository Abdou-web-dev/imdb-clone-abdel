import axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export const LatestMovies = ({}) => {
  const [loading, setLoading] = useState(true);
  let append = `&append_to_response=credits,videos,images`;
  const [id, setId] = useState(``);
  const [latestMovies, setLatestMovies] = useState([{}]);
  const [latestMoviesNewArray, setLatestMoviesNewArray] = useState([{}]);

  // const latestUrl = `https://api.themoviedb.org/3/movie/latest?api_key=c611912a578da3c70cd0f51d4b6c2764&language=en-US`;
  const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=c611912a578da3c70cd0f51d4b6c2764&language=en-US&page=1`;

  // newSelectedStudents.push(studentId); // ===   newSelectedStudents = [...selectedStudents, studentId];

  const getLatestMovies = async () => {
    let isMounted = true;
    const latestResponse = await axios.get(topRatedMoviesUrl);
    // console.log(latestResponse);

    latestResponse?.data?.results.forEach(async (movie) => {
      const movieElem = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie?.id}?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`
      );

      latestMoviesNewArray.push(movieElem.data);
      setLatestMovies(latestMoviesNewArray);
      // console.log(latestMovies);
      setLoading(false);
    });

    // if (isMounted) {
    //   setLatestMovies(latestResponse?.data?.results);
    // }
    setLoading(false);
    return () => {
      isMounted = false;
    };
  };

  let singleMovieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;

  useEffect(() => {
    getLatestMovies();
  }, []);

  // if (loading) return <div>loading data....</div>;
  if (latestMovies) {
    return (
      <div>
        <div>
          {latestMovies?.map((latestMovie) => (
            // <MovieCard key={latestMovie?.id} {...{ latestMovie }}></MovieCard>
            <ReactPlayer
              width="150px"
              height="150px"
              className="react-player"
              // playIcon={<PlayIcon />}
              controls
              light
              url={`https://www.youtube.com/watch?v=${latestMovie?.videos?.results[0].key}`}
              // when using react-player, must type watch in the url , rather than embed
            />
          ))}
        </div>
      </div>
    );
  }
};
