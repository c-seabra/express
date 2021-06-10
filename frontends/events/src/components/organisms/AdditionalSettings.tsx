import { CommerceStore } from '@websummit/graphql/src/@types/operations';
import React from 'react';
import styled from 'styled-components';

import EventSponsor from '../eventActions/EventSponsor';
import ActivateStore from './ActivateStore';

const AdditionalSettingsContainer = styled.div`
  margin: -1rem -1.8rem -2.8rem;
  padding: 1.2rem 1.8rem;
`;

type Props = {
  store?: Pick<CommerceStore, 'active' | 'id' | 'slug'> | null;
};

const AdditionalSettings = ({ store }: Props) => {
  return (
    <AdditionalSettingsContainer>
      <ActivateStore store={store} />
      <EventSponsor eventSlug={store?.slug} />
    </AdditionalSettingsContainer>
  );
};

export default AdditionalSettings;
