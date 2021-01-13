export type Account = {
  email: string
  firstName: string
  id: string
  lastLoginTokenCreatedAt: string
  lastName: string
}

export type Assignment = {
  appLoginEmail: string
  assignee: Account
  state: string
}

export type TicketType = {
  description: string
  id: string
  name: string
}

export type OrderSummary = {
  ticketType: TicketType
  tickets: number
}

export enum OrderState {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
}

type Count = {
  count: number
}

type AssignedTickets = Count & {
  accepted?: Count
  checkedIn?: Count
  duplicate?: Count
  locked?: Count
  pending?: Count
}

type UnassignedTickets = Count & {
  neverAssigned?: Count
  rejected?: Count
}

export type TicketsSummary = {
  all: Count & {
    active?: Count & {
      assigned?: AssignedTickets
      unassigned?: UnassignedTickets
    }
    void?: Count
  }
}

export type Order = {
  owner: Account
  reference: string
  state: OrderState
  summary: OrderSummary
  ticketsSummary: TicketsSummary
}

export type Ticket = {
  assignment?: Assignment
  bookingRef: string
  id: string
  order: Order
  state: string
  ticketType: Pick<TicketType, 'name'>
}

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
