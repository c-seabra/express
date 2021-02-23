export type Address = {
  id: string;
  city: string;
  postalCode: string;
  lineOne: string;
  lineTwo: string;
  region: string;
  country: Country;
};

export type AddressInput = {
  city: string;
  postalCode: string;
  lineOne: string;
  lineTwo: string;
  region: string;
  countryId: string;
};

export type Country = {
  id: string;
  name: string;
};

export enum Currency {
  "USD",
  "EUR",
  "CAD",
  "CNY",
  "RUB",
  "JPY",
  "GBP",
  "AUD",
  "CHF",
  "HKD",
  "NZD",
  "SEK",
  "KRW",
  "SGD",
  "NOK",
  "MXN",
  "INR",
  "ZAR",
  "TRY",
  "BRL",
  "TWD",
  "DKK",
  "PLN",
  "THB",
  "IDR",
  "HUF",
  "CZK",
  "ILS",
  "CLP",
  "PHP",
  "AED",
  "COP",
  "SAR",
  "MYR",
  "RON",
}

export type Event = {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  country?: Country;
  currency?: Currency;
  baseUrl?: string;
};

export type LegalEntity = {
  id: string;
  name: string;
  regNumber?: string;
  website?: string;
  taxNumber?: string;
  email?: string;
  address?: Address;
};
