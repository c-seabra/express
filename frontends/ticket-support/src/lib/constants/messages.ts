const validationMessages = {
  EMAIL: 'Invalid email',
  REQUIRED: 'Required',
};

export const VALIDATION_MESSAGES: Readonly<
  typeof validationMessages
> = validationMessages;

const STATIC_MESSAGES = {
  VALIDATION: VALIDATION_MESSAGES,
};

export default STATIC_MESSAGES;
