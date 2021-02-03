import { ApolloError } from "@apollo/client";
import React, { ReactElement } from "react";

import Loader from "../../lib/Loading";
import { Event } from "../../lib/types";
import EventCreate from "../eventActions/EventCreate";
import EventItem, { EventListHeader } from "../eventItem/EventItem";

type EventListProps = {
  error?: ApolloError;
  list: Event[];
  loading?: boolean;
};

const EventList = ({
  list = [],
  loading,
  error,
}: EventListProps): ReactElement => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <>
      <h4>Events</h4>
      <EventCreate />
      <EventListHeader />
      {list.map((event) => (
        <EventItem
          key={event.id}
          name={event.name}
          description={event?.description}
          slug={event?.slug}
          startDate={event?.startDate}
          endDate={event?.endDate}
          country={event?.country}
          currency={event?.currency}
        />
      ))}
    </>
  );
};

export default EventList;
