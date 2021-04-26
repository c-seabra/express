import { Button } from '@websummit/components/src/atoms/Button';
import Loader from '@websummit/components/src/atoms/Loader';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  CommerceCategory,
  CommerceDeal,
  useCommerceListCategoriesQuery,
  useCommerceListDealsQuery,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { useModalState } from '../../../../../packages/components/src/molecules/Modal';
import { useRequestContext } from '../app/AppContext';
import PackageModalWrapper from '../modals/PackageModalWrapper';
import PackagesList from '../organisms/PackagesList';

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

const PackagesPage = () => {
  const history = useHistory();
  const errorSnackbar = useErrorSnackbar();
  const { isOpen, closeModal, openModal } = useModalState();
  const onButtonClick = () => {
    openModal();
  };
  const redirectToPackage = (id: string) => {
    history.push(`/package/${id}`);
  };
  const onRowClick = (event: any) => {
    redirectToPackage(event.id);
  };
  const context = useRequestContext();
  const { loading, data } = useCommerceListDealsQuery({
    context,
    onError: (error) => errorSnackbar(error.message),
  });
  const { data: commerceCategories } = useCommerceListCategoriesQuery({
    context,
    onError: (e) => errorSnackbar(e.message),
  });

  const ticketCategories =
    commerceCategories?.commerceListCategories?.hits || [];
  const hasPackages =
    data?.commerceListDeals?.hits && data?.commerceListDeals?.hits?.length > 0;
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

  return (
    <Container>
      {loading && <Loader />}

      <PackageModalWrapper closeModal={closeModal} isOpen={isOpen} />

      <FlexCol>
        <FlexRow>
          <HeaderText>Packages</HeaderText>
          <Button onClick={onButtonClick}>Create new package</Button>
        </FlexRow>

        {hasPackages &&
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

export default PackagesPage;
