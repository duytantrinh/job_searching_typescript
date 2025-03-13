import {forwardRef} from "react"
import {useBookmark} from "../context/BookmarksContextProvider"
import JobBookMarkedList from "./JobBookMarkedList"
import {createPortal} from "react-dom"

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const {bookmarkedJobItems, isLoading} = useBookmark()

  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobBookMarkedList jobItems={bookmarkedJobItems} isLoading={isLoading} />
    </div>,
    document.body
  )
})

export default BookmarksPopover
