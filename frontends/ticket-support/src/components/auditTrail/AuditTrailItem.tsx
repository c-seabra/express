import React, { useState } from 'react'
import styled from 'styled-components'

import { Button } from '../../lib/components/atoms/Button'

import { Column, MediumColumn, WideColumn } from './AuditTrail'

const Trail = styled.div`
  font-size: 1rem;
  display: flex;
  padding: 1rem 0.75rem;
  background-color: gainsboro;
  &:nth-child(2n + 1) {
    background-color: #fff;
  }
`

const ChangesList = styled.div`
  &.active {
    opacity: 1;
    top: 0;
    left: 0;
  }
  opacity: 0;
  position: fixed;
  background: white;
  top: -9999px;
  left: -9999px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  button {
    align-self: flex-end;
  }
  & > div {
    max-width: 600px;
    max-height: 70%;
    overflow-x: auto;
    background: white;
    padding: 1rem;
    border: 1px solid grey;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }
`
const ChangesListWrap = styled.div``

const Change = ({ title, values }: { title?: string; values: Array<string> | unknown }) => {
  const val = Array.isArray(values) ? (values as Array<string>) : values
  const oldVal: string = Array.isArray(val) ? val?.[0] : ''
  const newVal: string = Array.isArray(val) ? val?.[1] : ''
  return (
    <div>
      <div>{title}</div>
      <div>old value - {oldVal || 'undefined'}</div>
      <div>new value - {newVal || 'undefined'}</div>
      <hr />
    </div>
  )
}

const AuditTrailItem = ({
  trail: {
    context: contextString,
    createdAt,
    itemType,
    event,
    reason,
    whodunnit,
    objectChanges: objectChangesString,
  },
}: {
  trail: {
    context?: string
    createdAt?: string
    event?: string
    itemType?: string
    objectChanges?: string
    reason?: string
    whodunnit?: string
  }
}) => {
  const [openChangesLog, setOpenChangesLog] = useState(false)
  const objectChanges = objectChangesString && JSON.parse(objectChangesString)
  const context = contextString && JSON.parse(contextString)

  return (
    <Trail>
      <MediumColumn>{createdAt}</MediumColumn>
      <Column>{itemType}</Column>
      <Column>{event}</Column>
      <Column>unknown</Column>
      <Column>{reason || 'No reason given'}</Column>
      <WideColumn>{whodunnit}</WideColumn>
      <MediumColumn>
        <ChangesListWrap>
          <Button onClick={() => setOpenChangesLog(!openChangesLog)}>See changes</Button>
          <ChangesList className={openChangesLog ? 'active' : ''}>
            <div>
              <Button onClick={() => setOpenChangesLog(!openChangesLog)}>Close</Button>
              {Object.entries(objectChanges).map(([key, value]) => {
                return <Change title={key} values={value} />
              })}
              {context?.assignments && (
                <div>
                  <div>
                    Assignee name - {context.assignments.current?.assignee_name || 'undefined'}
                    <br />
                    Assignee email - {context.assignments.current?.assignee_email || 'undefined'}
                  </div>
                  <div>
                    Assigner name - {context.assignments.current?.assigner_name || 'undefined'}
                    <br />
                    Assigner email - {context.assignments.current?.assigner_email || 'undefined'}
                  </div>
                  <div>
                    Previous Assignee name -{' '}
                    {context.assignments.previous?.assignee_name || 'undefined'}
                    <br />
                    Previous Assignee email -{' '}
                    {context.assignments.previous?.assignee_email || 'undefined'}
                  </div>
                  <div>
                    Previous Assigner name -{' '}
                    {context.assignments.previous?.assigner_name || 'undefined'}
                    <br />
                    Previous Assigner email -{' '}
                    {context.assignments.previous?.assigner_email || 'undefined'}
                  </div>
                </div>
              )}
              {context?.assigne && (
                <div>
                  <div>Previous assignee - {context.assignee.previous_assignee || 'undefined'}</div>
                  <div>Assigner - {context.assignee.assigner || 'undefined'}</div>
                  <div>New Assignee - {context.assignee.assignee || 'undefined'}</div>
                </div>
              )}
            </div>
          </ChangesList>
        </ChangesListWrap>
      </MediumColumn>
    </Trail>
  )
}

export default AuditTrailItem
