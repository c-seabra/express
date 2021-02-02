export type Account = {
  bio?: string
  city?: string
  companyName?: string
  companySizeId?: string
  email: string
  firstName: string
  gender?: string
  id: string
  industryId?: string
  jobTitle?: string
  lastLoginTokenCreatedAt: string
  lastName: string
  marketingConsent?: 'Yes' | 'No'
  personalisationConsent?: 'Yes' | 'No'
  phoneNumber?: string
}

export type Assignment = {
  appLoginEmail: string
  assignee: Account
  state: string
}

export type TicketType = {
  description?: string
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

export enum TicketStatus {
  ACCEPTED = 'Accepted',
  ASSIGNED = 'Assigned',
  CHECKED_IN = 'Checked In',
  DUPLICATE = 'Duplicate',
  LOCKED = 'Locked',
  REJECTED = 'Rejected',
  UNASSIGNED = 'Unassigned',
  VOID = 'Void',
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

type EventDataOption = {
  id: string
  name: string
}

export type EventData = {
  companySizes: EventDataOption[]
  id: string
  industries: EventDataOption[]
  name?: string
  passportRequired: boolean
  slug: string
}
