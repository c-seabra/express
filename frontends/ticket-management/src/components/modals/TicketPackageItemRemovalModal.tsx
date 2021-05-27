import FormikModal from '@websummit/components/src/molecules/FormikModal';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import { useCommerceDeletePackagedProductMutation } from '@websummit/graphql/src/@types/operations';
import COMMERCE_DEAL_ITEMS_LIST from '@websummit/graphql/src/operations/queries/CommerceListDealItems';
import React from 'react';

import { useRequestContext } from '../app/AppContext';

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
  // const refetchQueriesContext = [
  //   {
  //     context,
  //     query: COMMERCE_DEAL_ITEMS_LIST,
  //     variables: { id },
  //   },
  // ];

  const [deletePackageItem] = useCommerceDeletePackagedProductMutation({
    context,
    onCompleted: () => {
      snackbar('Ticket type added deleted from package');
    },
    onError: (e) => errorSnackbar(e.message),
    // refetchQueries: refetchQueriesContext,
  });

  const setMutation = () => {
    return deletePackageItem({
      variables: {
        id,
        productId: itemId,
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
