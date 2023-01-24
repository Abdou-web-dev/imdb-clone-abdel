import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../contextApi/MoviesProvider";

export const GetMovies = () => {
  const { latestMovies, setLatestMovies } = useContext(MoviesContext);

  const [loading, setLoading] = useState(false);
  let append = `&append_to_response=credits,videos,images,reviews`;
  const [latestMoviesNewArray, setLatestMoviesNewArray] = useState([{}]);
  const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=c611912a578da3c70cd0f51d4b6c2764&language=en-US`;

  const getLatestMovies = async () => {
    setLoading(true);
    let isMounted = true;
    const latestResponse = await axios.get(topRatedMoviesUrl);
    latestResponse?.data?.results.forEach(async (movie) => {
      const movieElem = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie?.id}?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`
      );
      latestMoviesNewArray.push(movieElem.data);
      if (isMounted) {
        setLatestMovies(latestMoviesNewArray);
      }
    });

    setLoading(false);
    return () => {
      isMounted = false;
    };
  };
  useEffect(() => {
    setTimeout(() => {
      getLatestMovies();
    }, 500);
    // console.log(editPickMovies);
  }, []);
  return { loading, getLatestMovies };
};
