import { ApolloError, useQuery } from '@apollo/client'
import React, { ReactElement, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import Loader from '../../lib/Loading'
import ORDER from '../../operations/queries/OrderByRef'
import { AppContext } from '../app/App'
import Warning from '../ticketActions/Warning'

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid grey;
`

const StyledField = styled.div`
  display: flex;
  font-size: 16px;
`

const StyledHeader = styled.div`
  font-weight: 500;
  font-size: 24px;
`

const StyledDefaultContainer = styled.div`
  display: flex;
`

const OrderDetailsSummary: ReactElement = () => {
  // const { orderRef } = useParams<{ orderRef: string }>()
  // const history = useHistory()
  // const { conferenceSlug, token } = useContext(AppContext)
  // const {
  //   loading,
  //   error,
  //   data,
  // }: OrderDetailsQuery = useQuery(ORDER, {
  //   context: {
  //     slug: conferenceSlug,
  //     token,
  //   },
  //   variables: {
  //     reference: orderRef,
  //   },
  // })
  // const order = data?.order
  // const owner = order?.owner

  // Mocked version for now
  const { loading, error, orderDetails } = {
    error: false,
    loading: false,
    orderDetails: {
      createdOn: {
        label: 'Created On',
        value: new Date(),
      },
    },
  }

  return (
    <>
      <StyledContainer>
        <StyledHeader>Order Details</StyledHeader>

        {loading && <Loader />}
        {error && (
          <Warning>
            <span>{error}</span>
          </Warning>
        )}

        {!loading && !error && (
          <>
            <StyledDefaultContainer>
              <StyledField>
                <div>Order Reference #</div>
                <input type="text" value={orderDetails.createdOn.value} />
              </StyledField>

              <StyledField>
                <div>Created On:</div>
                <input type="text" value={orderDetails.createdOn.value} />
              </StyledField>

              <StyledField>
                <div>Last Updated On:</div>
                <input type="text" value={orderDetails.createdOn.value} />
              </StyledField>

              <StyledField>
                <div>Source of Sale:</div>
                <input type="text" value={orderDetails.createdOn.value} />
              </StyledField>

              <StyledField>
                <div>Order Status:</div>
                <input type="text" value={orderDetails.createdOn.value} />
              </StyledField>
            </StyledDefaultContainer>

            <div>
              Order Owner’s Details ( Changes to this section shall transfer ticket assignment
              ownership)
            </div>

            <StyledDefaultContainer>
              <StyledField>
                <div>First Name*:</div>
                <input type="text" value={orderDetails.createdOn.value} />
              </StyledField>

              <StyledField>
                <div>Last Name:</div>
                <input type="text" value={orderDetails.createdOn.value} />
              </StyledField>

              <StyledField>
                <div>Email:</div>
                <input type="text" value={orderDetails.createdOn.value} />
              </StyledField>
            </StyledDefaultContainer>
          </>
        )}
      </StyledContainer>
    </>
  )
}

export default OrderDetailsSummary

// Possible Bin

// type OrderDetailsQuery {
//     data?: {
//       order: {
//         owner: {
//           email: string
//           firstName: string
//           lastName: string
//         }
//         summary: {
//           ticketType: {
//             name: string
//           }
//           tickets: number
//         }
//         tickets: {
//           edges: [
//             {
//               node: {
//                 assignment: {
//                   assignee: {
//                     email: string
//                     firstName: string
//                     lastName: string
//                   }
//                   state: string
//                 }
//                 bookingRef: string
//                 order: {
//                   owner: {
//                     email: string
//                     firstName: string
//                     lastName: string
//                   }
//                 }
//                 state: string
//                 ticketType: {
//                   name: string
//                 }
//               }
//             }
//           ]
//         }
//       }
//     }
//     error?: ApolloError
//     loading?: boolean
// }
