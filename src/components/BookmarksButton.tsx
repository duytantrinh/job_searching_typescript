import {TriangleDownIcon} from "@radix-ui/react-icons"
import BookmarksPopover from "./BookmarksPopover"
import {useEffect, useRef, useState} from "react"
// import {useOnClickOutside} from "../lib/hooks"

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const popOverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !buttonRef.current?.contains(e.target) &&
        !popOverRef.current?.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <section>
      <button
        ref={buttonRef}
        className="bookmarks-btn"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Bookmarks <TriangleDownIcon />
      </button>

      {isOpen && <BookmarksPopover ref={popOverRef} />}
    </section>
  )
}
