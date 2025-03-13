/* eslint-disable react-refresh/only-export-components */
import {createContext, useContext} from "react"
import {useJobItems, useLocalStorage} from "../lib/hooks"
import {JobItemExpanded} from "../lib/types"

type BookmarksContext = {
  bookmarkIds: number[]
  handleToggleBookmark: (id: number) => void
  bookmarkedJobItems: JobItemExpanded[]
  isLoading: boolean
}

const BookMarksContext = createContext({} as BookmarksContext)

function BookmarksContextProvider({children}: {children: React.ReactNode}) {
  const [bookmarkIds, setBookmarkIds] = useLocalStorage<number[]>(
    "bookmark_job_searching",
    []
  )

  const {jobItems: bookmarkedJobItems, isLoading} = useJobItems(bookmarkIds)

  // ======= event handlers BOOKMARK
  const handleToggleBookmark = (id: number) => {
    if (bookmarkIds.includes(id)) {
      setBookmarkIds((prev) => prev.filter((item) => item !== id))
    } else {
      setBookmarkIds((prev) => [...prev, id])
    }
  }

  return (
    <BookMarksContext.Provider
      value={{
        bookmarkIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookMarksContext.Provider>
  )
}

function useBookmark() {
  const context = useContext(BookMarksContext)
  if (!context) {
    throw new Error("useBookmark was used outside SearchProvider")
  }
  return context
}

export {BookmarksContextProvider, useBookmark}
