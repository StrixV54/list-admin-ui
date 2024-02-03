/* eslint-disable react/prop-types */
export default function SearchBar({ handleEnter }) {
  return (
    <input
      type="text"
      placeholder="Search by name, email or role"
      onKeyDown={handleEnter}
      className="search border border-slate-300 p-2 w-full rounded-lg"
    />
  );
}
