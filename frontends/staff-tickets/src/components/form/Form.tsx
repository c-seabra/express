import Badge from '@websummit/components/src/atoms/Badge';
import { Button } from '@websummit/components/src/atoms/Button';
import Icon, { IconWrapper } from '@websummit/components/src/atoms/Icon';
import Loader from '@websummit/components/src/atoms/Loader';
import BoxMessage from '@websummit/components/src/molecules/BoxMessage';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import DownloadCSVButton from '@websummit/components/src/molecules/DownloadCSVButton';
import FileInputModal from '@websummit/components/src/molecules/FileInputModal';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import Select, {
  SelectFieldOption,
} from '@websummit/components/src/molecules/Select';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import TextInput from '@websummit/components/src/molecules/TextInput';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { shortenString } from '@websummit/tsutils/src/utils/text';
import {
  CommerceProductType,
  useCommerceListPaymentMethodsQuery,
  useCommerceListProductsQuery,
} from '@websummit/graphql/src/@types/operations';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import {
  transformStaffIntoWorkUnit,
  WorkUnitContext,
} from '../../lib/extract/createOrder';
import { AppContext, Staff } from '../app/App';

const Flex = styled.div`
  display: flex;
`;

const StyledDownload = styled(Flex)`
  align-items: center;
  color: #0067e9;
`;

const FlexEnd = styled(Flex)`
  justify-content: flex-end;
`;

const FlexCenteredVertically = styled(Flex)`
  align-items: center;
`;

const SubHeader = styled(Flex)`
  font-weight: 500;
`;

const StyledSelect = styled(Select)`
  width: 48%;
`;

const StyledTextInput = styled(TextInput)`
  width: 100%;
  padding-right: 1rem;

  &:last-child {
    padding-right: 0;
  }
`;

const StyledNumberInput = styled(TextInput)`
  width: 48%;
`;

