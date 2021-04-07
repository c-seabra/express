import React from 'react'

import { ErrorContainer } from './Error.styled'

const Error = ({ errors }) => (errors && errors.length > 0 ? <ErrorContainer>{errors.join(', ')}</ErrorContainer> : null)

export default Error
