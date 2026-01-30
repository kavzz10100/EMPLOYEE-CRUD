const SearchBar = ({ value, onChange }) => {
  return (
    <input
      className="search-input"
      placeholder="Search employee by name…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
