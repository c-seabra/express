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
