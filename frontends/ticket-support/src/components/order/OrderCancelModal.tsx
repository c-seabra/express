import React from 'react'

import ReasonAlertModal from '../../lib/components/molecules/ReasonAlertModal'
import { useOrderCancelMutation } from '../../operations/mutations/OrderCancel'

type OrderCancelModalProps = {
  closeModal: () => void
  isOpen: boolean
  orderRef: string
}

const OrderCancelModal = ({ isOpen, closeModal, orderRef }: OrderCancelModalProps) => {
  const { cancelOrder } = useOrderCancelMutation()

  return (
    <ReasonAlertModal
      alertHeader={orderRef}
      alertText="Are you sure you want to cancel this order? Cancellation will void all associated tickets."
      closeModal={closeModal}
      headerText="Cancellation of Order"
      isOpen={isOpen}
      mutationCallback={cancelOrder}
      orderRef={orderRef}
      submitText="Yes,cancel order"
    />
  )
}

export default OrderCancelModal

// import { Form, Formik } from 'formik'
// import React, { FormEvent, useState } from 'react'
// import styled from 'styled-components'
// import * as Yup from 'yup'
//
// import { WarningMessage } from '../../lib/components/atoms/Messages'
// import Modal from '../../lib/components/molecules/Modal'
// import TextInputField from '../../lib/components/molecules/TextInputField'
// import STATIC_MESSAGES from '../../lib/constants/messages'
// import { useOrderCancelMutation } from '../../operations/mutations/OrderCancel'
//
// const ContentContainer = styled.div`
//   padding: 2rem 0;
//   width: 450px;
//   font-size: 0.85rem;
//   font-weight: 400;
// `
//
// const ConfirmationText = styled.div`
//   display: flex;
//   flex-direction: column;
//   font-size: 1rem;
//   font-weight: 400;
//   padding-bottom: 2rem;
//   color: #07143e;
// `
//
// const StyledForm = styled(Form)`
//   & > * {
//     margin-bottom: 0.5rem;
//   }
// `
//
// const StyledSpan = styled.span`
//   font-weight: 600;
// `
//
// const StyledWarningMessage = styled(WarningMessage)`
//   background-color: #f8ba26;
//   margin-bottom: 4rem;
// `
//
// type OrderCancelModalProps = {
//   closeModal: () => void
//   isOpen: boolean
//   orderRef: string
// }
//
// const confirmSchema = Yup.object().shape({
//   reason: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
// })
//
// const OrderCancelModal = ({ isOpen, closeModal, orderRef }: OrderCancelModalProps) => {
//   const { cancelOrder } = useOrderCancelMutation()
//   const [formControls, setFormControls] = useState<
//     | {
//         boundReset?: () => void
//         boundSubmit?: (event?: FormEvent) => void
//       }
//     | undefined
//   >()
//
//   const handleClose = () => {
//     if (formControls?.boundReset) {
//       formControls.boundReset()
//     }
//
//     setFormControls(undefined)
//     closeModal()
//   }
//
//   return (
//     <Modal
//       key={isOpen.toString()}
//       isOpen={isOpen}
//       title="Cancellation of order"
//       onRequestClose={handleClose}
//     >
//       <ContentContainer>
//         <Formik
//           initialValues={{
//             reason: '',
//           }}
//           validateOnBlur={false}
//           validateOnChange={false}
//           validationSchema={confirmSchema}
//           onSubmit={async values => {
//             await cancelOrder({ orderRef, reason: values?.reason })
//
//             handleClose()
//           }}
//         >
//           {({ submitForm, resetForm }) => {
//             // Binding submit form to submit programmatically from outside the <Formik> component
//             if (!formControls) {
//               setFormControls({ boundReset: resetForm, boundSubmit: submitForm })
//             }
//
//             return (
//               <StyledForm>
//                 <ConfirmationText>
//                   <span>
//                     Are you sure you want to cancel order <StyledSpan>{orderRef}</StyledSpan>?
//                   </span>
//                 </ConfirmationText>
//                 <TextInputField
//                   required
//                   label="Please specify the reason for the cancelling"
//                   name="reason"
//                 />
//                 <StyledWarningMessage>
//                   <StyledSpan>Warning:</StyledSpan> Are you sure you want to cancel this order?
//                   Cancellation will void all associated tickets.
//                 </StyledWarningMessage>
//                 <Modal.DefaultFooter submitText="Cancel order" onCancelClick={handleClose} />
//               </StyledForm>
//             )
//           }}
//         </Formik>
//       </ContentContainer>
//     </Modal>
//   )
//   return (
//     <Modal
//       key={isOpen.toString()}
//       isOpen={isOpen}
//       title="Cancellation of order"
//       onRequestClose={handleClose}
//     >
//       <ContentContainer>
//         <Formik
//           initialValues={{
//             reason: '',
//           }}
//           validateOnBlur={false}
//           validateOnChange={false}
//           validationSchema={confirmSchema}
//           onSubmit={async values => {
//             await cancelOrder({ orderRef, reason: values?.reason })
//
//             handleClose()
//           }}
//         >
//           {({ submitForm, resetForm }) => {
//             // Binding submit form to submit programmatically from outside the <Formik> component
//             if (!formControls) {
//               setFormControls({ boundReset: resetForm, boundSubmit: submitForm })
//             }
//
//             return (
//               <StyledForm>
//                 <ConfirmationText>
//                   <span>
//                     Are you sure you want to cancel order <StyledSpan>{orderRef}</StyledSpan>?
//                   </span>
//                 </ConfirmationText>
//                 <TextInputField
//                   required
//                   label="Please specify the reason for the cancelling"
//                   name="reason"
//                 />
//                 <StyledWarningMessage>
//                   <StyledSpan>Warning:</StyledSpan> Are you sure you want to cancel this order?
//                   Cancellation will void all associated tickets.
//                 </StyledWarningMessage>
//                 <Modal.DefaultFooter submitText="Cancel order" onCancelClick={handleClose} />
//               </StyledForm>
//             )
//           }}
//         </Formik>
//       </ContentContainer>
//     </Modal>
//   )
// }
//
// export default OrderCancelModal
