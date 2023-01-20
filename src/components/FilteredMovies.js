import { MovieCard } from "./MovieCard";

export const FilteredMovies = ({ filteredResults, searchInput }) => {
  return (
    <div>
      {filteredResults &&
        filteredResults?.map((filteredResult) => (
          <MovieCard
            key={filteredResult?.id}
            {...{ filteredResult, searchInput }}
          ></MovieCard>
        ))}
    </div>
  );
};
