import { Button } from '@websummit/components/src/atoms/Button';
import Loader from '@websummit/components/src/atoms/Loader';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import { useCommerceListDealsQuery } from '@websummit/graphql/src/@types/operations';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { useRequestContext } from '../app/AppContext';
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

const PackagesPage = () => {
  const history = useHistory();
  const errorSnackbar = useErrorSnackbar();
  // * DO NOTE REMOVE: WILL BE USED IN NEXT ITERATION
  // const { isOpen, closeModal, openModal } = useModalState();
  const onButtonClick = () => {
    // openModal();
  };
  const redirectToCycle = (id: string) => {
    history.push(`/package/${id}`);
  };
  const onRowClick = (event: any) => {
    redirectToCycle(event.id);
  };
  const context = useRequestContext();
  const { loading, data } = useCommerceListDealsQuery({
    context,
    onError: (error) => errorSnackbar(error.message),
  });

  const hasPackages =
    data?.commerceListDeals?.hits && data?.commerceListDeals?.hits?.length > 0;
  const cycles: any = data?.commerceListDeals?.hits;
  const sortedPackages: any = cycles?.slice()?.sort((a: any, b: any) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  return (
    <Container>
      {loading && <Loader />}

      {/* DO NOTE REMOVE: WILL BE USED IN NEXT ITERATION */}
      {/* <SaleCycleModalWrapper closeModal={closeModal} isOpen={isOpen} /> */}

      <FlexCol>
        <FlexRow>
          <HeaderText>Sale cycles</HeaderText>
          <Button onClick={onButtonClick}>Create new package</Button>
        </FlexRow>

        {hasPackages && (
          <FlexRow>
            <PackagesList cycles={sortedPackages} onRowClick={onRowClick} />
          </FlexRow>
        )}
      </FlexCol>
    </Container>
  );
};

export default PackagesPage;
