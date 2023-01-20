import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../contextApi/MoviesProvider";
import { MovieCard } from "./MovieCard";

export const EditorsPick = ({ searchInput }) => {
  const { EditPickmovies, setEditPickmovies } = useContext(MoviesContext);
  let append = `&append_to_response=credits,videos,images`;
  // console.log(EditPickmovies);
  const [loading, setLoading] = useState(true);
  let movie1Url = `https://api.themoviedb.org/3/movie/343611?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie2Url = `https://api.themoviedb.org/3/movie/496243?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie3Url = `https://api.themoviedb.org/3/movie/13?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie4Url = `https://api.themoviedb.org/3/movie/769?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie5Url = `https://api.themoviedb.org/3/movie/724089?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie6Url = `https://api.themoviedb.org/3/movie/15?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie7Url = `https://api.themoviedb.org/3/movie/49046?api_key=c611912a578da3c70cd0f51d4b6c2764&append_to_response=credits,videos,images`;
  // let ImNeuesUrl = `https://api.themoviedb.org/3/search/movie?api_key=c611912a578da3c70cd0f51d4b6c2764&query=Im+Westen+nichts+Neues`;

  // https://api.themoviedb.org/3/movie/latest?api_key=<<api_key>>&language=en-US
  // https://api.themoviedb.org/3/trending/movie/week?api_key=<<api_key>>
  // const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=c611912a578da3c70cd0f51d4b6c2764&language=en-US&page=10`;

  const getMovies = async () => {
    let isMounted = true;
    const res1 = await axios.get(movie1Url);
    const res2 = await axios.get(movie2Url);
    const res3 = await axios.get(movie3Url);
    const res4 = await axios.get(movie4Url);
    const res5 = await axios.get(movie5Url);
    const res6 = await axios.get(movie6Url);
    const resCredits = await axios.get(movie1Url);
    const resCredists = await axios.get(movie3Url);

    // console.log(Array.isArray(resCredits.data.credits.cast[0].name));
    // console.log(Array.isArray(resCredits.data.credits.crew));
    // console.log(Array.isArray(resCredits.data.videos.results));
    // console.log(resCredits, resCredists);

    if (isMounted) {
      setEditPickmovies([
        res1.data,
        res2.data,
        res6.data,
        res3.data,
        res4.data,
        res5.data,
      ]);
    }
    setLoading(false);
    return () => {
      isMounted = false; //this prevents the data from being loaded when the component unmouts
    };
  };

  useEffect(() => {
    setTimeout(() => {
      getMovies();
    }, 500);
  }, []);

  if (loading) return <div>loading data....</div>;

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          gap: "20px",
        }}
      >
        {EditPickmovies &&
          EditPickmovies?.map((editorMovie) => (
            <MovieCard
              key={editorMovie?.id}
              {...{ editorMovie, searchInput }}
            ></MovieCard>
          ))}
      </div>
    </div>
  );
};
