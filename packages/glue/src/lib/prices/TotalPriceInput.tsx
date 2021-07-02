import TextInput from '@websummit/components/src/molecules/TextInput';
import {
  CommerceTax,
  CommerceTaxRateType,
} from '@websummit/graphql/src/@types/operations';
import {
  fromCents,
  toCents,
  Total,
  TotalInCents,
} from '@websummit/tsutils/src/lib/utils/price';
import React from 'react';

type TaxRate = Pick<
  CommerceTax,
  'id' | 'country' | 'name' | 'rateAmount' | 'rateType'
>;

const getTotalPrice = ({
  taxRate,
  price,
  currencySymbol = '',
}: {
  currencySymbol: string;
  price?: Total | TotalInCents;
  taxRate?: TaxRate;
}) => {
  if (price) {
    const priceInCents = price._type === 'total' ? toCents(price) : price;

    if (taxRate?.rateType === CommerceTaxRateType.Percentage) {
      const taxPercentage = taxRate?.rateAmount / 100;
      const totalPrice = +priceInCents + taxPercentage * priceInCents;

      return `${currencySymbol}${fromCents(totalPrice).toFixed(2)}`;
    }

    if (taxRate?.rateType === CommerceTaxRateType.Absolute) {
      const totalPrice = +priceInCents + taxRate?.rateAmount;
      return `${currencySymbol}${fromCents(totalPrice).toFixed(2)}`;
    }

    return `${currencySymbol}${price}`;
  }

  return `${currencySymbol}0`;
};

type TotalPriceInputProps = {
  currencySymbol?: string;
  price?: Total | TotalInCents;
  taxRate?: TaxRate;
} & React.ComponentProps<typeof TextInput>;

const TotalPriceInput = ({
  currencySymbol = '',
  price,
  taxRate,
  ...textInputProps
}: TotalPriceInputProps) => {
  return (
    <TextInput
      disabled
      label={`Total price (incl. ${taxRate?.name || 'tax'})`}
      value={getTotalPrice({
        currencySymbol,
        price,
        taxRate,
      })}
      {...textInputProps}
    />
  );
};

export default TotalPriceInput;
