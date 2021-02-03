import { ApolloError } from "@apollo/client";
import React, { ReactElement } from "react";

import Loader from "../../lib/Loading";
import { Host } from "../../lib/types";
import HostCreate from "../hostActions/HostCreate";
import HostItem, { HostListHeader } from "../hostItem/HostItem";

type HostListProps = {
  error?: ApolloError;
  list: Host[];
  loading?: boolean;
};

const HostList = ({
  list = [],
  loading,
  error,
}: HostListProps): ReactElement => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <>
      <h4>Hosts</h4>
      <HostCreate />
      <HostListHeader />
      {list.map((host) => (
        <HostItem
          key={host.id}
          name={host.name}
          regNumber={host?.regNumber}
          website={host?.website}
          taxNumber={host?.taxNumber}
          email={host?.email}
          address={host?.invoiceAddress}
        />
      ))}
    </>
  );
};

export default HostList;
