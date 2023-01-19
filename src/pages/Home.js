import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([{}]); //an array of objects
  const img_url = "http://image.tmdb.org/t/p/w500"; //w500 or 'original' for full size
  let movie1Url = `https://api.themoviedb.org/3/movie/343611?api_key=c611912a578da3c70cd0f51d4b6c2764`;
  let movie2Url = `https://api.themoviedb.org/3/movie/496243?api_key=c611912a578da3c70cd0f51d4b6c2764`;
  let movie3Url = `https://api.themoviedb.org/3/movie/13?api_key=c611912a578da3c70cd0f51d4b6c2764`;
  let movie4Url = `https://api.themoviedb.org/3/movie/769?api_key=c611912a578da3c70cd0f51d4b6c2764`;
  let movie5Url = `https://api.themoviedb.org/3/movie/724089?api_key=c611912a578da3c70cd0f51d4b6c2764`;
  let movie6Url = `https://api.themoviedb.org/3/movie/15?api_key=c611912a578da3c70cd0f51d4b6c2764`;

  const getMovies = async () => {
    let isMounted = true;
    const res1 = await axios.get(movie1Url);
    const res2 = await axios.get(movie2Url);
    const res3 = await axios.get(movie3Url);
    const res4 = await axios.get(movie4Url);
    const res5 = await axios.get(movie5Url);
    const res6 = await axios.get(movie6Url);

    if (isMounted) {
      setMovies([
        res1.data,
        res2.data,
        res6.data,
        res3.data,
        res4.data,
        res5.data,
      ]);
      console.log(Array.isArray(movies));
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
      {movies?.map((movie) => (
        <div key={movie.id}>
          <div>{movie.id}</div>
          <span>{movie?.original_title}</span> <br />
          <span>{movie?.release_date}</span>
          <br />
          <span>{movie?.vote_average}</span>
          <br />
          <img src={`${img_url}${movie?.poster_path}`}></img>
          <br />
          <span>{movie?.overview}</span>
        </div>
      ))}
    </div>
  );
}

export default Home;
