import {
  fromCents,
  toCents,
  Total,
  TotalInCents,
} from '@websummit/glue/src/lib/utils/price';
import {
  CommerceTax,
  CommerceTaxRateType,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';

import ContainerCard from './ContainerCard';
import Table, { ColumnDescriptors } from './Table';

const getTotalPrice = ({
  taxRate,
  priceInCents,
  currencySymbol = '',
}: {
  currencySymbol: string;
  priceInCents?: TotalInCents | null;
  taxRate?: Partial<CommerceTax>;
}) => {
  if (priceInCents) {
    if (taxRate?.rateType === CommerceTaxRateType.Percentage) {
      const taxPercentage = (taxRate?.rateAmount || 0) / 100;
      const totalPrice = +priceInCents + taxPercentage * priceInCents;

      return `${currencySymbol}${fromCents(totalPrice).toFixed(2)}`;
    }

    if (taxRate?.rateType === CommerceTaxRateType.Absolute) {
      const totalPrice = +priceInCents + (taxRate?.rateAmount || 0);
      return `${currencySymbol}${fromCents(totalPrice).toFixed(2)}`;
    }

    return `${currencySymbol}${fromCents(priceInCents)}`;
  }

  return `${currencySymbol}0`;
};

const formatAmount = (taxRate?: Partial<CommerceTax>) =>
  taxRate?.rateType === CommerceTaxRateType.Percentage
    ? `${taxRate?.rateAmount}%`
    : taxRate?.rateAmount;

type PricesWithTaxTableProps = {
  currencySymbol?: string;
  price?: TotalInCents | Total | null;
  taxRates?: Partial<CommerceTax>[] | null;
};

const PricesWithTaxTable = ({
  currencySymbol = '',
  price,
  taxRates = [],
}: PricesWithTaxTableProps) => {
  const tableShape: ColumnDescriptors<
    Partial<CommerceTax> & { id: string | null }
  > = [
    {
      header: 'Tax name',
      renderCell: (taxRate) => taxRate?.name,
      width: '25%',
    },
    {
      header: 'Tax amount',
      renderCell: (taxRate) => formatAmount(taxRate),
      width: '25%',
    },
    {
      header: 'Country of tax',
      renderCell: (taxRate) => taxRate?.country || 'N/A',
      width: '25%',
    },
    {
      header: 'Price incl. tax',
      renderCell: (taxRate) =>
        getTotalPrice({
          currencySymbol,
          priceInCents: toCents(price),
          taxRate,
        }),
      width: '25%',
    },
  ];

  return (
    <ContainerCard noPadding>
      <Table<Partial<CommerceTax> & { id: string | null }>
        items={
          (taxRates as Partial<CommerceTax> & { id: string | null }[]) || []
        }
        tableShape={tableShape}
      />
    </ContainerCard>
  );
};

export default PricesWithTaxTable;
