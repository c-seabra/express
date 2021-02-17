import { useMutation } from '@apollo/client'

import { useAppContext } from '../../components/app/AppContext'
import { INVESTOR_ACCESS_GRANT_MUTATION } from '../../operations/mutations/InvestorAccessGrantMutation'
import { Error } from '../types'
import { useErrorSnackbar, useSuccessSnackbar } from './useSnackbarMessage'

type Ticket = {
  attendanceId?: string
  bookingRef: string
  name?: string
}

type InvestorAccessGrantData  = {
  investorAccessGrant: {
    errors: Error[],
    invalidBookingReferences: string[],
    successMessage: string,
    tickets: Ticket[]
  }
}

type InvestorAccessArgs = {
  bookingReferences: string[],
  setInvalidBookingReferences: React.Dispatch<React.SetStateAction<string[]>>,
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>,
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>,
  startupSelectionsCount: number | undefined
}

const useInvestorAccessGrantMutation = ({
  bookingReferences,
  setInvalidBookingReferences,
  setTickets,
  setUpdating,
  startupSelectionsCount,
}: InvestorAccessArgs) => {
  const { conferenceSlug, token } = useAppContext()
  const success = useSuccessSnackbar()
  const errorMessage = useErrorSnackbar()

  const [grantInvestorAccess, { data, error, loading }] = useMutation<InvestorAccessGrantData>(INVESTOR_ACCESS_GRANT_MUTATION, {
    onCompleted: ({ investorAccessGrant }) => {
      setUpdating(false)
      if (investorAccessGrant?.errors[0]) {
        setInvalidBookingReferences([])
        setTickets([])
        errorMessage(investorAccessGrant?.errors[0].message)
      } else {
        setInvalidBookingReferences(investorAccessGrant?.invalidBookingReferences)
        setTickets(investorAccessGrant?.tickets)
        success(investorAccessGrant.successMessage)
      }
    },
    onError: (e) => {
      setInvalidBookingReferences([])
      setTickets([])
      setUpdating(false)
      errorMessage(e.toLocaleString())
    },
  })

  const grantInvestorAccessMutation = async () => {
    await grantInvestorAccess({
      context: {
        slug: conferenceSlug,
        token,
      },
      variables: {
        bookingReferences,
        startupSelectionsCount
      },
    })
  }

  return {
    data,
    error,
    grantInvestorAccessMutation,
    loading,
  }
}

export default useInvestorAccessGrantMutation
