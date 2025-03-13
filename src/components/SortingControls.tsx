import {ImSortAmountAsc} from "react-icons/im"
import {useSearch} from "../context/searchContext"
import React from "react"

export default function Sorting() {
  const {sortBy, handleChangeSortBy} = useSearch()

  return (
    <section className="sorting">
      <ImSortAmountAsc />
      <SortingButton
        onClick={() => handleChangeSortBy("relevant")}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        onClick={() => handleChangeSortBy("recent")}
        isActive={sortBy === "recent"}
      >
        Recent
      </SortingButton>
    </section>
  )
}

type SortingButtonProps = {
  children: React.ReactNode
  onClick: () => void
  isActive: boolean
}

function SortingButton({children, onClick, isActive}: SortingButtonProps) {
  return (
    <button
      className={`sorting__button sorting__button--recent ${
        isActive && "sorting__button--active"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
