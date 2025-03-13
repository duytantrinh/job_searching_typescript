import {ArrowLeftIcon, ArrowRightIcon} from "@radix-ui/react-icons"
import {useSearch} from "../context/searchContext"

export default function Pagination() {
  const {currentPage, handleChangePage, totalNumberPages} = useSearch()

  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction="previous"
          currentPage={currentPage}
          onClick={() => handleChangePage("previous")}
        />
      )}

      {currentPage < totalNumberPages && (
        <PaginationButton
          direction="next"
          currentPage={currentPage}
          onClick={() => handleChangePage("next")}
        />
      )}
    </section>
  )
}

type PaginationButtonProps = {
  currentPage: number
  direction: "previous" | "next"
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "previous" && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}

      {direction === "next" && (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  )
}
