import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { WarningMessage } from '../../lib/components/atoms/Messages'
import CheckboxField from '../../lib/components/molecules/CheckboxField'
import Modal, { ModalProps } from '../../lib/components/molecules/Modal'
import MoneyInputField from '../../lib/components/molecules/MoneyInputField'
import RadioField from '../../lib/components/molecules/RadioField'
import SelectField from '../../lib/components/molecules/SelectField'
import TextAreaField from '../../lib/components/molecules/TextAreaField'
import { VALIDATION_MESSAGES } from '../../lib/constants/messages'
import useRefund from '../../lib/hooks/useRefund'
import { CommerceOrder } from '../../lib/types'

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin: 2rem 0 1rem;
  width: 500px;

  & > * {
    margin-bottom: 1rem;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > * {
    width: 48%;
  }
`

const RadioGroup = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledWarningMessage = styled(WarningMessage)`
  margin-bottom: 2.5rem;

  & > span {
    font-weight: 600;
  }
`

const refundTypes = {
  full: 'full',
  partial: 'partial',
}

const refundMethods = {
  CREDIT: 'credit',
  DEFAULT: 'default',
  REFUNDED: 'refunded',
}

const refundMethodOptions = [
  {
    label: "Full refund via customer's payment method",
    value: refundMethods.DEFAULT,
  },
  {
    // TODO - remove disabled when option is allowed
    disabled: true,
    label: 'Record transaction as refunded',
    value: refundMethods.REFUNDED,
  },
  {
    // TODO - remove disabled when option is allowed
    disabled: true,
    label: 'Credit value to future event',
    value: refundMethods.CREDIT,
  },
]

const refundShape = {
  amount: Yup.number().typeError('Amount must be a number').required(VALIDATION_MESSAGES.REQUIRED),
  method: Yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  reason: Yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  type: Yup.mixed().oneOf([refundTypes.full, refundTypes.partial]),
}

const fullRefundSchema = Yup.object().shape(refundShape)

const partialRefundSchema = Yup.object().shape({
  ...refundShape,
  refundTax: Yup.boolean(),
  taxRefundAmount: Yup.string().when('refundTax', {
    is: true,
    then: Yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  }),
})

const orderRefundSchema = () =>
  Yup.lazy((value: { type: string }) => {
    if (value.type === refundTypes.full) {
      return fullRefundSchema
    }

    return partialRefundSchema
  })

const getFullRefundInitialValues = (order: CommerceOrder) => {
  return {
    amount: order.total,
  }
}

// TODO - for now, it's just the first tax type found on the order
// later down the line it's going to be a select field with different taxes
const getProductTax = (order: CommerceOrder) => {
  return order?.items[0]?.tax
}

type OrderRefundModalProps = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  commerceOrder: CommerceOrder
  orderRef: string
}

const OrderRefundModal = ({
  commerceOrder,
  isOpen,
  onRequestClose,
  orderRef,
}: OrderRefundModalProps) => {
  const [isConfirmStep, setConfirmStep] = useState(false)
  const { fullRefund, partialRefund } = useRefund({ order: commerceOrder })

  const orderInitialValues = getFullRefundInitialValues(commerceOrder)

  const handleClose = () => {
    setConfirmStep(false)
    onRequestClose()
  }

  const tax = getProductTax(commerceOrder) || {}
  const { country, name, rateAmount } = tax

  return (
    <Modal isOpen={isOpen} title="Refund order" onRequestClose={handleClose}>
      <Formik
        initialValues={{
          ...orderInitialValues,
          method: refundMethods.DEFAULT,
          reason: '',
          refundTax: false,
          taxRefundAmount: commerceOrder.taxTotal,
          type: refundTypes.full,
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={orderRefundSchema}
        onSubmit={async values => {
          if (isConfirmStep) {
            if (values.type === 'full') {
              await fullRefund(values.reason)
            } else {
              await partialRefund(values.reason, values.amount)
            }

            handleClose()
          } else {
            setConfirmStep(true)
          }
        }}
      >
        {({ values }) => (
          <StyledForm>
            {!isConfirmStep ? (
              <>
                <RadioGroup>
                  <RadioField label="Full refund" name="type" value={refundTypes.full} />
                  {/* TODO - remove disabled when implementing partial refund */}
                  <RadioField
                    disabled
                    label="Partial refund"
                    name="type"
                    value={refundTypes.partial}
                  />
                </RadioGroup>
                <MoneyInputField
                  currencySymbol={commerceOrder.currencySymbol}
                  disabled={values.type === refundTypes.full}
                  label="Amount to refund"
                  name="amount"
                />
                {values.type === refundTypes.partial && (
                  <Row>
                    <CheckboxField
                      label={`Refund ${name} (${country}) at ${rateAmount}%?`}
                      name="refundTax"
                    />
                    <MoneyInputField
                      currencySymbol={commerceOrder.currencySymbol}
                      disabled={!values.refundTax}
                      label={`Amount of ${name} to refund`}
                      name="taxRefundAmount"
                      required={values.refundTax}
                    />
                  </Row>
                )}
                <SelectField
                  required
                  label="How would you like this order to be refunded"
                  name="method"
                  options={refundMethodOptions}
                />
                <TextAreaField
                  required
                  label="Please specify a reason for your actions"
                  name="reason"
                />
              </>
            ) : (
              <StyledWarningMessage>
                Are you sure you want to refund order <span>{orderRef}</span>?
              </StyledWarningMessage>
            )}
            <Modal.DefaultFooter onCancelClick={handleClose} />
          </StyledForm>
        )}
      </Formik>
    </Modal>
  )
}

export default OrderRefundModal
