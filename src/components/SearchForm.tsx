import {CiSearch} from "react-icons/ci"
import {useSearch} from "../context/searchContext"

export default function SearchForm() {
  const {searchText, setSearchText} = useSearch()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
      action="#"
      className="search"
    >
      <button type="submit">
        <CiSearch />
      </button>

      <input
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  )
}
