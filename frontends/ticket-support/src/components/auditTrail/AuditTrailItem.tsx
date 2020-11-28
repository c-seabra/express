import React from 'react'
import styled from 'styled-components'

const ColumnStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0.25rem;
  word-break: break-word;
`
const Column = styled(ColumnStyles)`
  width: 10%;
`
const User = styled(ColumnStyles)`
  width: 25%;
  white-space: pre-wrap;
`
const WideColumn = styled(Column)`
  width: 35%;
`
const Trail = styled.div`
  font-size: 1rem;
  display: flex;
  padding: 1rem 0.75rem;
  background-color: gainsboro;
  &:nth-child(2n + 1) {
    background-color: #fff;
  }
`

const Change = ({title, oldValue, newValue}:{title?: string; oldValue?:string, newValue?: string}) => {
  return (
    <div>
      <div>{title}:</div>
      <div>old value - {oldValue || 'undefined'}</div>
      <div>new value - {newValue || 'undefined'}</div>
    </div>
  )
}

const AuditTrailItem = ({
  itemId,
  createdAt,
  itemType,
  event,
  reason,
  whodunnit,
  objectChanges
}: {
  itemId?: string
  createdAt?: string
  itemType?: string
  event?: string
  reason?: string
  whodunnit?: string
  objectChanges?: {
    assigned_at?: string
    assignee_id?: string
    assigner_id?: string
    created_at?: string
    ticket_id?: string
    updated_at?: string
    duplicate?: string
    app_login_email?: string
    previous_assignment_id?: string
    current_assignment_id?: string
    accepted_at?: string
  }
}) => {
  return (
    <Trail key={itemId}>
      <Column>{createdAt}</Column>
      <Column>{itemType}</Column>
      <Column>{event}</Column>
      <Column>{reason || 'No reason'}</Column>
      <User>{whodunnit}</User>
      <WideColumn>
        {event === 'create' ? (
          <div>
            <div>assigned_at - {objectChanges?.assigned_at}</div>
            <div>assignee_id - {objectChanges?.assignee_id}</div>
            <div>assigner_id - {objectChanges?.assigner_id}</div>
            <div>created_at - {objectChanges?.created_at}</div>
            <div>ticket_id - {objectChanges?.ticket_id}</div>
            <div>updated_at - {objectChanges?.updated_at}</div>
          </div>
        ) : (
          <>
            {objectChanges?.duplicate && (
              <Change title="Duplicate state" oldValue={objectChanges?.duplicate[0]?.toString()} newValue={objectChanges?.duplicate[1]?.toString()}/>
            )}
            {objectChanges?.app_login_email && (
              <Change title="App login email" oldValue={objectChanges?.app_login_email[0]?.toString()} newValue={objectChanges?.app_login_email[1]?.toString()}/>
            )}
            {objectChanges?.previous_assignment_id && (
              <Change title="Previous assignment" oldValue={objectChanges?.previous_assignment_id[0]?.toString()} newValue={objectChanges?.previous_assignment_id[1]?.toString()}/>
            )}
            {objectChanges?.current_assignment_id && (
              <Change title="Current assignment" oldValue={objectChanges?.current_assignment_id[0]?.toString()} newValue={objectChanges?.current_assignment_id[1]?.toString()}/>
            )}
            {objectChanges?.accepted_at && (
              <Change title="Accepted at" oldValue={objectChanges?.accepted_at[0]?.toString()} newValue={objectChanges?.accepted_at[1]?.toString()}/>
            )}
          </>
        )}
      </WideColumn>
    </Trail>
  )
}

export default AuditTrailItem
