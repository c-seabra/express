import FormikModal from '@websummit/components/src/molecules/FormikModal';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import { useCommerceDeletePackagedProductMutation } from '@websummit/graphql/src/@types/operations';
import COMMERCE_GET_PRODUCT from '@websummit/graphql/src/operations/queries/CommerceGetProduct';
import { useRequestContext } from '@websummit/graphql/src/utils/AppContext';
import React from 'react';

type ModalProps = {
  closeModal: () => void;
  id: string;
  isOpen: boolean;
  itemId: string;
};

const TicketPackageItemRemovalModal = ({
  isOpen,
  closeModal,
  id,
  itemId,
}: ModalProps) => {
  const context = useRequestContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  const refetchQueriesContext = [
    {
      context,
      query: COMMERCE_GET_PRODUCT,
      variables: { id },
    },
  ];

  const [deletePackageItem] = useCommerceDeletePackagedProductMutation({
    context,
    onCompleted: () => {
      snackbar('Ticket type deleted from package');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: refetchQueriesContext,
  });

  const setMutation = () => {
    return deletePackageItem({
      variables: {
        id: itemId,
        productId: id,
      },
    });
  };

  return (
    <FormikModal
      alertHeader="Remove ticket type from package?"
      closeModal={closeModal}
      initialValues={{}}
      isOpen={isOpen}
      submitCallback={setMutation}
      submitText="Delete"
    />
  );
};

export default TicketPackageItemRemovalModal;
