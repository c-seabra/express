import Select, {
  SelectFieldOption,
} from '@websummit/components/src/molecules/Select';
import {
  useCommerceGetProductQuery,
  useCommerceListProductsQuery,
} from '@websummit/graphql/src/@types/operations';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import CheckboxField from '../../../../../packages/components/src/molecules/CheckboxField';
import FormikForm from '../../../../../packages/components/src/templates/FormikForm';
import {
  CreateOrderWorkUnit,
  defaultStatus,
  transformStaffIntoWorkUnit,
  WorkUnitContext,
} from '../../lib/extract/createOrder';
import {
  AppContext,
  Conference,
  Staff,
  StaffTicketContext,
  TicketList,
} from '../app/App';
import Loader from '../statusIcon/Loader';
import Upload from '../upload/Upload';

const SubmitButton = styled.button`
  margin: 1rem 0;
  padding: 0.5rem 1rem;
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

  const { loading, error, data } = useCommerceListProductsQuery({
    context: {
      slug: context.conference.slug,
      token: context.token,
    },
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
          const value = (event.target).checked as boolean;
          setSingleTicketEnabled(value);

          setSingleTicketProductID(firstOption);
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
          const value = (event.target).checked as boolean;
          setVolumeTicketsEnabled(value);
          setVolumeTicketsProductID(firstOption);
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
        const value = (event.target).value as number;
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

  const metaOptions = (
    <>
      {singleTicket}
      <br />
      ----
      <br />
      {volumeTickets}
    </>
  );

  const metaContext: WorkUnitContext = {
    guestProductId: volumeTicketsProductID,
    quantity: volumeTicketsQuantity,
    staffProductId: singleTicketProductID,
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (assignees && assignees.length > 0 && context.setTicketsList) {
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
    const emailField = (e.target as any).email.value as string;
    const email: string = emailField.toLowerCase().trim();

    if (context.setTicketsList && context.staffList) {
      let staff = context.staffList[email];
      if (!staff) {
        const name = email.split('@')[0];
        const [firstName, lastName] = name.split('.');
        staff = {
          email,
          firstName: capitalizeFirstLetter(firstName),
          lastName: capitalizeFirstLetter(lastName),
        };
      }

      const workUnit = transformStaffIntoWorkUnit(metaContext, staff);
      context.setTicketsList([workUnit]);
    } else {
      setFormError(true);
    }
  };
  return (
    <>
      {metaOptions}
      {singleTicketProductID}
      {volumeTicketsProductID}
      {volumeTicketsQuantity}
      <form onSubmit={(e) => onSingleSubmit(e)}>
        {formError && <div>There seems to be an error with your input.</div>}
        <input name="email" type="text" />
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
      <form onSubmit={(e) => onSubmit(e)}>
        {formError && <div>There seems to be an error with your input.</div>}
        <Upload setAssignees={setAssignees} />
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </>
  );
};

export default Form;
