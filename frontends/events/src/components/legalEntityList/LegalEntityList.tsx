import { ApolloError, useQuery } from '@apollo/client';
import React, { ReactElement } from 'react';

import Loader from '../../lib/Loading';
import { LegalEntity } from '../../lib/types';
import LEGAL_ENTITY_LIST from '../../operations/queries/LegalEntityList';
import { useAppContext } from '../app/AppContext';
import LegalEntityItem, {
  LegalEntityListHeader,
} from '../legalEntityItem/LegalEntityItem';

const LegalEntityList = (): ReactElement => {
  const { conferenceSlug, token } = useAppContext();

  const {
    loading,
    error,
    data,
  }: {
    data?: {
      legalEntities: {
        edges: [
          {
            node: LegalEntity;
          },
        ];
      };
    };
    error?: ApolloError;
    loading?: boolean;
  } = useQuery(LEGAL_ENTITY_LIST, {
    context: {
      slug: conferenceSlug,
      token,
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const legalEntities = data?.legalEntities.edges.map((node) => node.node);

  return (
    <>
      <h4>Legal Entity</h4>
      <LegalEntityListHeader />
      {legalEntities?.map((legalEntity) => (
        <LegalEntityItem
          key={legalEntity.id}
          address={legalEntity?.address}
          email={legalEntity?.email}
          name={legalEntity.name}
          regNumber={legalEntity?.regNumber}
          taxNumber={legalEntity?.taxNumber}
          website={legalEntity?.website}
        />
      ))}
    </>
  );
};

export default LegalEntityList;
