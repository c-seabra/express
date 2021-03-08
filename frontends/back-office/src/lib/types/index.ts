export type Address = {
  city: string;
  country: Country;
  id: string;
  lineOne: string;
  lineTwo: string;
  postalCode: string;
  region: string;
};

export type AddressInput = {
  city: string;
  countryId: string;
  lineOne: string;
  lineTwo: string;
  postalCode: string;
  region: string;
};

export type Country = {
  id: string;
  name: string;
};

export enum Currency {
  'USD',
  'EUR',
  'CAD',
  'CNY',
  'RUB',
  'JPY',
  'GBP',
  'AUD',
  'CHF',
  'HKD',
  'NZD',
  'SEK',
  'KRW',
  'SGD',
  'NOK',
  'MXN',
  'INR',
  'ZAR',
  'TRY',
  'BRL',
  'TWD',
  'DKK',
  'PLN',
  'THB',
  'IDR',
  'HUF',
  'CZK',
  'ILS',
  'CLP',
  'PHP',
  'AED',
  'COP',
  'SAR',
  'MYR',
  'RON',
}

export type Event = {
  baseUrl?: string;
  country?: Country;
  currency?: Currency;
  description?: string;
  endDate?: string;
  id: string;
  name: string;
  slug?: string;
  startDate?: string;
  taxNumber?: string;
};

export type LegalEntity = {
  address?: Address;
  email?: string;
  id: string;
  name: string;
  regNumber?: string;
  taxNumber?: string;
  website?: string;
};
