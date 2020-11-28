import React, { useState } from 'react'
import styled from 'styled-components'
import { Column, MediumColumn } from './AuditTrail'

const ColumnStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0.25rem;
  word-break: break-word;
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

const ChangesList = styled.div`
  &.active {
    opacity: 1;
    right: -.5rem;
    top: calc(100% + .5rem);
  }
  opacity: 0;
  position: absolute;
  background: white;
  padding: 1rem;
  border: 1px solid grey;
  border-radius: 8px;
  width: 400px;
  top: -9999px;
  right: -9999px;
  z-index: 100;
`
const ChangesListWrap = styled.div`
  position: relative;
`
const ChangesTrigger = styled.span`
`

const Change = ({title, values}:{title?: string; values: Array<string> | unknown}) => {
  const val = Array.isArray(values) ? values as Array<string> : values
  const oldVal: string = Array.isArray(val) ? val?.[0] : ''
  const newVal: string = Array.isArray(val) ? val?.[1] : ''
  return (
    <div>
      <div>{title}</div>
      <div>old value - {oldVal || 'undefined'}</div>
      <div>new value - {newVal || 'undefined'}</div>
      <hr/>
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
    objectChanges: objectChangesString
  }
}: {
  trail: {
    context?: string
    createdAt?: string
    itemType?: string
    event?: string
    reason?: string
    whodunnit?: string
    objectChanges?: string
  }
}) => {
  const [openChangesLog, setOpenChangesLog] = useState(false)
  const objectChanges = objectChangesString && JSON.parse(objectChangesString)
  const context = contextString && JSON.parse(contextString)
  console.log(context && context)
  return (
    <Trail>
      <MediumColumn>{createdAt}</MediumColumn>
      <Column>{itemType}</Column>
      <Column>{event}</Column>
      <Column>{reason}</Column>
      <MediumColumn>{whodunnit}</MediumColumn>
      <Column>
        <ChangesListWrap>
          <ChangesTrigger onClick={() => setOpenChangesLog(!openChangesLog)}>Click me</ChangesTrigger>
          <ChangesList className={openChangesLog ? 'active' : ''}>
            <ChangesTrigger onClick={() => setOpenChangesLog(!openChangesLog)}>Close</ChangesTrigger>
            {Object.entries(objectChanges).map(([key, value]) => {
              return (
                <Change title={key} values={value} />
              )
            })}
            {context?.assignments && (
              <div>
                <div>
                  Assignee name - {context.assignments.current.assignee_name}<br/>
                  Assignee email - {context.assignments.current.assignee_email}
                </div>
                <div>
                  Assigner name - {context.assignments.current.assigner_name}<br/>
                  Assigner email - {context.assignments.current.assigner_email}
                </div>
                <div>
                  Previous Assignee name - {context.assignments.current.assignee_name}<br/>
                  Previous Assignee email - {context.assignments.current.assignee_email}
                </div>
                <div>
                  Previous Assigner name - {context.assignments.current.assigner_name}<br/>
                  Previous Assigner email - {context.assignments.current.assigner_email}
                </div>
              </div>
            )}
            {context?.assigne&& (
              <div>
                <div>
                  Previous assignee - {context.assignee.previous_assignee}
                </div>
                <div>
                  Assigner - {context.assignee.assigner}
                </div>
                <div>
                  New Assignee - {context.assignee.assignee}
                </div>
              </div>
            )}
          </ChangesList>
        </ChangesListWrap>
      </Column>
    </Trail>
  )
}

export default AuditTrailItem
