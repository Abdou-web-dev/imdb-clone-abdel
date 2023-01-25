import { Spin } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../contextApi/MoviesProvider";
import { MovieCard } from "./MovieCard";
import "./styles.scss";

export const EditorsPick = ({ searchInput }) => {
  const { EditPickmovies, setEditPickmovies } = useContext(MoviesContext);
  let append = `&append_to_response=credits,videos,images,reviews`;
  const [loading, setLoading] = useState(true);
  let movie1Url = `https://api.themoviedb.org/3/movie/343611?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie2Url = `https://api.themoviedb.org/3/movie/496243?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie3Url = `https://api.themoviedb.org/3/movie/13?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie4Url = `https://api.themoviedb.org/3/movie/769?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie5Url = `https://api.themoviedb.org/3/movie/724089?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie6Url = `https://api.themoviedb.org/3/movie/15?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie7Url = `https://api.themoviedb.org/3/movie/68718?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie8Url = `https://api.themoviedb.org/3/movie/617653?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie9Url = `https://api.themoviedb.org/3/movie/281957?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie10Url = `https://api.themoviedb.org/3/movie/76203?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie11Url = `https://api.themoviedb.org/3/movie/157336?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie12Url = `https://api.themoviedb.org/3/movie/429?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie13Url = `https://api.themoviedb.org/3/movie/155?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;
  let movie14Url = `https://api.themoviedb.org/3/movie/122?api_key=c611912a578da3c70cd0f51d4b6c2764${append}`;

  const getMovies = async () => {
    // setLoading(true);
    let isMounted = true;
    const res1 = await axios.get(movie1Url);
    const res2 = await axios.get(movie2Url);
    const res3 = await axios.get(movie3Url);
    const res4 = await axios.get(movie4Url);
    const res5 = await axios.get(movie5Url);
    const res6 = await axios.get(movie6Url);
    const res7 = await axios.get(movie7Url);
    const res8 = await axios.get(movie8Url);
    const res9 = await axios.get(movie9Url);
    const res10 = await axios.get(movie10Url);
    const res11 = await axios.get(movie11Url);
    const res12 = await axios.get(movie12Url);
    const res13 = await axios.get(movie13Url);
    const res14 = await axios.get(movie14Url);

    // const n = 100; // number of elements we want to get
    // const shuffledArray = latestMovies.sort(() => 0.5 - Math.random()); // shuffles array
    // const randomMovies = shuffledArray.slice(0, n); // gets first n elements after shuffle
    let array1 = [
      res1.data,
      res2.data,
      res3.data,
      res4.data,
      res5.data,
      res6.data,
      res7.data,
      res8.data,
      res9.data,
      res10.data,
      res11.data,
      res12.data,
      res13.data,
      res14.data,
    ];
    if (isMounted) {
      setEditPickmovies(array1);
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

  if (loading)
    return (
      <div className="loading-spinner ">
        <Spin spinning={true} size="large" />
      </div>
    );

  return (
    <div className="editor-pick-movies-list-container">
      <span className="intro">Editor's Picks Movies :</span>
      <div className="list-of-movies">
        {EditPickmovies &&
          EditPickmovies?.map((editorMovie, index) => (
            <MovieCard
              key={editorMovie?.id}
              {...{ editorMovie, searchInput }}
            ></MovieCard>
          ))}
      </div>
    </div>
  );
};
