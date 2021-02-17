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

export type Error = {
  message: string
  path: string
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

export type Event = {
  configuration: Configuration
  id: string
  investorSessionsSummary: [InvestorSessionsSummary]
  name?: string
  slug: string
  timeZone: TimeZone
}

export type Configuration = {
  investorMeetingConfiguration: InvestorMeetingsConfiguration
}

export type InvestorMeetingsConfiguration = {
  defaultStartupSelections: number
  meetingsPerSession: number
  notifyOfficeHoursInvitees: boolean
  sessionDuration: number
  sponsorLogoUrl: string
  startupPortalClosingAt: string
  startupPortalOpeningAt: string
  startupSelectionDeadline: string
}

export type TimeZone = {
  ianaName: string
}

export type InvestorSessionsSummary = {
  claimed: number
  count: number
  endsAt: string
  startsAt: string
}
