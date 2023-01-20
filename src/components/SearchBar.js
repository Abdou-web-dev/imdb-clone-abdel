import { SearchByFilters } from "./search/SearchByFilters";
import { SearchField } from "./search/SearchField";

export const SearchBar = ({
  setFilteredResults,
  searchInput,
  setSearchInput,
  setshowResultsByFilterApplied,
}) => {
  return (
    <div>
      <SearchField
        {...{ setFilteredResults, searchInput, setSearchInput }}
      ></SearchField>
      <SearchByFilters
        {...{
          setFilteredResults,
          setshowResultsByFilterApplied,
          searchInput,
          setSearchInput,
        }}
      />
    </div>
  );
};
