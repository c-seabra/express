import { Button } from '@websummit/components/src/atoms/Button';
import Loader from '@websummit/components/src/atoms/Loader';
import BlockMessage from '@websummit/components/src/molecules/BlockMessage';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  CommerceCategory,
  CommerceDeal, CommerceSearchTerm, CommerceSearchTermOp,
  useCommerceListCategoriesQuery,
  useCommerceListDealsQuery,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { useRequestContext } from '../app/AppContext';
import PackageModalWrapper from '../modals/PackageModalWrapper';
import PackagesList from '../organisms/PackagesList';
import DiscountModalWrapper from '../modals/DiscountModalWrapper';

export const Container = styled.div`
  max-width: 1440px;
  margin: auto;
  padding-top: 1rem;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 26px 0;
`;

// Good candidate to move to package templates
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h1`
  color: #0c1439;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 32px;
  margin: 0;
`;

type GroupedPackages = {
  [k: string]: Partial<CommerceDeal>[];
};

const ungroupedCategoryName = 'Other';
type CommerceDealWithCategories = CommerceDeal & {
  categories: CommerceCategory[];
};

const groupPackagesByCategories = (
  packages: Partial<CommerceDealWithCategories>[] = [],
  ticketCategories: Pick<CommerceCategory, 'name' | 'id'>[] = [],
) => {
  let packagesByCategories: GroupedPackages = {};

  ticketCategories.forEach((category) => {
    const packagesByCategory = packages.filter((type) =>
      type?.categories?.some(
        (typeCategory: any) => typeCategory.id === category.id,
      ),
    );

    if (packagesByCategory.length > 0) {
      packagesByCategories = {
        ...packagesByCategories,
        [category.name]: packagesByCategory,
      };
    }
  });

  const ticketsWithoutCategory = packages.filter(
    (type) => !type.categories || type?.categories?.length === 0,
  );

  if (ticketsWithoutCategory.length > 0) {
    return {
      ...packagesByCategories,
      [ungroupedCategoryName]: ticketsWithoutCategory,
    };
  }

  return packagesByCategories;
};

const DiscountsPage = () => {
  const history = useHistory();
  const errorSnackbar = useErrorSnackbar();
  const { isOpen, closeModal, openModal } = useModalState();
  const redirectToPackage = (id: string) => {
    history.push(`/discount/${id}`);
  };
  const onRowClick = (event: any) => {
    redirectToPackage(event.id);
  };
  const context = useRequestContext();

  const templateFilter: CommerceSearchTerm = {
    field: 'metadata.template',
    op: CommerceSearchTermOp.Eq,
    value: 'true'
  };
  const discountsFilter: CommerceSearchTerm = {
    field: 'metadata.discount',
    op: CommerceSearchTermOp.Eq,
    value: 'true'
  };

  const { loading, data } = useCommerceListDealsQuery({
    context,
    variables: {
      terms: [templateFilter, discountsFilter]
    },
    onError: (error) => errorSnackbar(error.message),
  });



  const {
    data: commerceCategories,
    loading: loadingCategories,
  } = useCommerceListCategoriesQuery({
    context,
    onError: (e) => errorSnackbar(e.message),
  });

  const ticketCategories =
    commerceCategories?.commerceListCategories?.hits || [];
  const hasPackages = !!(
    data?.commerceListDeals?.hits && data?.commerceListDeals?.hits?.length > 0
  );
  const packages: any = data?.commerceListDeals?.hits;
  const mappedPackages = packages?.map((item: CommerceDeal) => {
    let category: CommerceCategory[] = [];
    item.dealItems?.map((elem: any) => {
      category = elem.product.categories;
    });

    return { ...item, categories: category };
  });

  const groupedPackages = groupPackagesByCategories(
    mappedPackages,
    ticketCategories,
  );

  const isLoading = loading || loadingCategories;
  const shouldRenderPackages = !isLoading && hasPackages;
  const shouldNotRenderPackages = !isLoading && !hasPackages;

  return (
    <Container>
      <DiscountModalWrapper closeModal={closeModal} isOpen={isOpen} />

      <FlexCol>
        <FlexRow>
          <Spacing bottom="1rem">
            <HeaderText>Discounts</HeaderText>
          </Spacing>

          {shouldRenderPackages && (
            <Button onClick={openModal}>Create new discount template</Button>
          )}
        </FlexRow>

        {loading && <Loader />}

        {shouldNotRenderPackages && (
          <ContainerCard>
            <Spacing bottom="36px" left="24px" right="24px" top="36px">
              <BlockMessage
                buttonText="Create now"
                header="Create new discount template"
                message="Please create a new discount template to see grouped results"
                onClickAction={openModal}
              />
            </Spacing>
          </ContainerCard>
        )}

        {shouldRenderPackages &&
          Object.entries(groupedPackages).map(([key, value]) => (
            <Spacing key={key} top="1.5rem">
              <ContainerCard noPadding title={key}>
                <PackagesList
                  packages={value as CommerceDeal[]}
                  onRowClick={onRowClick}
                />
              </ContainerCard>
            </Spacing>
          ))}
      </FlexCol>
    </Container>
  );
};

export default DiscountsPage;
