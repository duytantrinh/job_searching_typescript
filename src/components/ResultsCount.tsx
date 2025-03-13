import {useSearch} from "../context/searchContext"
import {useDebounce} from "../lib/hooks"

export default function ResultsCount() {
  const {jobItems} = useSearch()
  const totalNumberOfResults = jobItems?.length || 0
  const debounced = useDebounce(totalNumberOfResults, 300) || 0

  return (
    <p className="count">
      <span className="u-bold">{debounced}</span> results
    </p>
  )
}
