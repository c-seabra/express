import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";

import Warning from "./Warning";
import Field from "./Field";
import { useAppContext } from "../app/AppContext";
import { HOST_CREATE_MUTATION } from "../../operations/mutations/HostCreate";

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

const HostCreate: React.FC<{}> = () => {
  const { conferenceSlug, token } = useAppContext();
  const [name, setName] = useState<string | undefined>();
  const [regNumber, setRegNumber] = useState<string | undefined>();
  const [website, setWebsite] = useState<string | undefined>();
  const [taxNumber, setTaxNumber] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [street, setStreet] = useState<string | undefined>();
  const [region, setRegion] = useState<string | undefined>();
  const [city, setCity] = useState<string | undefined>();
  const [postalCode, setPostalCode] = useState<string | undefined>();
  const [countryId, setCountryId] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const createHost = () => {
    if (name) {
      hostCreateMutation();
    }
  };

  const [hostCreateMutation] = useMutation(HOST_CREATE_MUTATION, {
    context: {
      slug: conferenceSlug,
      token,
    },
    onCompleted: ({ hostCreate }) => {
      if (hostCreate?.host?.id) {
        setError("");
      }
      if (hostCreate?.userErrors.length) {
        setError(hostCreate.userErrors[0]?.message);
      }
    },
    refetchQueries: ["HostListQuery"],
    variables: {
      name,
      regNumber,
      website,
      taxNumber,
      email,
      invoiceAddress: {
        city,
        postalCode,
        street,
        region,
        countryId,
      },
    },
  });

  return (
    <div>
      {error && <Warning>{error}</Warning>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createHost();
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
            fieldName="street"
            label="Street"
            onChange={setStreet}
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

export default HostCreate;
