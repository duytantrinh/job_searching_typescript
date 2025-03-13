import {useEffect, useState} from "react"
import {BASE_API_URL} from "./constants"

import {useQueries, useQuery} from "@tanstack/react-query"
import {JobItemExpanded} from "./types"

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null)

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1)
      setActiveId(id)
    }
    handleHashChange()

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return activeId
}

// ================

type JobItemApiResponse = {
  public: boolean
  jobItem: JobItemExpanded
}

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const res = await fetch(`${BASE_API_URL}/${id}`)
  // 4xx, 5xx error
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.description)
  }

  const data = await res.json()

  // console.log(data) // {public: true, jobItem: {…}} => return type là {public , jobItem}

  return data
}

export function useJobItem(id: number | null) {
  const {data, isFetching, error} = useQuery({
    queryKey: ["job-item", id],
    queryFn: () => (id ? fetchJobItem(id) : null),
    staleTime: 1000 * 60 * 60, // how long to make new request
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(id), // first time load page
  })
  const jobItem = data?.jobItem

  return {jobItem, isFetching, error} as const
}

// (==== fetch Multiple Query from React Query by useQueries())
export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60, // how long to make new request
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id), // first time load page
    })),
  })

  const jobItems = results
    .map((result) => result.data?.jobItem)

    .filter((jobItem) => jobItem !== undefined)

  //.some check at least one of them true => return true
  const isLoading = results.some((result) => result.isLoading)

  return {
    jobItems,
    isLoading,
  }
}

// ========================

export const useDebounce = <T>(value: T, delay = 250): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timerId)
  }, [value, delay])

  return debouncedValue
}

//  (using GENERIC và TUPLE type)
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  )

  // add bookmarkIds[] to localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue] as const
}

//============
export function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current?.contains(e.target as Node))
      ) {
        handler()
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [refs, handler])
}
