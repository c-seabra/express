import { Button } from '@websummit/components/src/atoms/Button';
import Icon, { IconWrapper } from '@websummit/components/src/atoms/Icon';
import Breadcrumbs, {
  Breadcrumb,
} from '@websummit/components/src/molecules/Breadcrumbs';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import DownloadCSVButton from '@websummit/components/src/molecules/DownloadCSVButton';
import FileInputModal from '@websummit/components/src/molecules/FileInputModal';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { shortenString } from '@websummit/tsutils/src/utils/text';
// todo: this needs to be cleaned up, its cross frontend import
import useEventDataQuery from '../../../../ticket-support/src/lib/hooks/useEventDataQuery';
import React, { useState } from 'react';
import styled from 'styled-components';

import { AssigneesList } from '../app/App';
import AssigneeList from '../assigneeList/AssigneeList';

export const Container = styled.div`
  max-width: 1440px;
  margin: auto;
  padding: 1rem;
`;

const Flex = styled.div`
  display: flex;
`;

const StyledDownload = styled(Flex)`
  align-items: center;
  color: #0067e9;
`;

const FlexCenteredVertically = styled(Flex)`
  align-items: center;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 500;
  color: #0c1439;
`;

const SubHeader = styled.div`
  color: #0c1439;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 21px;
`;

const BreadcrumbsContainer = styled.div`
  display: flex;
  margin: 20px 0 4px;
`;

const TicketsBulkAssignPage = () => {
  const errSnackbar = useErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const { isOpen, closeModal, openModal } = useModalState();
  const [formError, setFormError] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [fileName, setFileName] = useState('');
  const [assignees, setAssignees] = useState<AssigneesList>([]);
  const [assigneesList, setAssigneesList] = useState<AssigneesList>();
  const { event } = useEventDataQuery();
  const breadcrumbsRoutes: Breadcrumb[] = [
    {
      label: event?.name || 'Home',
    },
    {
      label: 'Bulk operations',
    },
    {
      label: 'Ticket assignment',
    },
  ];
  const fileUploadId = 'custom-file-upload';
  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (assignees && assignees.length > 0 && setAssigneesList) {
      setAssigneesList(assignees);
      successSnackbar('File imported');
    } else {
      setFormError(true);
      errSnackbar('There seems to be an error with your input');
    }
  };

  const onUpload = (e: any, elementId: string) => {
    const selectedFileName = e.target.files[0].name;
    setFileName(shortenString(selectedFileName));

    const input = document.getElementById(elementId) as HTMLInputElement;
    const { files } = input;

    const progressHandler = (evt: ProgressEvent<FileReader>) => {
      if (evt?.lengthComputable) {
        setProgressPercentage((evt.loaded / evt.total) * 100);
      }
    };

    const errorHandler = (evt: ProgressEvent<FileReader>) => {
      if (evt?.target?.error?.name === 'NotReadableError') {
        errSnackbar('Unable to read uploaded file');
      }
    };

    const process = (fileReader: ProgressEvent<FileReader>) => {
      const csv = fileReader?.target?.result as string;
      if (csv) {
        const lines = csv.split('\n');
        const result = [];

        const headers = lines[0]
          .replace(/(\r\n|\n|\r|)/gm, '')
          .replace(/,$/g, '')
          .split(',');

        for (let i = 1; i <= lines.length - 1; i++) {
          const currentLine = lines[i]
            .replace(/(\r\n|\n|\r|)/gm, '')
            .replace(/,$/g, '')
            .split(',');
          // if(currentLine.length === headers.length) {
          const obj = {} as { [key: string]: string };
          for (let j = 0; j < headers.length; j++) {
            const key = headers?.[j]?.trim();
            const value = currentLine?.[j]?.trim();
            obj[key] = value;
          }
          result.push(obj as any);
          // result.push(obj as Assignee);
          // } else {
          //   errSnackbar('This csv format is not supported make sure that there are no extra columns in your csv')
          //   return
          // }
        }

        setAssignees(result as AssigneesList);
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
        reader.onerror = errorHandler;
        reader.onprogress = progressHandler;
      } else {
        errSnackbar('No file has been selected');
      }
    } else {
      alert('FileReader is not supported in this browser.');
    }
  };

  const _onUpload = (e: any) => onUpload(e, fileUploadId);

  const csvTemplateFile = [
    {
      'Ticket reference': 'ABCD-XY',
      // eslint-disable-next-line
      'First name': 'John',
      'Last name': 'Doe',
      // eslint-disable-next-line
      'Email used': 'john@example.com',
      // eslint-disable-next-line
      'Auto claim': 'TRUE',
    },
    {
      'Ticket reference': 'ABCD-YZ',
      // eslint-disable-next-line
      'First name': 'Jane',
      'Last name': 'Doe',
      // eslint-disable-next-line
      'Email used': 'jane@example.com',
      // eslint-disable-next-line
      'Auto claim': 'FALSE',
    },
  ];

  return (
    <Container>
      <BreadcrumbsContainer>
        <Breadcrumbs routes={breadcrumbsRoutes} />
      </BreadcrumbsContainer>

      <>
        <Spacing bottom="2rem">
          <Spacing bottom="2rem" top="2rem">
            <Spacing bottom="1rem">
              <Title>Bulk assignment of tickets</Title>
            </Spacing>
            <SubHeader>
              Allows fast and easy way to bulk assign one or more tickets.
            </SubHeader>
          </Spacing>
        </Spacing>

        <Spacing bottom="2rem">
          <ContainerCard title="File upload">
            <FlexCenteredVertically>
              <Spacing right="2rem">
                <span>Upload a file in .csv format</span>
              </Spacing>
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
                  filename="ticket-assignment-template"
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
        </Spacing>

        {assigneesList && assigneesList?.length > 0 && (
          <>
            {/* DO NOT REMOVE: WILL BE USED IN NEXT ITERATION */}
            {/* <Spacing bottom="2rem" top="2rem"> */}
            {/*  <FlexEnd> */}
            {/*    <DownloadCSVButton */}
            {/*      buttonText="Download .CSV file" */}
            {/*      data={displayList.map((elem: any) => { */}
            {/*        return { */}
            {/*          'Ticket reference': elem.bookingRef || 'N/A', */}
            {/*          'First name': elem.firstName || 'N/A', */}
            {/*          'Last name': elem.lastName || 'N/A', */}
            {/*          // eslint-disable-next-line */}
            {/*          'Email used': elem.email || 'N/A', */}
            {/*          'Ticket Status': elem.status?.message || 'N/A', */}
            {/*          // eslint-disable-next-line */}
            {/*          'Claim status': elem.claimStatus?.message || 'N/A', */}
            {/*        }; */}
            {/*      })} */}
            {/*    /> */}
            {/*  </FlexEnd> */}
            {/* </Spacing> */}

            <ContainerCard noPadding title="Ticket assignment upload results">
              <AssigneeList list={assigneesList} />
            </ContainerCard>
          </>
        )}
      </>
    </Container>
  );
};

export default TicketsBulkAssignPage;
