import { ApolloError } from "@apollo/client";
import React, { ReactElement } from "react";

import Loader from "../../lib/Loading";
import { LegalEntity } from "../../lib/types";
import LegalEntityCreate from "../legalEntityActions/LegalEntityCreate";
import LegalEntityItem, {
  LegalEntityListHeader,
} from "../legalEntityItem/LegalEntityItem";

type LegalEntityListProps = {
  error?: ApolloError;
  list: LegalEntity[];
  loading?: boolean;
};

const LegalEntityList = ({
  list = [],
  loading,
  error,
}: LegalEntityListProps): ReactElement => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <>
      <h4>Legal Entity</h4>
      <LegalEntityCreate />
      <LegalEntityListHeader />
      {list.map((legalEntity) => (
        <LegalEntityItem
          key={legalEntity.id}
          name={legalEntity.name}
          regNumber={legalEntity?.regNumber}
          website={legalEntity?.website}
          taxNumber={legalEntity?.taxNumber}
          email={legalEntity?.email}
          address={legalEntity?.address}
        />
      ))}
    </>
  );
};

export default LegalEntityList;
