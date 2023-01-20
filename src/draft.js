import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

// my tmdb api key : c611912a578da3c70cd0f51d4b6c2764
function App() {
  const [movies, setMovies] = useState([]);
  const [title, settitle] = useState("");
  const [titles, settitles] = useState([]);
  const [title2, settitle2] = useState("");

  const [loading, setLoading] = useState(false);
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=c611912a578da3c70cd0f51d4b6c2764&language=en-US&page=10`;
  const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=c611912a578da3c70cd0f51d4b6c2764&language=en-US&page=1`;
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=c611912a578da3c70cd0f51d4b6c2764&language=en-US&page=10`;
  const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=c611912a578da3c70cd0f51d4b6c2764&language=en-US&page=1`;
  let inceptionMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=c611912a578da3c70cd0f51d4b6c2764&query=inception`;
  let TGFMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=c611912a578da3c70cd0f51d4b6c2764&query=The+GodFather`;

  const Discover_URL = `https://api.themoviedb.org/3/discover/movie?api_key=c611912a578da3c70cd0f51d4b6c2764&language=fr-FR
  &sort_by=popularity.asc&include_adult=false&primary_release_year=2022&include_video=false&page=500
  &with_watch_monetization_types=flatrate`;
  const Discover_URL2 = `https://api.themoviedb.org/3/discover/movie?api_key=c611912a578da3c70cd0f51d4b6c2764&language=es_ES&primary_release_year=2022`;
  const url2 =
    "https://api.themoviedb.org/3/discover/movie?api_key=c611912a578da3c70cd0f51d4b6c2764&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate";
  const img_url = "http://image.tmdb.org/t/p/w500"; //w500 or 'original' for full size
  let drama_url = `https://api.themoviedb.org/3/discover/movie?api_key=c611912a578da3c70cd0f51d4b6c2764&with_genres=36
  &primary_release_year=2021`;
  let genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=c611912a578da3c70cd0f51d4b6c2764`;
  let topMoviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=c611912a578da3c70cd0f51d4b6c2764&sort_by=vote_average.desc`;
  let idmoviedd = `https://api.themoviedb.org/3/search/movie?api_key=c611912a578da3c70cd0f51d4b6c2764&language=en-US&page=1&include_adult=false`;
  let theHateFullEightMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=c611912a578da3c70cd0f51d4b6c2764&query=The+Hateful+Eight`;
  let details = `https://api.themoviedb.org/3/movie/343611?api_key=c611912a578da3c70cd0f51d4b6c2764`;
  const mv1 = `The+Hateful+Eight`;
  const mv2 = `inception`;

  let twoMovies = `https://api.themoviedb.org/3/search/movie?api_key=c611912a578da3c70cd0f51d4b6c2764&query=${
    (mv1, mv2)
  }`;

  // genres 36 , 27 ,  10402

  const [titlee, settitlee] = useState(``);
  const [year, setyear] = useState(``);
  const [rated, setrated] = useState(``);
  const [picture, setpicture] = useState(null);
  const [overview, setoverview] = useState(``);
  let theHateFullEight = {
    key1: titlee,
    key2: year,
    key3: rated,
    key4: picture,
    key5: overview,
  };
  const getMovies = async () => {
    let isMounted = true;
    const res = await axios.get(drama_url);
    const res2 = await axios.get(theHateFullEightMovieUrl);
    const twoMoviesRes = await axios.get(twoMovies);
    const popularMoviesResponse = await axios.get(url);
    const topRatedMoviesResponse = await axios.get(topRatedUrl);

    // const res3 = await axios.get(details);

    // console.log(res.data.results, "results");
    // console.log(res2, "id");
    if (isMounted) {
      // settitle(res.data.results[0].original_title);
      // settitle2(res.data.original_title);
      // settitles(res.data.results);
      // console.log(res2.data?.results[0].original_title);
      console.log(topRatedMoviesResponse);

      settitlee(res2.data?.results[0].original_title);
      setyear(res2.data?.results[0].release_date);
      setrated(res2.data?.results[0].vote_average);
      setpicture(res2.data?.results[0].poster_path);
      setoverview(res2.data?.results[0].overview);
    }
    setLoading(false);

    return () => {
      isMounted = false; //this prevents the data from being loaded when the component unmouts
    };
  };
  let urls = [theHateFullEightMovieUrl, inceptionMovieUrl, TGFMovieUrl];

  // console.log(pokemons);
  useEffect(() => {
    setTimeout(() => {
      getMovies();
    }, 500);
  }, []);

  const getAllMovies = async () => {
    let isMounted = true;
    // const response = await axios.get(theHateFullEightMovieUrl);
    const requests = urls.map((url) => axios.get(url));

    axios.all(requests).then((responses) => {
      responses.forEach((resp) => {
        // console.info(resp.config.url);
        // console.table(msg);
        console.log(resp);
        if (isMounted) {
          settitle(resp.data?.results[0].original_title);
          setyear(resp.data?.results[0].release_date);
          setrated(resp.data?.results[0].vote_average);
          setpicture(resp.data?.results[0].poster_path);
          setoverview(resp.data?.results[0].overview);
        }
      });

      setLoading(false);
    });

    return () => {
      isMounted = false; //this prevents the data from being loaded when the component unmouts
    };
  };

  if (loading) return <div>loading data....</div>;
  return (
    <div
      className="App"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
      }}
    >
      {titles &&
        titles?.map((item, index) => {
          return (
            <div key={index} className="">
              <span>
                {index} &nbsp;&nbsp;
                {item.original_title}&nbsp;&nbsp;
              </span>
              <span>&nbsp;&nbsp;{item.release_date}</span>
              <img
                // src={`https://image.tmdb.org/${title.poster_path}`}
                src={`${img_url}${item.poster_path}`}
                alt=""
                width={`200px`}
                height={`200px`}
              />
            </div>
          );
        })}
      <div>
        <span>{theHateFullEight?.key1}</span> <br />
        <span>{theHateFullEight?.key2}</span>
        <br />
        <span>{theHateFullEight?.key3}</span>
        <br />
        <img src={`${img_url}${theHateFullEight?.key4}`}></img>
        <br />
        <span>{theHateFullEight?.key5}</span>
        <br />
        {/* <span>{theHateFullEight?.key1}</span> */}
      </div>
    </div>
  );
}

