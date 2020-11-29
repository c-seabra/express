import { ApolloError, useQuery } from '@apollo/client'
import React, { useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { AppContext } from '../app/App'
// import Tooltip from '../../lib/Tooltip'
import ORDER from '../../operations/queries/OrderByRef'
import TicketItem from '../ticketItem/TicketItem'

const StlyedContainer = styled.section`
  padding: 1rem;
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid grey;
  hr {
    border-color: grey;
    margin: 1rem 0;
  }
`

const Heading = styled.div`
  border-radius: 8px;
  padding-top: 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  font-weight: bold;
  button {
    margin-right: 1rem;
  }
  span {
    color: #00ac93;
  }
`

export const Text = styled.div`
  border-radius: 8px;
  padding: 0.25rem;
  font-size: 1rem;
  font-weight: 400;
  a {
    color: #337ab7;
    margin: 0 0.25rem;
  }
`

const TextHighlight = styled.span`
  color: #337ab7;
  margin: 0 0.25rem;
`

export const Button = styled.button`
  margin: 0 0 1rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  border: 1px solid grey;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: grey;
    color: white;
  }
`
const TicketHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const TicketStatusBar = styled.div`
  display: flex;
  align-items: center;
`

const OrderDetails: React.FC = () => {
  const { orderRef } = useParams<{ orderRef: string }>()
  const history = useHistory()
  const { conferenceSlug, token } = useContext(AppContext)

  const {
    loading,
    error,
    data,
  }: {
    data?: {
      order: {
        owner: {
          firstName: string
          lastName: string
          email: string
        }
        tickets: {
          edges: [
            {
              node: {
                assignment: {
                  state: string
                  assignee: {
                    firstName: string
                    lastName: string
                    email: string
                  }
                }
                bookingRef: string
                state: string
                order: {
                  owner: {
                    firstName: string
                    lastName: string
                    email: string
                  }
                }
                ticketType: {
                  name: string
                }
              }
            }
          ]
        }
      }
    }
    error?: ApolloError
    loading?: boolean
  } = useQuery(ORDER, {
    context: {
      slug: conferenceSlug,
      token,
    },
    variables: {
      reference: orderRef,
    },
  })

  const order = data?.order
  const tickets = order?.tickets
  const owner = order?.owner
  console.log(order && order)

  return (
    <>
      <h2>Order - Ticket Assignment - Ticket Support Dashboard</h2>
      <StlyedContainer>
        <TicketHeader>
          <Heading>
            <Button type="button" onClick={() => history.goBack()}>
              Back
            </Button>
            Manage Order/
            {/* <Tooltip copyToClip value={orderRef} title={ */}
            <TextHighlight>{orderRef}</TextHighlight>
            {/* }/> */}
          </Heading>
          <TicketStatusBar>
            {owner?.firstName} {owner?.lastName} - {owner?.email}
          </TicketStatusBar>
        </TicketHeader>
        <div>
          <Heading>Tickets in order</Heading>
          {!loading && !error && tickets && (
            <>
              {tickets.edges.map(({node}) => {
                return (
                  <TicketItem
                    handleOnClick={() => history.push(`/tickets/${node.bookingRef}`)}
                    assignment={node.assignment}
                    bookingRef={node.bookingRef}
                    ticketState={node.state}
                    orderOwner={node.order.owner}
                    ticketTypeName={node.ticketType.name}
                  />
                )
              })}
            </>
          )}
        </div>
      </StlyedContainer>
    </>
  )
}

export default OrderDetails
