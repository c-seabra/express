import FormikModal from '@websummit/components/src/molecules/FormikModal';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import { useCommerceDeleteDealItemMutation } from '@websummit/graphql/src/@types/operations';
import COMMERCE_DEAL_ITEMS_LIST from '@websummit/graphql/src/operations/queries/CommerceListDealItems';
import { useRequestContext } from '@websummit/graphql/src/utils/AppContext';
import React from 'react';

type ModalProps = {
  closeModal: () => void;
  dealId: string;
  dealItemId: string;
  isOpen: boolean;
};

const DiscountTemplateItemRemovalModal = ({
  isOpen,
  closeModal,
  dealId,
  dealItemId,
}: ModalProps) => {
  const context = useRequestContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  const refetchQueriesContext = [
    {
      context,
      query: COMMERCE_DEAL_ITEMS_LIST,
      variables: { dealId },
    },
  ];

  const [deletePackageItem] = useCommerceDeleteDealItemMutation({
    context,
    onCompleted: () => {
      snackbar('Discount template constraint deleted');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: refetchQueriesContext,
  });

  const setMutation = () => {
    return deletePackageItem({
      variables: {
        dealId,
        id: dealItemId,
      },
    });
  };

  return (
    <FormikModal
      alertHeader="Remove discount template constraint?"
      closeModal={closeModal}
      initialValues={{}}
      isOpen={isOpen}
      submitCallback={setMutation}
      submitText="Delete"
    />
  );
};

export default DiscountTemplateItemRemovalModal;
