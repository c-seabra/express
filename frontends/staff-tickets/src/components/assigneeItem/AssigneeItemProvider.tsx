import React, {useState, useContext, useEffect} from 'react'

import {useMutation} from '@apollo/client'
import CREATE_ORDER_MUTATION from '../../operations/mutations/CreateOrder'

import AssigneeItem from '../assigneeItem/AssigneeItem'

import {AppContext, Staff} from '../app/App'

export type StatusType = {
  message: string
  type: 'PENDING' | 'SUCCESS' | 'ERROR'
}

type AssigneeItemProvider = Staff


const AssigneeItemProvider: React.FC<AssigneeItemProvider> = ({bookingRef, firstName, lastName, email}) => {
  const {token, conferenceSlug} = useContext(AppContext)
  const [status, setStatus] = useState<StatusType>({
    message: 'Assignment is still processing.',
    type: 'PENDING'
  })

  const [ticketAccept] = useMutation(CREATE_ORDER_MUTATION, {
    onCompleted: ({ticketAccept}: any) => {
      if (ticketAccept?.userErrors.length) {
        setStatus({
          message: ticketAccept.userErrors[0].message,
          type: 'ERROR'
        })
      } else {
        setStatus({
          message: 'Auto claim was successful',
          type: 'SUCCESS'
        })
      }
    }
  })

  useEffect(() => {
    ticketAccept({
      context: {
        token,
        slug: conferenceSlug
      },
      variables: {
        "storeId":"22d0f54a-35ef-4dcc-a2b3-1e6c8f99a41f",
        "input": {
          "customer": {
            "email": email,
            "firstName": firstName,
            "lastName": lastName
          },
          "items": [
            {
              "product": "56ba3c20-ee93-4aa7-8400-2ffc22f36a92",
              "quantity": 1,
              "metadata": {
                assignees: [
                  {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    bookingReference: bookingRef
                  }
                ]
              }
            },
            {
              "product": "65e53977-9efa-4937-bdf7-340a8a131862",
              "quantity": 20
            }
          ],
          "status": "COMPLETE"
        }
      }
    }).catch((e) => {
      console.error(e)
      setStatus({
        message: `Unable to create this ticket - ${bookingRef}`,
        type: 'ERROR'
      })
    })
  }, [])

  return (
    <AssigneeItem bookingRef={bookingRef} firstName={firstName} lastName={lastName} email={email} status={status}/>
  )

}

export default AssigneeItemProvider
