import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";

import Warning from "./Warning";
import Field from "./Field";
import { useAppContext } from "../app/AppContext";
import { LEGAL_ENTITY_CREATE_MUTATION } from "../../operations/mutations/LegalEntityCreate";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SubmitButton = styled.button`
  padding: 0.5rem;
  margin: 0.5rem 0 0.5rem 0;
  border-radius: 8px;
  border: none;
  border: 1px solid grey;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: grey;
    color: white;
  }
`;

const LegalEntityCreate: React.FC<{}> = () => {
  const { conferenceSlug, token } = useAppContext();
  const [name, setName] = useState<string | undefined>();
  const [regNumber, setRegNumber] = useState<string | undefined>();
  const [website, setWebsite] = useState<string | undefined>();
  const [taxNumber, setTaxNumber] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [lineOne, setLineOne] = useState<string | undefined>();
  const [lineTwo, setLineTwo] = useState<string | undefined>();
  const [region, setRegion] = useState<string | undefined>();
  const [city, setCity] = useState<string | undefined>();
  const [postalCode, setPostalCode] = useState<string | undefined>();
  const [countryId, setCountryId] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const createLegalEntity = () => {
    if (name) {
      legalEntityCreateMutation();
    }
  };

  const [legalEntityCreateMutation] = useMutation(
    LEGAL_ENTITY_CREATE_MUTATION,
    {
      context: {
        slug: conferenceSlug,
        token,
      },
      onCompleted: ({ legalEntityCreate }) => {
        if (legalEntityCreate?.legalEntity?.id) {
          setError("");
        }
        if (legalEntityCreate?.userErrors.length) {
          setError(legalEntityCreate.userErrors[0]?.message);
        }
      },
      refetchQueries: ["LegalEntityListQuery"],
      variables: {
        name,
        regNumber,
        website,
        taxNumber,
        email,
        address: {
          city,
          postalCode,
          lineOne,
          lineTwo,
          region,
          countryId,
        },
      },
    }
  );

  return (
    <div>
      {error && <Warning>{error}</Warning>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLegalEntity();
        }}
      >
        <Row>
          <Field required fieldName="name" label="Name" onChange={setName} />
          <Field
            fieldName="regNumber"
            label="Registration number"
            onChange={setRegNumber}
          />
          <Field fieldName="website" label="Website" onChange={setWebsite} />
          <Field
            fieldName="taxNumber"
            label="Tax Number"
            onChange={setTaxNumber}
          />
          <Field fieldName="email" label="Email" onChange={setEmail} />
        </Row>

        <h4>Address</h4>
        <Row>
          <Field
            required
            fieldName="lineOne"
            label="Line 1"
            onChange={setLineOne}
          />
          <Field
            required
            fieldName="lineTwo"
            label="Line 2"
            onChange={setLineTwo}
          />
          <Field
            required
            fieldName="region"
            label="Region"
            onChange={setRegion}
          />
          <Field required fieldName="city" label="City" onChange={setCity} />
          <Field
            required
            fieldName="postalCode"
            label="Postal Code"
            onChange={setPostalCode}
          />
          <Field
            required
            fieldName="countryId"
            label="Country"
            onChange={setCountryId}
          />
        </Row>

        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </div>
  );
};

export default LegalEntityCreate;
