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
  bookingRef?: string;
  companyName: string;
  id: string;
  name?: string;
};

export type Appearance = {
  company: Company;
  id: string;
};

export type Company = {
  name: string;
};

export type TimeZone = {
  ianaName: string;
};
