import CheckboxField from '@websummit/components/src/molecules/CheckboxField';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import React from 'react';

type Props = {
  storeActive: boolean;
};

const AdditionalSettings = ({ storeActive }: Props) => {
  return (
    <>
      <ContainerCard noPadding>
        <CheckboxField label="Store active" name="active" />
      </ContainerCard>
    </>
  );
};

export default AdditionalSettings;
