import { Button } from '@websummit/components/src/atoms/Button';
import BoxMessage from '@websummit/components/src/molecules/BoxMessage';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
// import Upload from '../upload/Upload';
import FileInputModal from '@websummit/components/src/molecules/FileInputModal';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import Select, {
  SelectFieldOption,
} from '@websummit/components/src/molecules/Select';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import TextInput from '@websummit/components/src/molecules/TextInput';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { shortenString } from '@websummit/components/src/utils/text';
import { useCommerceListProductsQuery } from '@websummit/graphql/src/@types/operations';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import {
  transformStaffIntoWorkUnit,
  WorkUnitContext,
} from '../../lib/extract/createOrder';
import { AppContext, Staff } from '../app/App';
import Loader from '../statusIcon/Loader';

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #0c1439;
`;

const StyledPre = styled.pre`
  display: inline;
`;

const Flex = styled.div`
  display: flex;
`;

const FlexEnd = styled(Flex)`
  display: flex;
  justify-content: flex-end;
`;

const StyledTextInput = styled(TextInput)`
  width: 100%;
  padding-right: 1rem;
  
  &:last-child {
    padding-right: 0;
  }
`;

function capitalizeFirstLetter(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

const Form: React.FC = () => {
  const context = useContext(AppContext);
  const [formError, setFormError] = useState(false);
  const [assignees, setAssignees] = useState<Staff[]>([]);

  const [singleTicketEnabled, setSingleTicketEnabled] = useState(false);
  const [singleTicketProductID, setSingleTicketProductID] = useState('');

  const [volumeTicketsEnabled, setVolumeTicketsEnabled] = useState(false);
  const [volumeTicketsProductID, setVolumeTicketsProductID] = useState('');
  const [volumeTicketsQuantity, setVolumeTicketsQuantity] = useState(10);

  const [notifyOrderOwner, setNotifyOrderOwner] = useState(false);

  const fileUploadId = 'custom-file-upload';
  const errSnackbar = useErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const { isOpen, closeModal, openModal } = useModalState();
  // const [formError, setFormError] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [fileName, setFileName] = useState('');

  // const onUpload = (e: any, elementId: string) => {
  const onUpload = (e: any, elementId: string) => {
    const input = document.getElementById(elementId) as HTMLInputElement;
    const { files } = input;

    const selectedFileName = e.target.files[0].name;
    setFileName(shortenString(selectedFileName));

    const errorHandler = (evt: ProgressEvent<FileReader>) => {
      if (evt?.target?.error?.name === 'NotReadableError') {
        errSnackbar('Unable to read uploaded file');
      }
    };

    const progressHandler = (evt: ProgressEvent<FileReader>) => {
      if (evt?.lengthComputable) {
        setProgressPercentage((evt.loaded / evt.total) * 100);
      }
    };

    const process = (fileReader: ProgressEvent<FileReader>) => {
      const csv = fileReader?.target?.result as string;
      if (csv) {
        const lines = csv.split('\n');
        const result: Staff[] = [];

        for (let i = 0; i <= lines.length - 1; i++) {
          const line = lines[i].replace(/(\r\n|\n|\r|)/gm, '');
          const [firstName, lastName, email] = line.split(',');

          result.push({
            email,
            firstName,
            lastName,
          });
        }

        setAssignees(result);
      } else {
        errSnackbar(
          'There has been an issue reading uploaded CSV try again or check your CSV has correct format.',
        );
      }
    };

    if (window.FileReader) {
      const file = files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = process;
        reader.onprogress = progressHandler;
        reader.onerror = errorHandler;
      } else {
        errSnackbar('No file has been selected');
      }
    } else {
      alert('FileReader is not supported in this browser.');
    }
  };

  const _onUpload = (e: any) => onUpload(e, fileUploadId);

  const { loading, error, data } = useCommerceListProductsQuery({
    context,
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.error(error);
    return <span>{error}</span>;
  }

  const products = data?.commerceListProducts?.hits;

  const firstOption = products?.[0].id || 'no id';

  const options: SelectFieldOption[] | undefined = products?.map((product) => ({
    disabled: !product.id,
    label: product.name,
    value: product.id || 'backend error!',
  }));

  const singleTicketCheckbox = (
    <>
      <input
        name="singleTicket"
        type="checkbox"
        onChange={(event: any) => {
          const value = event.target.checked as boolean;
          setSingleTicketEnabled(value);
          // we need to unset on disable
          setSingleTicketProductID(value ? firstOption : '');
        }}
      />
      Should each order have a single ticket assigned to the order owner?
    </>
  );

  const singleTicketSelect = (
    <Select
      options={options}
      value={singleTicketProductID}
      onChange={(event) => setSingleTicketProductID(event.target.value)}
    />
  );

  const singleTicket = (
    <>
      {singleTicketCheckbox}
      {singleTicketEnabled && singleTicketSelect}
    </>
  );

  const volumeTicketsSelect = (
    <Select
      options={options}
      value={volumeTicketsProductID}
      onChange={(event) => setVolumeTicketsProductID(event.target.value)}
    />
  );

  const volumeTicketsCheckbox = (
    <>
      <input
        name="volumeTickets"
        type="checkbox"
        onChange={(event: any) => {
          const value = event.target.checked as boolean;
          setVolumeTicketsEnabled(value);
          // we need to unset on disable
          setVolumeTicketsProductID(value ? firstOption : '');
        }}
      />
      Should each order have multiple unassigned tickets?
    </>
  );

  const volumeTicketsQuantitySelect = (
    <input
      name="volumeTicketsQuantity"
      type="number"
      value={volumeTicketsQuantity}
      onChange={(event: any) => {
        const value = parseInt(event.target.value, 10);
        setVolumeTicketsQuantity(value);
      }}
    />
  );

  const volumeTickets = (
    <>
      {volumeTicketsCheckbox}
      {volumeTicketsEnabled && (
        <>
          {volumeTicketsSelect}
          {volumeTicketsQuantitySelect}
        </>
      )}
    </>
  );

  const notifyCheckbox = (
    <>
      <input
        name="notify"
        type="checkbox"
        onChange={(event: any) => {
          const value = event.target.checked as boolean;
          setNotifyOrderOwner(value);
        }}
      />
      Should we send an email to the order owner to notify them about their
      tickets?
    </>
  );

  const metaOptions = (
    <>
      <Spacing bottom="1rem">{singleTicket}</Spacing>
      <Spacing bottom="1rem">{volumeTickets}</Spacing>
      <Spacing bottom="1rem">{notifyCheckbox}</Spacing>
    </>
  );

  const metaContext: WorkUnitContext = {
    guestProductId: volumeTicketsProductID,
    notify: notifyOrderOwner,
    quantity: volumeTicketsQuantity,
    staffProductId: singleTicketProductID,
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (assignees && assignees.length > 0 && context.setTicketsList) {
      setAssignees(assignees);
      context.setTicketsList(
        assignees.map((staff) =>
          transformStaffIntoWorkUnit(metaContext, staff),
        ),
      );
    } else {
      setFormError(true);
    }
  };
  const onSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // some hackery because ts is not smart enough for this type to work
    const firstName = (e.target as any).firstName.value as string;
    const lastName = (e.target as any).lastName.value as string;
    const emailField = (e.target as any).email.value as string;
    const email: string = emailField.toLowerCase().trim();

    if (context.setTicketsList) {
      const staff = {
        email,
        firstName: capitalizeFirstLetter(firstName),
        lastName: capitalizeFirstLetter(lastName),
      };
      const workUnit = transformStaffIntoWorkUnit(metaContext, staff);
      context.setTicketsList([workUnit]);
    } else {
      setFormError(true);
    }
  };

  return (
    <>
      <Spacing bottom="2rem">
        <BoxMessage
          backgroundColor="rgb(253, 235, 235)"
          color="#E15554"
          dimension="sm"
          type="warning"
        >
          <>
            Are you sure you know what you are doing? <br />
            Are you a financial admin authorized to make these changes? <br />
            If you get errors when using this tool and you do not have the
            permissions, that is to be expected
          </>
        </BoxMessage>
      </Spacing>

      <ContainerCard>
        <Spacing bottom="2rem">
          <Title>Settings</Title>
        </Spacing>

        <Spacing bottom="1rem">{metaOptions}</Spacing>

        <Spacing bottom="2rem">
          <ContainerCard title="Settings summary">
            <Spacing bottom="1rem">
              notify: {JSON.stringify(notifyOrderOwner)}
            </Spacing>
            <Spacing bottom="1rem">single: {singleTicketProductID}</Spacing>
            <Spacing bottom="1rem">volume id: {volumeTicketsProductID}</Spacing>
            <Spacing bottom="1rem">
              volume quantity: {volumeTicketsQuantity}
            </Spacing>
          </ContainerCard>
        </Spacing>

        <Spacing bottom="2rem">
          <ContainerCard title="Issue a single order">
            <form onSubmit={(e) => onSingleSubmit(e)}>
              {formError && (
                <div>There seems to be an error with your input.</div>
              )}
              <Flex>
               <StyledTextInput label="First name" name="firstName" />
               <StyledTextInput label="Last name" name="lastName" />
               <StyledTextInput label="Email" name="email" />
              </Flex>
              <FlexEnd>
                <Button type="submit">Submit</Button>
              </FlexEnd>
            </form>
          </ContainerCard>
        </Spacing>

        <Spacing bottom="2rem">
          <ContainerCard title="CSV Upload">
            <Spacing bottom="2rem">
              <BoxMessage
                backgroundColor="#333"
                color="#fff"
                dimension="sm"
                type="info"
              >
                <>
                  Upload a csv of orders, each line containing:{' '}
                  <StyledPre>firstName,lastName,email</StyledPre>
                </>
              </BoxMessage>
            </Spacing>

            <FileInputModal
              acceptedFileTypes=".csv"
              closeModal={closeModal}
              fileName={fileName}
              fileUploadId={fileUploadId}
              isFileError={formError}
              isOpen={isOpen}
              loadingProgress={progressPercentage}
              submitCallback={onSubmit}
              onUpload={_onUpload}
            />

            <Button onClick={openModal}>Add .csv file</Button>
          </ContainerCard>
        </Spacing>
      </ContainerCard>
    </>
  );
};

export default Form;
