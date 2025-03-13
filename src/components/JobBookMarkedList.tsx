import {useActiveId} from "../lib/hooks"
import {JobItem} from "../lib/types"
import JobListItem from "./JobListItem"
import Spinner from "./Spinner"

type JobBookMarkedListProps = {
  jobItems: JobItem[]
  isLoading: boolean
}

export function JobBookMarkedList({
  jobItems,
  isLoading,
}: JobBookMarkedListProps) {
  const activeId = useActiveId()
  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        jobItems.map((jobItem) => (
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

export default JobBookMarkedList
