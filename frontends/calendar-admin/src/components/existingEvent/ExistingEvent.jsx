import ButtonComponent from '@websummit/components/src/atoms/Button';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';

import AvatarList from '../avatarList/AvatarList';
import Button from '../button/Button';
import { DetailsContext } from '../calendar/Context';
import EditEvent from '../editEvent/EditEvent';
import { TopButtons } from '../popup/Popup.styled';
import BinIcon from '../svgs/Bin';
import CloseIcon from '../svgs/Close';
import DescriptionIcon from '../svgs/Description';
import GroupIcon from '../svgs/Group';
import MeetingIcon from '../svgs/Meeting';
import OvalSquare from '../svgs/OvalSquare';
import PenIcon from '../svgs/Pen';
import {
  Date,
  FormWrap,
  Overlay,
  OverlayButton,
  OverlayButtons,
  PopupContainer,
  PopupHeading,
  Title,
  UserRsvp,
  Wrapper,
} from './ExistingEvent.styled';
import ExistingEventItem from './ExistingEventItem';

const ExistingEvent = ({ event, close_popup, formats }) => {
  const {
    id,
    title,
    description,
    location,
    invitations,
    starts_at,
    ends_at,
    event_format_id,
    can_modify,
    organizer,
  } = event;

  const {
    currentUserId,
    locations,
    rsvps,
    responseStatuses,
    onUpdateEventInvitationResponse,
    onDeleteEvent,
  } = useContext(DetailsContext);

  const [deletePopupActive, setDeletePopupActive] = useState(false);
  const [editPopupActive, setEditPopupActive] = useState(false);
  const [locationName, setLocationName] = useState();
  const [currentUserInvitation, setCurrentUserInvitation] = useState();
  const [eventTime, setEventTime] = useState();

  const formatDate = (startsAt, endsAt) => {
    const dateFormatted = `${moment(startsAt).format(
      'dddd, DD MMMM - HH:mm',
    )}-${moment(endsAt).format('HH:mm')}`;

    setEventTime(dateFormatted);
  };

  useEffect(() => {
    // get location name
    location && setLocationName(getLocationName(location));

    // get current user response
    // so we can set RSVP buttons
    const invitation =
      invitations &&
      invitations.find((invite) => invite.invitee.id === currentUserId);
    setCurrentUserInvitation(invitation);

    // Format the date to desired layout
    formatDate(starts_at.toString(), ends_at.toString());
  }, [location && location.id, location && location.name, invitations, rsvps]);

  const handleDelete = () => {
    // open popup overlay
    setDeletePopupActive(true);
  };
  const handleDeleteResponse = (deleteResponse) => {
    if (deleteResponse) onDeleteEvent(id);
    setDeletePopupActive(false);
  };

  const handleEdit = () => {
    setEditPopupActive(!editPopupActive);
  };

  const getLocationName = () => {
    let currentLocationName;

    if (location.type === 'text') {
      currentLocationName = location.name;
    } else {
      const currentLocation =
        locations &&
        locations.find(
          (confLocation) =>
            confLocation.id === location.id || confLocation.id === location,
        );
      currentLocationName = currentLocation && currentLocation.name;
    }

    return currentLocationName;
  };

  return (
    <div className="existingEvent">
      <TopButtons>
        {can_modify && (
          <>
            {!editPopupActive && (
              <Button className="topButton" onBtnClick={handleEdit}>
                <PenIcon />
              </Button>
            )}
            <Button className="topButton" onBtnClick={handleDelete}>
              <BinIcon />
            </Button>
          </>
        )}
        <Button className="topButton" onBtnClick={close_popup}>
          <CloseIcon />
        </Button>
      </TopButtons>

      <Wrapper>
        <ExistingEventItem icon={<OvalSquare iconColor="#f40" />}>
          <Title>{title}</Title>
          <Date>{eventTime}</Date>
        </ExistingEventItem>

        {locationName && (
          <ExistingEventItem icon={<MeetingIcon />}>
            {locationName}
          </ExistingEventItem>
        )}

        <ExistingEventItem icon={<GroupIcon />}>
          {rsvps && rsvps.length ? (
            <AvatarList
              avatarList={rsvps}
              organizerId={organizer ? organizer.id : undefined}
              listType="rsvps"
            />
          ) : (
            'Loading...'
          )}
        </ExistingEventItem>

        {description && (
          <ExistingEventItem icon={<DescriptionIcon />}>
            {description}
          </ExistingEventItem>
        )}
      </Wrapper>

      {editPopupActive && (
        <FormWrap>
          <PopupContainer>
            <PopupHeading>Edit Event</PopupHeading>
            <EditEvent
              endsAt={ends_at}
              eventFormatId={event_format_id}
              eventId={id}
              organizerId={organizer ? organizer.id : undefined}
              setEditPopupActive={setEditPopupActive}
              startsAt={starts_at}
              {...{
                description,
                location,
                rsvps,
                title,
              }}
              formats={formats}
            />
          </PopupContainer>
        </FormWrap>
      )}

      {deletePopupActive && (
        <Overlay>
          <h3>Are you sure you want to delete this event?</h3>
          <OverlayButtons>
            <ButtonComponent
              type="primary"
              onClick={() => handleDeleteResponse(true)}
            >
              Yes
            </ButtonComponent>

            <ButtonComponent
              type="error"
              onClick={() => handleDeleteResponse(false)}
            >
              No
            </ButtonComponent>
          </OverlayButtons>
        </Overlay>
      )}

      <UserRsvp>
        <div>Going?</div>
        <div>
          {currentUserInvitation &&
            currentUserInvitation.valid_response_status_ids.map((response) => {
              const currentResponse =
                responseStatuses &&
                responseStatuses.find(
                  (responseStatus) => responseStatus.id === response,
                );
              return (
                <Button
                  key={response}
                  className={`userRsvp_button ${
                    currentUserInvitation.response.response_status === response
                      ? 'button_active'
                      : ''
                  }`}
                  onBtnClick={() =>
                    currentUserInvitation.response.response_status !== response
                      ? onUpdateEventInvitationResponse(id, response)
                      : ''
                  }
                >
                  {currentResponse && currentResponse.label}
                </Button>
              );
            })}
        </div>
      </UserRsvp>
    </div>
  );
};
export default ExistingEvent;