function capitalizeFirstLetter(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

const Form: React.FC = () => {
  const context = useContext(AppContext);
  const [formError, setFormError] = useState(false);
  const [assignees, setAssignees] = useState<Staff[]>([]);

  const [paymentMethodID, setPaymentMethodID] = useState('');
  const [paymentMethodName, setPaymentMethodName] = useState('');

  const [singleTicketEnabled, setSingleTicketEnabled] = useState(false);
  const [singleTicketProductID, setSingleTicketProductID] = useState('');
  const [singleTicketProductName, setSingleTicketProductName] = useState('');

  const [volumeTicketsEnabled, setVolumeTicketsEnabled] = useState(false);
  const [volumeTicketsProductID, setVolumeTicketsProductID] = useState('');
  const [volumeTicketsProductName, setVolumeTicketsProductName] = useState('');
  const [volumeTicketsQuantity, setVolumeTicketsQuantity] = useState(10);

  const [notifyOrderOwner, setNotifyOrderOwner] = useState(false);

  const fileUploadId = 'custom-file-upload';
  const errSnackbar = useErrorSnackbar();
  const { isOpen, closeModal, openModal } = useModalState();
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [fileName, setFileName] = useState('');

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

  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useCommerceListPaymentMethodsQuery({
    context,
  });

  if (loading || loading2) {
    return <Loader />;
  }

  if (error || error2) {
    console.error(error, error2);
    return <span>{error || error2}</span>;
  }

  const products = data?.commerceListProducts?.hits;
  const paymentMethods = data2?.commerceListPaymentMethods?.hits?.filter(
    (paymentMethod) =>
      paymentMethod.gateway === 'f163017a-cc4f-4619-9e72-26c5ac9ea5e7',
  );

  const firstOption = products?.[0];
  const firstOptionId = firstOption?.id || 'no id';
  const firstOptionLabel = firstOption?.name || 'no label';

  if (!paymentMethodID || paymentMethodID === '') {
    setPaymentMethodID(
      paymentMethods?.[0]?.id ||
        'No Payment Methods found, this will not work!',
    );
    setPaymentMethodName(
      paymentMethods?.[0]?.name || 'Trust me it will break horribly!',
    );
  }

  const productsWithoutPackages = products?.filter((element: any) => {
    return element.type === CommerceProductType.Simple;
  });

  const sortedProductsWithoutPackages = productsWithoutPackages?.sort(
    (a, b) => {
      return a.name.localeCompare(b.name);
    },
  );

  const singleTicketTypesOptions: SelectFieldOption[] | undefined =
    sortedProductsWithoutPackages?.map((product) => ({
      disabled: !product.id,
      label: product.name,
      value: product.id || 'backend error!',
    }));

  const options: SelectFieldOption[] | undefined = products?.map((product) => ({
    disabled: !product.id,
    label: product.name,
    value: product.id || 'backend error!',
  }));

  const paymentOptions: SelectFieldOption[] | undefined = paymentMethods?.map(
    (paymentMethod) => ({
      disabled: !paymentMethod.id,
      label: paymentMethod.name,
      value: paymentMethod.id || 'backend error!',
    }),
  );

  const paymentOptionsSelect = (
    <StyledSelect
      label="Select payment option"
      options={paymentOptions}
      value={paymentMethodID}
      onChange={(event) => {
        const id = event.target.value;
        const name =
          paymentOptions?.filter((elem) => elem.value === id)[0]?.label || '';
        setPaymentMethodID(id);
        setPaymentMethodName(name as string);
      }}
    />
  );

  const singleTicketCheckbox = (
    <>
      <input
        name="singleTicket"
        type="checkbox"
        onChange={(event: any) => {
          const value = event.target.checked as boolean;
          setSingleTicketEnabled(value);
          // we need to unset on disable
          setSingleTicketProductID(value ? firstOptionId : '');
          setSingleTicketProductName(firstOptionLabel);
        }}
      />
      &nbsp;One ticket per order (ticket will be preassigned)
    </>
  );

  const singleTicketSelect = (
    <StyledSelect
      label="Select ticket type"
      options={singleTicketTypesOptions}
      value={singleTicketProductID}
      onChange={(event) => {
        const id = event.target.value;
        const name =
          options?.filter((elem) => elem.value === id)[0]?.label || '';
        setSingleTicketProductID(id);
        setSingleTicketProductName(name as string);
      }}
    />
  );

  const singleTicket = (
    <>
      {singleTicketCheckbox}
      {singleTicketEnabled && (
        <Spacing left="2rem" top="1rem">
          {singleTicketSelect}
        </Spacing>
      )}
    </>
  );

  const volumeTicketsSelect = (
    <StyledSelect
      label="Select ticket type"
      options={options}
      value={volumeTicketsProductID}
      onChange={(event) => {
        const id = event.target.value;
        const name =
          options?.filter((elem) => elem.value === id)[0]?.label || '';
        setVolumeTicketsProductID(id);
        setVolumeTicketsProductName(name as string);
      }}
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
          setVolumeTicketsProductID(value ? firstOptionId : '');
          setVolumeTicketsProductName(firstOptionLabel);
        }}
      />
      &nbsp;Multiple tickets per order (tickets are not preassigned)
    </>
  );

  const volumeTicketsQuantitySelect = (
    <>
      <StyledNumberInput
        required
        label="Quantity of tickets"
        min="2"
        name="volumeTicketsQuantity"
        placeholder="Write a number"
        type="number"
        value={volumeTicketsQuantity}
        onChange={(event: any) => {
          const value = parseInt(event.target.value, 10);
          setVolumeTicketsQuantity(value);
        }}
      />
    </>
  );

  const volumeTickets = (
    <>
      {volumeTicketsCheckbox}
      {volumeTicketsEnabled && (
        <Spacing left="2rem" top="1rem">
          {volumeTicketsSelect}
          {volumeTicketsQuantitySelect}
        </Spacing>
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
      &nbsp;Notify order owner about their tickets?
    </>
  );

  const metaOptions = (
    <>
      <SubHeader>Select options applicable to ticket order</SubHeader>
      <Spacing bottom="0.5rem">{paymentOptionsSelect}</Spacing>
      <Spacing bottom="0.5rem">{singleTicket}</Spacing>
      <Spacing bottom="0.5rem">{volumeTickets}</Spacing>
      <Spacing bottom="1rem">{notifyCheckbox}</Spacing>
    </>
  );

  const metaContext: WorkUnitContext = {
    guestProductId: volumeTicketsProductID,
    notify: notifyOrderOwner,
    paymentMethodId: paymentMethodID,
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

  const badge = {
    background: notifyOrderOwner ? '#EAF9EA' : '#FDEBEB',
    color: notifyOrderOwner ? '#3BB273' : '#E15554',
  };

  const csvTemplateFile = [
    {
      'First name': 'John',
      'Last name': 'Doe',
      // eslint-disable-next-line
      'Email used': 'john@example.com',
    },
  ];

  return (
    <>
      <Spacing bottom="2rem">
        <BoxMessage
          backgroundColor="rgb(253, 235, 235)"
          color="#E15554"
          dimension="sm"
          type="warning"
        >
          Feature accessible through authorised access.
        </BoxMessage>
      </Spacing>

      <Spacing bottom="2rem">
        <ContainerCard title="Ticket Configuration">
          <Spacing bottom="1rem">{metaOptions}</Spacing>
        </ContainerCard>
      </Spacing>

      <Spacing bottom="2rem">
        <ContainerCard title="Review ticket summary">
          <Spacing bottom="1rem">
            <span>Payment Method: </span>
            <Badge background="#CCC" color="#000">
              <span>
                {paymentMethodName} ({paymentMethodID})
              </span>
            </Badge>
          </Spacing>

          {singleTicketEnabled && (
            <Spacing bottom="1rem">
              <span>Ticket type (single): </span>
              <Badge background="#CCC" color="#000">
                {singleTicketProductID ? (
                  <span>
                    {singleTicketProductName} ({singleTicketProductID})
                  </span>
                ) : (
                  'Not set'
                )}
              </Badge>
            </Spacing>
          )}

          {volumeTicketsEnabled && (
            <>
              {' '}
              <Spacing bottom="1rem">
                <span>Ticket type (multiple): </span>
                <Badge background="#CCC" color="#000">
                  {volumeTicketsProductID ? (
                    <span>
                      {volumeTicketsProductName} ({volumeTicketsProductID})
                    </span>
                  ) : (
                    'Not set'
                  )}
                </Badge>
              </Spacing>
              <Spacing bottom="1rem">
                <span>Quantity of tickets: </span>
                <Badge background="#CCC" color="#000">
                  {volumeTicketsQuantity}
                </Badge>
              </Spacing>
            </>
          )}

          <Spacing bottom="1rem">
            <span>Notify order owner:&nbsp;</span>
            <Badge background={badge.background} color={badge.color}>
              {notifyOrderOwner ? 'Yes' : 'No' || 'N/A'}
            </Badge>
          </Spacing>
        </ContainerCard>
      </Spacing>

      {singleTicketEnabled && (
        <Spacing bottom="2rem">
          <ContainerCard title="Issue a single order">
            <form onSubmit={(e) => onSingleSubmit(e)}>
              {formError && (
                <div>There seems to be an error with your input.</div>
              )}
              <Flex>
                <StyledTextInput
                  label="First name"
                  name="firstName"
                  placeholder="John"
                />
                <StyledTextInput
                  label="Last name"
                  name="lastName"
                  placeholder="Doe"
                />

                <StyledTextInput
                  label="Email"
                  name="email"
                  placeholder="john@example.com"
                />
              </Flex>
              <FlexEnd>
                <Button type="submit">Submit</Button>
              </FlexEnd>
            </form>
          </ContainerCard>
        </Spacing>
      )}

      <ContainerCard title="Upload file for bulk creation of tickets">
        <FlexCenteredVertically>
          <span>Upload a file in .csv format&nbsp;</span>
          <Button onClick={openModal}>Upload file</Button>
        </FlexCenteredVertically>

        <FileInputModal
          acceptedFileTypes=".csv"
          closeModal={closeModal}
          fileName={fileName}
          fileUploadId={fileUploadId}
          fileUploadTemplate={
            <DownloadCSVButton
              buttonText="Download .csv template"
              customTemplate={
                <StyledDownload>
                  <IconWrapper size="16px">
                    <Icon>download</Icon>
                  </IconWrapper>
                  <span>Download template</span>
                </StyledDownload>
              }
              data={csvTemplateFile}
              filename="ticket-creation-template"
            />
          }
          fileUploadText="Uploading requires a comma-separated values (CSV) file"
          isFileError={formError}
          isOpen={isOpen}
          loadingProgress={progressPercentage}
          submitCallback={onSubmit}
          onUpload={_onUpload}
        />
      </ContainerCard>
    </>
  );
};

export default Form;
