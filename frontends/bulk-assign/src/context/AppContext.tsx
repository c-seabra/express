/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { createContext, useContext, useState } from 'react'

export type AppTypes = {
  assigneesList?: Array<Assignee>
  setAssigneesList?: (assignees: Array<Assignee>) => void
  conferenceSlug?: string
  setConferenceSlug?: (slug: string) => void
}
export type Assignee = {
  firstName: string
  lastName: string
  email: string
  ticketId: string
  bookingRef: string
}


export const AppContext = createContext<AppTypes>({})

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [assigneesList, setAssigneesList] = useState<Array<Assignee>>()
  const [conferenceSlug, setConferenceSlug] = useState<string>()
  return (
    <AppContext.Provider
      value={{
        assigneesList,
        setAssigneesList,
        conferenceSlug,
        setConferenceSlug
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAssigneesList = () => useContext(AppContext)
