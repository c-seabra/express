export type InvestorSessionsSummary = [
  {
    claimed: number
    count: number
    endsAt: string
    startsAt: string
  }
]

export type PageInfo = {
  endCursor: string
  hasNextPage: string
  hasPreviousPage: string
  startCursor: string
}

export type UserError = {
  message: string
  path: string
}
