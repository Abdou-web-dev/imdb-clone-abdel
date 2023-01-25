import no_data from "../assets/img/null.svg";
import { MovieCard } from "./MovieCard";
import "./styles.scss";

export const FilteredMovies = ({ filteredResults, searchInput }) => {
  return (
    <div
      className={`filtered-movies-container
    ${filteredResults?.length > 1 ? `more-than-one-result` : ""}
    ${filteredResults?.length === 0 ? `filtered-movies-container-null` : ""}
    `}
    >
      {filteredResults &&
        filteredResults?.map((filteredResult) => (
          <MovieCard
            key={filteredResult?.id}
            {...{ filteredResult, searchInput }}
          ></MovieCard>
        ))}
      {filteredResults?.length === 0 && (
        <div className="no_result_found">
          <img src={no_data} alt="" />
          <span>No Result Found !</span>
        </div>
      )}
    </div>
  );
};
