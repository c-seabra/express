export type PageInfo = {
  endCursor: string;
  hasNextPage: string;
  hasPreviousPage: string;
  startCursor: string;
};

export type UserError = {
  message: string;
  path: string[];
};

export type Error = {
  message: string;
  path: string;
};

export type Attendance = {
  attendanceAppearanceSelections?: {
    edges: [{ node: AttendanceAppearanceSelection }];
  };
  attendanceAppearanceSelectionsDetails: AttendanceAppearanceSelectionsDetails;
  bookingRef?: string;
  companyName: string;
  id: string;
  investorGdprConsent: boolean | undefined;
  investorSession?: {
    endsAt: string | undefined;
    startsAt: string | undefined;
  };
  name?: string;
};

export type AttendanceAppearanceSelectionsDetails = {
  acceptedSelectionCount?: number;
  attendanceAppearanceSelections?: {
    edges: [{ node: AttendanceAppearanceSelection }];
  };
  pendingSelectionCount?: number;
  rejectedSelectionCount?: number;
  submittedSelectionCount?: number;
};

export type AttendanceAppearanceSelection = {
  appearance: Appearance;
  endsAt: string;
  id: string;
  participations: [Attendance];
  sessionTimeslotId: string;
  startsAt: string;
  status: string;
  updatedAt: string;
};

export enum AttendanceAppearanceSelectionsStatus {
  ACCEPTED = 'Accepted',
  PENDING = 'Pending',
  REJECTED = 'Rejected',
  SUBMITTED = 'Submitted',
}

export type Appearance = {
  company: Company;
  id: string;
};

export type Company = {
  name: string;
};

export type Event = {
  configuration: Configuration;
  id: string;
  investorSessionsSummary: [InvestorSessionsSummary];
  name?: string;
  slug: string;
  timeZone: TimeZone;
};

export type Configuration = {
  investorMeetingConfiguration: InvestorMeetingsConfiguration;
};

export type InvestorMeetingsConfiguration = {
  defaultStartupSelections: number;
  meetingsPerSession: number;
  notifyOfficeHoursInvitees: boolean;
  sessionDuration: number;
  sponsorLogoUrl: string;
  startupPortalClosingAt: string;
  startupPortalOpeningAt: string;
  startupSelectionDeadline: string;
};

export type TimeZone = {
  ianaName: string;
};

export type InvestorSessionsSummary = {
  available: string;
  claimed: number;
  count: number;
  endsAt: string;
  startsAt: string;
};
