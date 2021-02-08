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

export interface Attendance {
  id: string
  name: string
  pendingSelectionCount: number
}

export interface AttendanceAppearanceSelection {
  appearance: {
    company: {
      name: string
    }
  }
  createdAt: string
  id: string
  status: string
}
