# Development

- run `yarn && yarn start:standalone`
- Go to http://single-spa-playground.org/playground/instant-test?name=@websummit-micro/bulk-assign&url=8080 to see it working!

# Project info

- Produces an option for user to bulk assign tickets
- on csv upload it goes off to catalyst to request `ticketId` for each `bookingRef` provided
- if ticketId is available(could be missing due to wrong booking ref, incorrect credentials etc.) than goes back to catalyst with a mutation(containing name, email & ticketId) to assign
  tickets
- uses React app, typescript & Apollo client
