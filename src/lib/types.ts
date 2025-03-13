export type JobItem = {
  id: number
  badgeLetters: string
  title: string
  company: string
  daysAgo: number
  relevanceScore: number
}

// for job Item Detail
export type JobItemExpanded = JobItem & {
  description: string
  qualifications: string[]
  reviews: string[]
  duration: string
  salary: string
  location: string
  coverImgURL: string
  companyURL: string
}

export type SortBy = {
  sortBy: "recent" | "relevant"
}
