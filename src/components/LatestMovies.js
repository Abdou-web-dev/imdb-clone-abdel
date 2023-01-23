import { Pagination, Spin } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../contextApi/MoviesProvider";
import { MovieCard } from "./MovieCard";
import "./styles.scss";

export const LatestMovies = ({}) => {
  const [loading, setLoading] = useState(false);
  let append = `&append_to_response=credits,videos,images`;
  const [latestMoviesNewArray, setLatestMoviesNewArray] = useState([{}]);
  const { latestMovies, setLatestMovies } = useContext(MoviesContext);

  const [paginationCurrentPage, setPaginationCurrentPage] = useState(0);
  const [latestMoviesPerPage, setLatestMoviesPerPage] = useState(10);
  // const [postsParPage, setpostsParPage] = useState(10);
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
  }, []);

  if (loading)
    return (
      <div className="loading-spinner">
        <Spin spinning={true} size="large" />
      </div>
    );
  if (latestMovies) {
    return (
      <div className="latest-movies-list-container">
        <>
          {latestMovies?.map(
            (latestMovie, index) =>
              index > 0 && (
                <div>
                  <span>{index}</span>
                  <br />

                  <MovieCard
                    key={latestMovie?.id}
                    {...{ latestMovie }}
                  ></MovieCard>
                </div>
              )
          )}
        </>
        <div className="latest-movies-list-pagination-wrapper">
          <Pagination
            className={"latest-movies-list-pagination"}
            prevIcon={null}
            nextIcon={null}
            total={
              latestMovies.length > 0 && latestMovies.length <= 10
                ? 30 //3 pages
                : latestMovies.length >= 10 && latestMovies.length <= 20
                ? 60 //6 pages
                : latestMovies.length >= 20 && latestMovies.length <= 30
                ? 90
                : latestMovies.length >= 30 && latestMovies.length <= 40
                ? 120
                : latestMovies.length >= 40 && latestMovies.length <= 50
                ? 150
                : latestMovies.length >= 50 && latestMovies.length <= 60
                ? 180
                : 250
            }
            current={paginationCurrentPage}
            onChange={(page, e) => {
              setPaginationCurrentPage(page);
            }}
            showSizeChanger={false}
            showQuickJumper
          />
        </div>
      </div>
    );
  }
};