export default App;

// function Home() {
//   const [loading, setLoading] = useState(false);
//   const [movies, setMovies] = useState([{}]);
//   const img_url = "http://image.tmdb.org/t/p/w500"; //w500 or 'original' for full size
//   let movie1Url = `https://api.themoviedb.org/3/movie/343611?api_key=c611912a578da3c70cd0f51d4b6c2764`;
//   let movie2Url = `https://api.themoviedb.org/3/movie/496243?api_key=c611912a578da3c70cd0f51d4b6c2764`;
//   let movie3Url = `https://api.themoviedb.org/3/movie/13?api_key=c611912a578da3c70cd0f51d4b6c2764`;
//   let movie4Url = `https://api.themoviedb.org/3/movie/769?api_key=c611912a578da3c70cd0f51d4b6c2764`;
//   let movie5Url = `https://api.themoviedb.org/3/movie/724089?api_key=c611912a578da3c70cd0f51d4b6c2764`;
//   let movie6Url = `https://api.themoviedb.org/3/movie/15?api_key=c611912a578da3c70cd0f51d4b6c2764`;

//   const getMovies = async () => {
//     let isMounted = true;
//     const res1 = await axios.get(movie1Url);
//     const res2 = await axios.get(movie2Url);
//     const res3 = await axios.get(movie3Url);
//     const res4 = await axios.get(movie4Url);
//     const res5 = await axios.get(movie5Url);
//     const res6 = await axios.get(movie6Url);

//     if (isMounted) {
//       setMovies([
//         res1.data,
//         res2.data,
//         res6.data,
//         res3.data,
//         res4.data,
//         res5.data,
//       ]);
//       console.log(Array.isArray(movies));
//       //
//     }
//     return () => {
//       isMounted = false; //this prevents the data from being loaded when the component unmouts
//     };
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       getMovies();
//     }, 500);
//   }, []);

//   if (loading) return <div>loading data....</div>;

//   return (
//     <div>
//       {movies?.map((movie, index) => (
//         <>
//           <div>{movie.id}</div>
//           <span>{movie?.original_title}</span> <br />
//           <span>{movie?.release_date}</span>
//           <br />
//           <span>{movie?.vote_average}</span>
//           <br />
//           <img src={`${img_url}${movie?.poster_path}`}></img>
//           <br />
//           <span>{movie?.overview}</span>
//         </>
//       ))}
//     </div>
//   );
// }

// export default Home;

import React from "react";
import ReactDOM from "react-dom";
// import moment from "moment";
import { Carousel, Icon } from "antd";
// import "antd/dist/antd.css";

import "./index.css";

const Arrow = ({ type, style, className, onClick }) => (
  <Icon type={type} style={style} className={className} onClick={onClick} />
);

ReactDOM.render(
  <div style={{ margin: 24 }}>
    <Carousel
      arrows
      prevArrow={<Arrow type="left" />}
      nextArrow={<Arrow type="right" />}
    >
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
    </Carousel>
  </div>,
  document.getElementById("root")
);
