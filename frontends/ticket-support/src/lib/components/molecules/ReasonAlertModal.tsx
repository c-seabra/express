import { Form, Formik } from 'formik'
import React, { FormEvent, useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { Spacing } from '../../../components/templates/Spacing'
import STATIC_MESSAGES from '../../constants/messages'
import { Button, ErrorButton, SecondaryButton } from '../atoms/Button'
import Icon from '../atoms/Icon'
import Modal from './Modal'
import TextInputField from './TextInputField'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 0;
  font-size: 0.85rem;
  font-weight: 400;
  min-width: 640px;
`

const Text = styled.div`
  font-size: 20px;
  letter-spacing: 0;
  line-height: 28px;
  max-width: 580px;
`

const HeaderText = styled.div`
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -0.5px;
  line-height: 40px;
`

const AlertText = styled(HeaderText)`
  color: #e15554;
`

const IconWrapper = styled.div`
  > .material-icons {
    font-size: 36px;
    color: #e15554;
  }
`

type ReasonAlertModalProps = {
  alertHeader: string
  alertText: string
  closeModal: () => void
  headerText: string
  isOpen: boolean
  mutationCallback: (values?: any) => void
  orderRef: string
  submitText: string
}

const confirmSchema = Yup.object().shape({
  reason: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
})

const ReasonAlertModal = ({
  isOpen,
  closeModal,
  orderRef,
  headerText,
  alertText,
  alertHeader,
  mutationCallback,
  submitText = 'Submit',
}: ReasonAlertModalProps) => {
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

    setFormControls(undefined)
    closeModal()
  }

  return (
    <Modal key={isOpen.toString()} isOpen={isOpen} onRequestClose={handleClose}>
      <Formik
        initialValues={{
          reason: '',
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={confirmSchema}
        onSubmit={async values => {
          console.log(values)
          await mutationCallback(values)

          handleClose()
        }}
      >
        {({ submitForm, resetForm }) => {
          // Binding submit form to submit programmatically from outside the <Formik> component
          if (!formControls) {
            setFormControls({ boundReset: resetForm, boundSubmit: submitForm })
          }

          return (
            <Form>
              <Wrapper>
                <Spacing bottom="10px">
                  <IconWrapper>
                    <Icon>error</Icon>
                  </IconWrapper>
                </Spacing>

                <HeaderText>{headerText}</HeaderText>

                <Spacing bottom="40px">
                  <AlertText>{alertHeader}</AlertText>
                </Spacing>

                <Spacing bottom="40px" top="24px">
                  <Text>{alertText}</Text>
                </Spacing>

                <TextInputField
                  required
                  label="Please specify the reason for the cancelling"
                  name="reason"
                />

                <Spacing bottom="50px">
                  {/* <Modal.DefaultFooter submitText="Cancel order" cancelText={} onCancelClick={handleClose} /> */}
                  <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                  <Button type="submit">{submitText}</Button>
                </Spacing>
              </Wrapper>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}

export default ReasonAlertModal
