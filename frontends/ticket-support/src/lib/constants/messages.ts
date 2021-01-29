export type StaticMessage = {
  [messageName: string]: string
}

export type StaticMessages = {
  [messageGroup: string]: StaticMessage
}

const STATIC_MESSAGES: StaticMessages = Object.freeze({
  VALIDATION: {
    REQUIRED: 'Required',
  },
})

export default STATIC_MESSAGES
