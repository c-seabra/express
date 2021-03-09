import { gql } from '@apollo/client';

const DYNAMIC_FORM_PAYLOAD = gql`
  fragment DynamicFormPayload on DynamicForm {
    id
    data
    schema
    mutation
    uiSchema
  }
`;
export default DYNAMIC_FORM_PAYLOAD;
