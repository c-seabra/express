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

export enum AttendeeTypes {
  INVESTOR = 'Investor',
  SPEAKER = 'Speaker',
}

export interface Investor {
  name: string
  id: string
  pendingSelectionCount: number
}
