export type StaticMessages = {
  [routeName: string]: string
}

const STATIC_MESSAGES: StaticMessages = Object.freeze({
  VALIDATION: {
    REQUIRED: 'Required',
  },
})

export default STATIC_MESSAGES
