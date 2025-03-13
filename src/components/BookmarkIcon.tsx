import {BookmarkFilledIcon} from "@radix-ui/react-icons"
import {useBookmark} from "../context/BookmarksContextProvider"

type BookmarkIconProps = {
  id: number
}

export default function BookmarkIcon({id}: BookmarkIconProps) {
  const {bookmarkIds, handleToggleBookmark} = useBookmark()

  return (
    <button
      className="bookmark-btn"
      onClick={(e) => {
        handleToggleBookmark(id)

        e.stopPropagation()
        e.preventDefault()
      }}
    >
      <BookmarkFilledIcon
        className={`${bookmarkIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  )
}
