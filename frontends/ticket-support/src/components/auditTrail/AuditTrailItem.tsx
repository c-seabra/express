import React, { useState } from 'react'
import styled from 'styled-components'

import { Button } from '../../lib/components/atoms/Button'
import { Column, MediumColumn, TrailVersion, WideColumn } from './AuditTrail'

const DataRow = styled.div`
  display: flex;
  padding: 1rem 0.75rem;
  border-bottom: 1px solid #dcdfe5;
`

const DetailsRow = styled.div`
  display: flex;
  padding: 1rem 1.25rem;
  background-color: #f7f9fa;
`

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
  trail: TrailVersion
}) => {
  const [openDetailsRow, setOpenChangesLog] = useState(false)
  const objectChanges = objectChangesString && JSON.parse(objectChangesString)
  const context = contextString && JSON.parse(contextString)

  return (
    <>
      <DataRow onClick={setOpenChangesLog}>
        <MediumColumn>{createdAt}</MediumColumn>
        <Column>{itemType}</Column>
        <WideColumn>{whodunnit}</WideColumn>
        <Column>{reason || 'No reason given'}</Column>
      </DataRow>

      {openDetailsRow && (
        <DetailsRow>
          {Object.entries(objectChanges).map(([key, value]) => {
            return <Change title={key} values={value} />
          })}
          {context?.assignments && (
            <>
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
            </>
          )}
          {context?.assigne && (
            <div>
              <div>Previous assignee - {context.assignee.previous_assignee || 'undefined'}</div>
              <div>Assigner - {context.assignee.assigner || 'undefined'}</div>
              <div>New Assignee - {context.assignee.assignee || 'undefined'}</div>
            </div>
          )}
        </DetailsRow>
      )}
    </>
  )
}

export default AuditTrailItem
