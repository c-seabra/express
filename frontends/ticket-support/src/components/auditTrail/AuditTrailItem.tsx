import 'react-json-pretty/themes/acai.css'

import React, { useState } from 'react'
import JSONPretty from 'react-json-pretty'
import styled from 'styled-components'

import Icon from '../../lib/components/atoms/Icon'
import { formatDefaultDateTime, isIsoDate } from '../../lib/utils/time'
import { Column, TrailVersion } from './AuditTrail'

const DataRow = styled.div`
  display: flex;
  padding: 1rem 0.75rem;
  border-bottom: 1px solid #dcdfe5;

  color: #0c1439;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 24px;

  cursor: pointer;

  &:hover {
    background-color: #dadada;
  }
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

  &:first-child {
    margin-right: 6.25rem;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const DetailContainerAligned = styled(DetailContainer)`
  align-content: center;
`

const DetailValue = styled.span`
  color: #0c1439;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 24px;

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

const DetailValueCentered = styled(DetailValue)`
  display: flex;
  align-items: center;
`

const IconWithSpacing = styled(Icon)`
  margin: 0 8px;
  height: 18px;
`

const BlueValue = styled.span`
  color: #0067e9;
`
const StyledCode = styled.div`
  .json-pretty {
    overflow: auto;
    max-width: 800px;
  }
`

const Subheading = styled(DetailLabel)`
  font-size: 18px;
  border-bottom: 1px solid #dcdfe5;
  margin-bottom: 16px;
`

const StyleTable = styled.table`
  border: 1px solid #dcdfe5;
  border-collapse: collapse;

  td {
    border: 1px solid #dcdfe5;
    padding: 4px;
  }
`
const normalize = (value: string): string => {
  return value.toLowerCase().replace(/_/g, ' ')
}

const getFormattedValue = (
  value: boolean | string,
  defaultValue = 'no value'
): boolean | string => {
  // Deduce a type
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No' || defaultValue
  }

  if (isIsoDate(value)) {
    return formatDefaultDateTime(value)
  }

  return defaultValue
}

const DynamicChange = ({ title, values }: { title: string; values: Array<string> | unknown }) => {
  const val = Array.isArray(values) ? (values as Array<string>) : values
  const prev: string = Array.isArray(val) ? val?.[0] : ''
  const current: string = Array.isArray(val) ? val?.[1] : ''
  const noDataLabel = 'no value'
  const formattedPrev = getFormattedValue(prev)
  const formattedCurrent = getFormattedValue(current)
  const formattedTitle = normalize(title)

  return (
    <DetailContainer>
      <DetailLabelCapitalized>{formattedTitle}</DetailLabelCapitalized>
      <>
        <DetailValue>
          <StyleTable>
            <tr>
              <td>last value</td>
              <td>{formattedPrev || noDataLabel}</td>
            </tr>
            <tr>
              <td>updated value</td>
              <td>{formattedCurrent || noDataLabel}</td>
            </tr>
          </StyleTable>
        </DetailValue>
      </>
    </DetailContainer>
  )
}

type InlineChangeProps = {
  current: any
  label: string
  prev: any
}
const InlineChange = ({ label, prev, current }: InlineChangeProps) => {
  const noDataLabel = 'no value'

  return (
    <DetailContainerAligned>
      <DetailLabel>{label}</DetailLabel>

      <DetailValueCentered>
        {!prev && !current && <span>{noDataLabel}</span>}

        {(prev || current) && (
          <>
            {prev || noDataLabel}
            <IconWithSpacing>
              <Icon color="#3BB273" size="15px">
                arrow_forward
              </Icon>
            </IconWithSpacing>
            {current || noDataLabel}
          </>
        )}
      </DetailValueCentered>
    </DetailContainerAligned>
  )
}

type AuditTrail = {
  trail: TrailVersion
  // props: unknown
}

const AuditTrailItem = ({ trail }: AuditTrail) => {
  const {
    context: contextString,
    createdAt,
    itemType,
    reason,
    whodunnit,
    objectChanges: objectChangesString,
  } = trail
  const [openDetailsRow, setOpenDetailsRow] = useState(false)
  const objectChanges = objectChangesString && JSON.parse(objectChangesString)
  const context = contextString && JSON.parse(contextString)
  const noDataLabel = 'no value'
  const setDetailsVisibility = () => setOpenDetailsRow(!openDetailsRow)

  return (
    <>
      <DataRow onClick={setDetailsVisibility}>
        <Column width="20%">
          <BlueValue>{formatDefaultDateTime(createdAt as string)}</BlueValue>
        </Column>
        <Column width="15%">{itemType}</Column>
        <Column width="15%">N/A</Column>
        <Column width="30%">{whodunnit}</Column>
        <Column width="20%">{reason || 'No reason given'}</Column>
      </DataRow>

      {openDetailsRow && (
        <>
          <DetailsRow>
            <DetailContainer>
              <Subheading>List of all changes</Subheading>
              {Object.entries(objectChanges).map(([key, value]) => {
                return <DynamicChange key={key} title={key} values={value} />
              })}
            </DetailContainer>
            {context?.assignments && (
              <DetailContainer>
                <Subheading>Extra context</Subheading>
                <InlineChange
                  current={context.assignments.current?.assignee_name}
                  label="Assignee name change"
                  prev={context.assignments.previous?.assignee_name}
                />

                <InlineChange
                  current={context.assignments.current?.assignee_email}
                  label="Assignee email change"
                  prev={context.assignments.previous?.assignee_email}
                />

                <InlineChange
                  current={context.assignments.current?.assigner_name}
                  label="Assigneer name change"
                  prev={context.assignments.previous?.assigner_name}
                />

                <InlineChange
                  current={context.assignments.current?.assigner_email}
                  label="Assigneer email change"
                  prev={context.assignments.previous?.assigner_email}
                />
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
          <DetailsRow>
            <DetailContainer>
              <Subheading>Backend response</Subheading>
              <StyledCode>
                <JSONPretty className="json-pretty" data={trail} />
              </StyledCode>
            </DetailContainer>
          </DetailsRow>
        </>
      )}
    </>
  )
}

export default AuditTrailItem
