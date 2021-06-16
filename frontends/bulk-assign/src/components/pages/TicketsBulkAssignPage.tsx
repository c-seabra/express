import { Button } from '@websummit/components/src/atoms/Button';
import Breadcrumbs, {
  Breadcrumb,
} from '@websummit/components/src/molecules/Breadcrumbs';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import DownloadCSVButton from '@websummit/components/src/molecules/DownloadCSVButton';
import FileInputModal from '@websummit/components/src/molecules/FileInputModal';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { shortenString } from '@websummit/components/src/utils/text';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useModalState } from '../../../../ticket-support/src/lib/components/molecules/Modal';
import useEventDataQuery from '../../../../ticket-support/src/lib/hooks/useEventDataQuery';
import { Assignee, AssigneesList } from '../app/App';
import AssigneeList from '../assigneeList/AssigneeList';
// import AssigneeItemsList from '../organisms/AssigneeItemsList';

export const Container = styled.div`
  max-width: 1440px;
  margin: auto;
  padding: 1rem;
`;

const HeaderText = styled.h1`
  color: #0c1439;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 32px;
  margin: 0;
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
  const [displayList, setDisplayList] = useState(assignees);
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
      setDisplayList(assignees);
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
      console.log('file', file);
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

  return (
    <Container>
      <BreadcrumbsContainer>
        <Breadcrumbs routes={breadcrumbsRoutes} />
      </BreadcrumbsContainer>

      <Spacing bottom="2rem" top="2rem">
        {/*<HeaderText>Bulk assignment</HeaderText>*/}

        {displayList && displayList.length > 0 && (
          <DownloadCSVButton
            buttonText="Download .CSV file"
            data={displayList.map((elem: any) => {
              return {
                'Booking ref': elem.bookingRef || 'N/A',
                'First name': elem.firstName || 'N/A',
                'Last name': elem.lastName || 'N/A',
                // eslint-disable-next-line
                'Email used': elem.email || 'N/A',
                'Ticket Status': elem.status?.message || 'N/A',
                // eslint-disable-next-line
                'Claim status': elem.claimStatus?.message || 'N/A',
              };
            })}
          />
        )}
      </Spacing>

      <FileInputModal
        closeModal={closeModal}
        fileName={fileName}
        fileUploadId={fileUploadId}
        isFileError={formError}
        isOpen={isOpen}
        loadingProgress={progressPercentage}
        submitCallback={onSubmit}
        onUpload={_onUpload}
      />

        <>
          <Spacing bottom="2rem">
                  <Spacing bottom="2rem">
                      <Title>Ticket creation</Title>
                      <SubHeader>
                          Allows fast and easy way to create one or more tickets in an
                          order. This feature is accelerating bulk creation of free
                          tickets
                      </SubHeader>
                  </Spacing>
          </Spacing>

          <Button onClick={openModal}>Upload file</Button>

          {assigneesList && assigneesList?.length > 0 && (
            <>
              {/* Assignee is triggered but more or less as a service to all data are displayed in new Table comp */}
              <AssigneeList
                list={assigneesList}
                // setDisplayList={setDisplayList}
              />

              <Spacing bottom="2rem">
                {/*<AssigneeItemsList items={displayList} />*/}
              </Spacing>
            </>
          )}
        </>
    </Container>
  );
};

export default TicketsBulkAssignPage;
