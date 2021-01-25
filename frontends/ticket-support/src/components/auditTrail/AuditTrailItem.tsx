import React, { useState } from 'react'
import styled from 'styled-components'

import Icon from '../../lib/components/atoms/Icon'
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

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 16px;
`

const DetailContainerAligned = styled(DetailContainer)`
  align-content: center;
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
  const noDataLabel = 'undefined'

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
          <DetailContainer>
            {Object.entries(objectChanges).map(([key, value]) => {
              return <Change title={key} values={value} />
            })}
          </DetailContainer>
          {context?.assignments && (
            <DetailContainer>
              <DetailContainerAligned>
                <DetailLabel>Assignee name</DetailLabel>

                <DetailValue>
                  {context.assignments.previous?.assignee_name || noDataLabel}
                  <Icon>arrow_forward</Icon>{' '}
                  {context.assignments.current?.assignee_name || noDataLabel}{' '}
                </DetailValue>
              </DetailContainerAligned>

              <DetailContainerAligned>
                <DetailLabel>Assignee email</DetailLabel>

                <DetailValue>
                  {context.assignments.previous?.assignee_email || noDataLabel}
                  <Icon>arrow_forward</Icon>{' '}
                  {context.assignments.current?.assignee_email || noDataLabel}
                </DetailValue>
              </DetailContainerAligned>

              <DetailContainerAligned>
                <DetailLabel>Assigneer name</DetailLabel>

                <DetailValue>
                  {context.assignments.previous?.assigneer_name || noDataLabel}
                  <Icon>arrow_forward</Icon>{' '}
                  {context.assignments.current?.assigneer_name || noDataLabel}{' '}
                </DetailValue>
              </DetailContainerAligned>

              <DetailContainerAligned>
                <DetailLabel>Assigneer email</DetailLabel>

                <DetailValue>
                  {context.assignments.previous?.assigneer_email || noDataLabel}
                  <Icon>arrow_forward</Icon>{' '}
                  {context.assignments.current?.assigneer_email || noDataLabel}
                </DetailValue>
              </DetailContainerAligned>
            </DetailContainer>
          )}
          {context?.assigne && (
            <DetailContainer>
              <div>Previous assignee - {context.assignee.previous_assignee || noDataLabel}</div>
              <div>Assigner - {context.assignee.assigner || noDataLabel}</div>
              <div>New Assignee - {context.assignee.assignee || noDataLabel}</div>
            </DetailContainer>
          )}
        </DetailsRow>
      )}
    </>
  )
}

export default AuditTrailItem
