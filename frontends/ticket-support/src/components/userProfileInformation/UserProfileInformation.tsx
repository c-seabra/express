import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Button, SecondaryButton } from '../../lib/components/atoms/Button';
import ContainerCard from '../../lib/components/atoms/ContainerCard';
import SelectField from '../../lib/components/molecules/SelectField';
import TextAreaField from '../../lib/components/molecules/TextAreaField';
import TextInputField from '../../lib/components/molecules/TextInputField';
import useEventDataQuery from '../../lib/hooks/useEventDataQuery';
import useProfileAdminUpdateMutation from '../../lib/hooks/useProfileAdminUpdateMutation';
import { Account } from '../../lib/types';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const StyledFieldset = styled.fieldset`
  border: none;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  & > div {
    width: 48%;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;

  ${SecondaryButton} {
    margin-right: 8px;
  }
`;

const userProfileSchema = Yup.object().shape({
  bio: Yup.string().nullable(),
  city: Yup.string().nullable(),
  companyName: Yup.string().nullable(),
  companySizeId: Yup.string().nullable(),
  firstName: Yup.string().nullable().required('Required'),
  gender: Yup.string().nullable(),
  industryId: Yup.string().nullable(),
  jobTitle: Yup.string().nullable().required('Required'),
  lastName: Yup.string().nullable(),
  phoneNumber: Yup.string().nullable(),
});

// This function gets rid of unwanted fields like graphql's `__typename`
const getInitialValues = (account: Account) => {
  const {
    bio,
    city,
    companyName,
    companySizeId,
    firstName,
    gender,
    industryId,
    jobTitle,
    lastName,
    phoneNumber,
  } = account;

  return {
    bio,
    city,
    companyName,
    companySizeId,
    firstName,
    gender,
    industryId,
    jobTitle,
    lastName,
    phoneNumber,
  };
};

const blankOption = {
  label: '',
  value: 'null',
};

// This is for now consistent with Omnia however, it should be expanded for inclusivity
const genderOptions = [
  blankOption,
  ...['Male', 'Female'].map((gender) => ({ label: gender, value: gender })),
];

type UserProfileInformationProps = {
  account?: Account;
  isDisabled?: boolean;
};

const UserProfileInformation = ({
  account,
  isDisabled,
}: UserProfileInformationProps) => {
  const { event } = useEventDataQuery();
  const { updateProfile } = useProfileAdminUpdateMutation({
    accountId: account?.id,
  });
  if (!account) return null;

  const industryOptions = [
    blankOption,
    ...(event?.industries?.map((industry) => ({
      label: industry.name,
      value: industry.id,
    })) || []),
  ];

  const companySizeOptions = event?.companySizes?.map((companySize) => ({
    label: companySize.name,
    value: companySize.id,
  }));

  return (
    <ContainerCard title="User profile information">
      <Formik
        initialValues={getInitialValues(account)}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={userProfileSchema}
        onSubmit={updateProfile}
      >
        {({ resetForm }) => (
          <StyledFieldset disabled={isDisabled}>
            <StyledForm>
              <Row>
                <TextInputField required label="First name" name="firstName" />
                <TextInputField label="Last name" name="lastName" />
              </Row>
              <Row>
                <TextInputField label="Phone number" name="phoneNumber" />
                <SelectField
                  label="Gender"
                  name="gender"
                  options={genderOptions}
                />
              </Row>
              <Row>
                <TextInputField label="City" name="city" />
                <TextInputField label="Company name" name="companyName" />
              </Row>
              <Row>
                <SelectField
                  label="Company size"
                  name="companySizeId"
                  options={companySizeOptions}
                />
                <SelectField
                  label="Industry"
                  name="industryId"
                  options={industryOptions}
                />
              </Row>
              <TextInputField required label="Job title" name="jobTitle" />
              <TextAreaField label="Bio" maxLength={255} name="bio" />
              <ButtonRow>
                <SecondaryButton
                  type="button"
                  onClick={() =>
                    resetForm({ values: getInitialValues(account) })
                  }
                >
                  Cancel
                </SecondaryButton>
                <Button type="submit">Save</Button>
              </ButtonRow>
            </StyledForm>
          </StyledFieldset>
        )}
      </Formik>
    </ContainerCard>
  );
};

export default UserProfileInformation;
