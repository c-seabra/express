export type StaticMessages = {
  [messageName: string]: any
}

const STATIC_MESSAGES: StaticMessages = Object.freeze({
  VALIDATION: {
    REQUIRED: 'Required',
  },
})

export default STATIC_MESSAGES
