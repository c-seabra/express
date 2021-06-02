import { Button } from '@websummit/components/src/atoms/Button';
import Icon, { IconWrapper } from '@websummit/components/src/atoms/Icon';
import Modal from '@websummit/components/src/molecules/Modal';
import ProgressBar from '@websummit/components/src/molecules/ProgressBar';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import React from 'react';
import styled from 'styled-components';

import FileUploadInput from './FileUploadInput';

const Flex = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 0;
`;

const FlexAlign = styled(Flex)`
  align-items: center;
`;

const FlexCenter = styled(Flex)`
  justify-content: center;
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexColCentered = styled(FlexCol)`
  text-align: center;
  justify-items: center;
  padding: 4rem 3rem;
`;

const ColumnWrapper = styled.div`
  min-width: 360px;
`;

const Text = styled.div`
  font-size: 14px;
  letter-spacing: 0;
  line-height: 20px;
`;

const SubText = styled.div`
  color: #0c1439;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 20px;
`;

const FileText = styled.div`
  color: #0c1439;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 24px;
`;

const SuccessText = styled.div`
  color: #3bb273;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 24px;
`;

const HeaderText = styled.div`
  color: #0c1439;
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -0.5px;
  line-height: 40px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px dashed #6f6f6f;
  border-radius: 5px;
  padding: 4rem 2rem;
  min-width: 300px;
`;

type ModalProps = {
  closeModal: () => void;
  fileName: string;
  fileUploadId: string;
  isFileError: boolean;
  isOpen: boolean;
  loadingProgress?: number;
  onUpload: (e: any) => void;
  submitCallback: (values?: any) => void;
  submitText?: string;
};

const FileInputModal = ({
  isOpen,
  closeModal,
  submitCallback,
  submitText = 'Submit',
  isFileError,
  onUpload,
  fileUploadId,
  fileName,
  loadingProgress,
}: ModalProps) => {
  const submit = (values: any) => {
    if (values) {
      submitCallback(values);
    }
    closeModal();
  };

  return (
    <Modal key={isOpen.toString()} isOpen={isOpen} onRequestClose={closeModal}>
      <form onSubmit={(event) => submit(event)}>
        <Wrapper>
          <ColumnWrapper>
            <FlexColCentered>
              <Spacing bottom="5rem" top="4rem">
                <Card>
                  <IconWrapper>
                    <Icon>cloud_upload</Icon>
                  </IconWrapper>

                  <Text>
                    Select file to upload <br />
                  </Text>
                  <FileUploadInput
                    elementId={fileUploadId}
                    label="Browse"
                    onUpload={onUpload}
                  />
                </Card>
              </Spacing>

              <Spacing bottom="5rem">
                <Flex>
                  <SubText>
                    Uploading requires a comma-separated values (CSV) file
                  </SubText>
                </Flex>

                <FlexCenter>
                  <SubText>
                    <FlexAlign>
                      <IconWrapper size="16px">
                        <Icon>download</Icon>
                      </IconWrapper>
                      <span>Download template</span>
                    </FlexAlign>
                  </SubText>
                </FlexCenter>
              </Spacing>
            </FlexColCentered>
          </ColumnWrapper>

          <ColumnWrapper>
            <FlexCol>
              <Spacing bottom="3rem" top="2rem">
                <HeaderText>File upload</HeaderText>
              </Spacing>

              {!fileName && (
                <Spacing bottom="5rem">
                  <Flex>
                    <FlexCol>
                      <Spacing right="1.1rem">
                        <IconWrapper color="rgba(0, 0, 0, 50%)">
                          <Icon>image</Icon>
                        </IconWrapper>
                      </Spacing>
                    </FlexCol>
                    <FlexCol>
                      <Flex>
                        <FlexAlign>
                          <SubText>No file uploaded</SubText>
                        </FlexAlign>
                      </Flex>
                    </FlexCol>
                  </Flex>
                </Spacing>
              )}

              {fileName && (
                <Spacing bottom="5rem">
                  <Spacing bottom="4.0625rem">
                    <Flex>
                      <FlexCol>
                        <Spacing right="1.1rem">
                          <IconWrapper color="#000">
                            <Icon>image</Icon>
                          </IconWrapper>
                        </Spacing>
                      </FlexCol>
                      <FlexCol>
                        <Flex>
                          <FlexAlign>
                            <FileText>{fileName}</FileText>
                          </FlexAlign>
                        </Flex>

                        <Spacing bottom="4px" top="4px">
                          <Flex>
                            {loadingProgress && (
                              <ProgressBar progress={loadingProgress} />
                            )}
                          </Flex>
                        </Spacing>

                        <Flex>
                          <FlexAlign>
                            <Spacing right="5px">
                              <IconWrapper color="#3bb273" size="20px">
                                <Icon>check_circle</Icon>
                              </IconWrapper>
                            </Spacing>
                            <SuccessText>
                              The upload was successful.
                            </SuccessText>
                          </FlexAlign>
                        </Flex>
                      </FlexCol>
                    </Flex>
                  </Spacing>

                  <Flex>
                    <Button
                      disabled={isFileError}
                      type="submit"
                      onClick={submit}
                    >
                      {submitText}
                    </Button>
                  </Flex>
                </Spacing>
              )}
            </FlexCol>
          </ColumnWrapper>
        </Wrapper>
      </form>
    </Modal>
  );
};

export default FileInputModal;
