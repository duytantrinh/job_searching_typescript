import {useSearch} from "../context/searchContext"
import {useActiveId} from "../lib/hooks"
import JobListItem from "./JobListItem"
import Spinner from "./Spinner"

export function JobList() {
  const {isLoading, jobItemsSortedandSliced} = useSearch()
  const activeId = useActiveId()

  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        jobItemsSortedandSliced.map((jobItem) => (
          <JobListItem
            jobItem={jobItem}
            key={jobItem.id}
            isActive={activeId === jobItem.id ? true : false}
          />
        ))
      )}
    </ul>
  )
}

export default JobList
