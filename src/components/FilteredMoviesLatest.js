export const FilteredMoviesLatest = ({
  filteredResultsLatest,
  searchInput,
}) => {
  return (
    <div>
      {filteredResultsLatest &&
        filteredResultsLatest?.map((filteredResultLatest) => (
          // <MovieCard
          //   key={filteredResultLatest?.id}
          //   {...{ filteredResultLatest, searchInput }}
          // ></MovieCard>
          <>
            <span style={{ fontWeight: "bolder" }}>filteredResultsLatest</span>
            <div>11{filteredResultLatest?.original_title}</div>
          </>
        ))}
    </div>
  );
};
