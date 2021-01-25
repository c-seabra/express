import React, { useState } from 'react'
import styled from 'styled-components'

import { Column, TrailVersion, WideColumn } from './AuditTrail'

const DataRow = styled.div`
  display: flex;
  padding: 1rem 0.75rem;
  border-bottom: 1px solid #dcdfe5;

  color: #0c1439;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 24px;
`

const DetailsRow = styled.div`
  display: flex;
  padding: 1rem 1.25rem;
  background-color: #f7f9fa;
`

const DetailsContainer = styled.div`
  display: flex;
`

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 16px;
`

const DetailValue = styled.span`
  color: #0c1439;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 24px;

  margin-right: 100px;

  &:last-child {
    margin-right: 0;
  }
`

const DetailLabel = styled(DetailValue)`
  font-weight: 600;
`

const DetailLabelCapitalized = styled(DetailLabel)`
  text-transform: capitalize;
`

const Change = ({ title, values }: { title?: string; values: Array<string> | unknown }) => {
  const val = Array.isArray(values) ? (values as Array<string>) : values
  const oldVal: string = Array.isArray(val) ? val?.[0] : ''
  const newVal: string = Array.isArray(val) ? val?.[1] : ''
  const noDataLabel = 'undefined'

  return (
    <DetailContainer>
      <DetailLabelCapitalized>{title}</DetailLabelCapitalized>
      <DetailValue>old value - {oldVal || noDataLabel}</DetailValue>
      <DetailValue>new value - {newVal || noDataLabel}</DetailValue>
    </DetailContainer>
  )
}

const AuditTrailItem = ({
  trail: {
    context: contextString,
    createdAt,
    itemType,
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
        <WideColumn>{createdAt}</WideColumn>
        <Column>{itemType}</Column>
        <WideColumn>{whodunnit}</WideColumn>
        <WideColumn>{reason || 'No reason given'}</WideColumn>
      </DataRow>

      {openDetailsRow && (
        <DetailsRow>
          {Object.entries(objectChanges).map(([key, value]) => {
            return <Change title={key} values={value} />
          })}
          {context?.assignments && (
            <DetailsContainer>
              <DetailContainer>
                Assignee name - {context.assignments.current?.assignee_name || 'undefined'}
                <br />
                Assignee email - {context.assignments.current?.assignee_email || 'undefined'}
              </DetailContainer>
              <DetailContainer>
                Assigner name - {context.assignments.current?.assigner_name || 'undefined'}
                <br />
                Assigner email - {context.assignments.current?.assigner_email || 'undefined'}
              </DetailContainer>

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
            </DetailsContainer>
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
