import FormikModal from '@websummit/components/src/molecules/FormikModal';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import { useCommerceDeleteDealItemMutation } from '@websummit/graphql/src/@types/operations';
import COMMERCE_DEAL_ITEMS_LIST from '@websummit/graphql/src/operations/queries/CommerceListDealItems';
import React from 'react';

import { useRequestContext } from '../app/AppContext';

type ModalProps = {
  closeModal: () => void;
  dealId: string;
  isOpen: boolean;
};

type FormData = {
  active: boolean;
  description: string;
  endDate: any;
  id: string;
  name: string;
  startDate: any;
};

const PackageItemRemovalModal = ({
  isOpen,
  closeModal,
  dealId,
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
      snackbar('Pricing for package deleted');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: refetchQueriesContext,
  });

  const triggerMutation = (dealItemId: string | null) => {
    console.log('event', dealItemId, dealId);

    if (dealItemId) {
      // return deletePackageItem({
      //   variables: {
      //     dealId,
      //     id: dealItemId,
      //   },
      // });
    }
  };

  const setMutation = (formData: any) => {
    return triggerMutation(formData);
  };

  return (
    <FormikModal
      alertHeader="Remove package constraint"
      closeModal={closeModal}
      isOpen={isOpen}
      submitCallback={setMutation}
      submitText="Delete"
    />
  );
};

export default PackageItemRemovalModal;
