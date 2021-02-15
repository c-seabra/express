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
  path: [string]
}

export type Attendance = {
  attendanceAppearanceSelections?: {
    edges: [{ node: AttendanceAppearanceSelection }]
  }
  id: string
  name: string
  pendingSelectionCount: number
}

export type AttendanceAppearanceSelection = {
  appearance: Appearance
  id: string
  status: string
  updatedAt: string
}

export type Appearance = {
  company: Company
}

export type Company = {
  name: string
}
