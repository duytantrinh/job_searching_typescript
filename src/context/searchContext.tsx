import {createContext, useContext, useEffect, useState} from "react"
import {JobItem} from "../lib/types"
import {BASE_API_URL, RESULTS_PER_PAGE} from "../lib/constants"
import {useDebounce} from "../lib/hooks"

import {handleError} from "../lib/utils"

type SearchContext = {
  searchText: string
  setSearchText: (searchText: string) => void
  isLoading: boolean
  jobItemsSortedandSliced: JobItem[]
  jobItems: JobItem[]
  handleChangePage: (direction: "next" | "previous") => void
  currentPage: number
  totalNumberPages: number
  sortBy: "recent" | "relevant"
  handleChangeSortBy: (newSortBy: "recent" | "relevant") => void
}

const SearchContext = createContext({} as SearchContext)

function SearchProvider({children}: {children: React.ReactNode}) {
  // state
  const [jobItems, setJobItems] = useState<JobItem[]>([])
  const [searchText, setSearchText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<"recent" | "relevant">("relevant")

  // derived state
  const debouncedSearchText = useDebounce(searchText, 300)

  const jobItemsAfterSorted = (jobItems: JobItem[]): JobItem[] => {
    return [...(jobItems || [])].sort((a, b) => {
      if (sortBy === "relevant") {
        return b.relevanceScore > a.relevanceScore ? 1 : -1
      } else if (sortBy === "recent") {
        return a.daysAgo > b.daysAgo ? 1 : -1
      }
      return 0
    })
  }
  const jobItemsSorted = jobItemsAfterSorted(jobItems)

  const handleChangeSortBy = (newSortBy: "recent" | "relevant") => {
    setCurrentPage(1)

    setSortBy(newSortBy)
  }

  // ======= event handlers PAGINATION after sorting
  const jobItemsSortedandSliced = jobItemsSorted?.slice(
    currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE // show 7 results per page
  )

  const totalNumberPages = jobItems?.length / RESULTS_PER_PAGE

  const handleChangePage = (direction: "next" | "previous") => {
    if (direction === "next") {
      setCurrentPage((page) => page + 1)
    } else if (direction === "previous") {
      setCurrentPage((page) => page - 1)
    }
  }

  useEffect(() => {
    if (!debouncedSearchText) return

    const fetchData = async () => {
      try {
        setIsLoading(true)

        const response = await fetch(
          `${BASE_API_URL}?search=${debouncedSearchText}`
        )

        const data = await response.json()

        setIsLoading(false)
        setJobItems(data.jobItems)
      } catch (error: unknown) {
        handleError(error)
      }
    }

    fetchData()
  }, [debouncedSearchText])

  return (
    <SearchContext.Provider
      value={{
        jobItems,
        searchText,
        setSearchText,
        isLoading,
        jobItemsSortedandSliced,
        handleChangePage,
        currentPage,
        totalNumberPages,
        handleChangeSortBy,
        sortBy,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined)
    throw new Error("useSearch was used outside SearchProvider")
  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export {SearchProvider, useSearch}
