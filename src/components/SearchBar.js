import { SearchByFilters } from "./search/SearchByFilters";
import { SearchField } from "./search/SearchField";
import "./styles.scss";

export const SearchBar = ({
  setFilteredResults,
  searchInput,
  setSearchInput,
  setshowResultsByFilterApplied,
}) => {
  return (
    <div className="searchbar-container">
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
