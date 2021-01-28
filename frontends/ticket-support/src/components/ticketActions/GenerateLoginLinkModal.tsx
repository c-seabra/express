import { Form, Formik } from 'formik'
import React, { FormEvent, useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { Button, SecondaryButton } from '../../lib/components/atoms/Button'
import Modal, { ModalProps } from '../../lib/components/molecules/Modal'
import TextInputField from '../../lib/components/molecules/TextInputField'

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledSecondaryButton = styled(SecondaryButton)`
  margin-right: 8px;
`

const StyledForm = styled(Form)`
  width: 450px;
  padding: 1rem 0;
`

const InfoMessage = styled.div`
  border-radius: 4px;
  background-color: rgba(0, 103, 233, 0.7);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 400;
  padding: 0.8rem;
  margin-bottom: 16px;
`

const generateLinkSchema = Yup.object().shape({
  reason: Yup.string().required('Required'),
})

type GenerateLoginLinkModalProps = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  generateLink: (reason: string) => void
}

const GenerateLoginLinkModal = ({
  isOpen,
  onRequestClose,
  generateLink,
}: GenerateLoginLinkModalProps) => {
  const [formControls, setFormControls] = useState<
    | {
        boundReset?: () => void
        boundSubmit?: (event?: FormEvent) => void
      }
    | undefined
  >()

  const handleClose = () => {
    if (formControls?.boundReset) {
      formControls.boundReset()
    }

    onRequestClose()
  }

  const renderLoginLinkModalFooter = () => (
    <ModalFooter>
      <StyledSecondaryButton onClick={handleClose}>Cancel</StyledSecondaryButton>
      <Button onClick={formControls?.boundSubmit}>Generate</Button>
    </ModalFooter>
  )

  return (
    <Modal
      isOpen={isOpen}
      renderFooter={renderLoginLinkModalFooter}
      title="Generate login link"
      onRequestClose={onRequestClose}
    >
      <Formik
        initialValues={{
          reason: '',
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={generateLinkSchema}
        onSubmit={values => {
          generateLink(values.reason)
          handleClose()
        }}
      >
        {({ submitForm, resetForm }) => {
          // Binding submit form to submit programmatically from outside the <Formik> component
          if (!formControls) {
            setFormControls({ boundReset: resetForm, boundSubmit: submitForm })
          }

          return (
            <StyledForm>
              <TextInputField
                required
                label="Please enter a reason for this change"
                name="reason"
              />
              <InfoMessage>
                The generated link can be copied by hovering over the "Generated Login Link" text.
              </InfoMessage>
            </StyledForm>
          )
        }}
      </Formik>
    </Modal>
  )
}

export default GenerateLoginLinkModal
