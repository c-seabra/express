import { graphql } from 'msw';

export const queries = [
  graphql.query('CommerceGetProduct', (req, res, ctx) => {
    if (req?.variables?.id !== '350e9704-a252-4652-a993-cbd2536ad2c5') {
      ctx.errors([{ message: 'Product not found' }]);
      return res(ctx.data({ commerceGetProduct: null }));
    }

    return res(
      ctx.data({
        commerceGetProduct: {
          __typename: 'CommerceProduct',
          active: false,
          categories: [
            {
              __typename: 'CommerceCategory',
              active: true,
              description: 'Startup tickets',
              id: '350e9704-a252-4652-a993-cbd2536ad2c5',
              name: 'Startups',
            },
          ],
          createdAt: '2021-06-09T11:56:46.324+00:00',
          createdBy: {
            __typename: 'CommerceUser',
            email: 'example@example.com',
            name: 'John Smith',
          },
          defaultPrice: 10000,
          description: null,
          id: '8d610c12-2c3f-487a-a12c-1287159a5589',
          lastUpdatedAt: '2021-06-09T11:56:46.324+00:00',
          lastUpdatedBy: {
            __typename: 'CommerceUser',
            email: 'example@example.com',
            name: 'John Smith',
          },
          metadata: { bookingRefSuffix: 'PAT12' },
          name: 'Test attendee',
          packagedProducts: [],
          price: 10000,
          tags: [
            {
              __typename: 'CommerceTag',
              code: 'ticket',
              description: 'Ticket',
              id: '97543a7e-a9c5-43f9-9ad9-1d08c096fe60',
              name: 'Ticket',
            },
          ],
          taxMode: 'B2C',
          taxType: {
            __typename: 'CommerceTaxType',
            description: null,
            id: 'f0070321-04a4-4ed2-b5c1-9c69e1df64f5',
            name: 'STANDARD',
            taxes: [
              {
                __typename: 'CommerceTax',
                country: 'PT',
                name: 'VAT',
                rateAmount: 23,
                rateType: 'PERCENTAGE',
              },
              {
                __typename: 'CommerceTax',
                country: 'IM',
                name: 'VAT',
                rateAmount: 23,
                rateType: 'PERCENTAGE',
              },
            ],
          },
          type: 'SIMPLE',
        },
      }),
    );
  }),
  graphql.query('CommerceListCategories', (req, res, ctx) => {
    return res(
      ctx.data({
        commerceListCategories: {
          __typename: 'CommerceSearchResponseCategory',
          hits: [
            {
              __typename: 'CommerceCategory',
              active: true,
              createdBy: {
                __typename: 'CommerceUser',
                email: 'example.example.com',
                id: '08005201-f7f7-46ad-8437-84b05c22ecd3',
                name: 'John Smith',
              },
              description: 'Startup tickets',
              id: '350e9704-a252-4652-a993-cbd2536ad2c5',
              lastUpdatedAt: '2021-05-21T11:32:03.066+00:00',
              name: 'Startups',
            },
          ],
        },
      }),
    );
  }),
  graphql.query('CommerceListPaymentMethods', (req, res, ctx) =>
    res(
      ctx.data({
        commerceListPaymentMethods: {
          __typename: 'CommerceSearchResponsePaymentMethod',
          hits: [
            {
              __typename: 'CommercePaymentMethod',
              active: false,
              configuration: {
                acceptUnpaidRefunds: 'true',
                refundMethod: 'true',
              },
              gateway: 'f163017a-cc4f-4619-9e72-26c5ac9ea5e7',
              id: 'b680c93a-4b9c-45d3-8ccb-ef0e45ddad0f',
              name: 'Transfer to future conference',
            },
            {
              __typename: 'CommercePaymentMethod',
              active: true,
              configuration: {
                acceptUnpaidRefunds: 'true',
                refundMethod: 'true',
                type: 'complementary',
              },
              gateway: 'f163017a-cc4f-4619-9e72-26c5ac9ea5e7',
              id: '07727824-cd3f-43bc-89e0-39947e7264cb',
              name: 'Complementary',
            },
            {
              __typename: 'CommercePaymentMethod',
              active: true,
              configuration: {
                acceptUnpaidRefunds: 'true',
                refundMethod: 'true',
                type: 'external',
              },
              gateway: 'f163017a-cc4f-4619-9e72-26c5ac9ea5e7',
              id: '5bdde446-02e8-409a-8fb8-e4d130a409f5',
              name: 'Externally paid',
            },
          ],
        },
      }),
    ),
  ),
  graphql.query('CommerceGetStore', (req, res, ctx) =>
    res(
      ctx.data({
        commerceGetStore: {
          __typename: 'CommerceStore',
          active: true,
          baseUrl: 'https://frontendstg.vercel.app',
          country: 'PT',
          currencySymbol: '€',
          id: '7ada51b5-eed4-44f9-852c-9ef5b20e16a1',
          name: 'testing from home 2020',
          slug: 'tfh20',
          taxTypes: [
            {
              __typename: 'CommerceTaxType',
              description: 'The standard rate',
              id: '21bf6d0d-d6cb-475a-a421-394921f260a9',
              name: 'Standard',
              taxes: [
                {
                  __typename: 'CommerceTax',
                  country: 'IL',
                  id: '20b0d638-f522-4338-94eb-536dd515daf6',
                  name: 'VAT2',
                  rateAmount: 22,
                  rateType: 'PERCENTAGE',
                },
                {
                  __typename: 'CommerceTax',
                  country: 'PT',
                  id: '69c111e7-e5d7-4dbd-a730-80f84785f6aa',
                  name: 'VAT',
                  rateAmount: 23,
                  rateType: 'PERCENTAGE',
                },
                {
                  __typename: 'CommerceTax',
                  country: 'IE',
                  id: '1b1ab5b5-08a4-4523-b188-784c20d2f4d6',
                  name: 'VAT',
                  rateAmount: 23,
                  rateType: 'PERCENTAGE',
                },
                {
                  __typename: 'CommerceTax',
                  country: 'MD',
                  id: '857dee12-d86c-4572-b115-d8412e5222e5',
                  name: 'V3',
                  rateAmount: 10,
                  rateType: 'PERCENTAGE',
                },
                {
                  __typename: 'CommerceTax',
                  country: 'AL',
                  id: 'ea3ff0f0-8b0c-4ce3-a8d6-061cd2b59cd7',
                  name: 'tt',
                  rateAmount: 45,
                  rateType: 'PERCENTAGE',
                },
              ],
            },
            {
              __typename: 'CommerceTaxType',
              description: null,
              id: '9c5fd781-3113-4c6f-8327-87a91ba1a527',
              name: 'ACCOMMODATION',
              taxes: [
                {
                  __typename: 'CommerceTax',
                  country: 'AL',
                  id: 'a940c4e4-6bbf-4204-a841-eb75a79775b6',
                  name: 'asasa',
                  rateAmount: 12,
                  rateType: 'PERCENTAGE',
                },
                {
                  __typename: 'CommerceTax',
                  country: 'IE',
                  id: '84100dc1-b782-4d5d-aa8e-c3d11a675e15',
                  name: 'testtt2',
                  rateAmount: 11,
                  rateType: 'PERCENTAGE',
                },
                {
                  __typename: 'CommerceTax',
                  country: 'AF',
                  id: '1bc39286-0c2a-485b-b1d2-12fb9242bdc8',
                  name: 'new Vati',
                  rateAmount: 22,
                  rateType: 'PERCENTAGE',
                },
              ],
            },
            {
              __typename: 'CommerceTaxType',
              description: null,
              id: 'f0070321-04a4-4ed2-b5c1-9c69e1df64f5',
              name: 'STANDARD',
              taxes: [
                {
                  __typename: 'CommerceTax',
                  country: 'PT',
                  id: '974229db-0cd1-418a-8c9f-7bc11221acb9',
                  name: 'VAT',
                  rateAmount: 23,
                  rateType: 'PERCENTAGE',
                },
                {
                  __typename: 'CommerceTax',
                  country: 'IM',
                  id: '487949c4-eeb2-467d-9970-ae0f3e793a62',
                  name: 'VAT',
                  rateAmount: 23,
                  rateType: 'PERCENTAGE',
                },
              ],
            },
          ],
        },
      }),
    ),
  ),
  graphql.query('CommerceListTags', (req, res, ctx) =>
    res(
      ctx.data({
        commerceListTags: {
          __typename: 'CommerceSearchResponseTag',
          hits: [
            {
              __typename: 'CommerceTag',
              code: 'ticket',
              description: 'Ticket',
              id: '97543a7e-a9c5-43f9-9ad9-1d08c096fe60',
              name: 'Ticket',
            },
          ],
        },
      }),
    ),
  ),
  graphql.query('CommerceListProducts', (req, res, ctx) =>
    res(
      ctx.data({
        commerceListProducts: {
          __typename: 'CommerceSearchResponseProduct',
          hits: [
            {
              __typename: 'CommerceProduct',
              active: true,
              categories: [
                {
                  __typename: 'CommerceCategory',
                  active: true,
                  description: 'Startup tickets',
                  id: '350e9704-a252-4652-a993-cbd2536ad2c5',
                  name: 'Startups',
                },
              ],
              createdAt: '2021-06-24T09:58:55.152+00:00',
              createdBy: {
                __typename: 'CommerceUser',
                email: 'example.example.com',
                name: 'John Smith',
              },
              defaultPrice: 0,
              description: 'Partner Startup ALPHA package',
              id: 'b007d2d6-71c2-4baa-a02d-5b9b93152900',
              lastUpdatedAt: '2021-06-24T09:58:55.152+00:00',
              lastUpdatedBy: {
                __typename: 'CommerceUser',
                email: 'example.example.com',
                name: 'John Smith',
              },
              name: 'Partner Startup ALPHA package ',
              price: 0,
              tags: [
                {
                  __typename: 'CommerceTag',
                  code: 'ticket',
                  description: 'Ticket',
                  id: '97543a7e-a9c5-43f9-9ad9-1d08c096fe60',
                  name: 'Ticket',
                },
              ],
              taxMode: 'B2B',
              taxType: {
                __typename: 'CommerceTaxType',
                description: null,
                id: 'f0070321-04a4-4ed2-b5c1-9c69e1df64f5',
                name: 'STANDARD',
              },
              type: 'PACKAGE',
            },
            {
              __typename: 'CommerceProduct',
              active: false,
              categories: [],
              createdAt: '2021-05-06T11:35:54.956+00:00',
              createdBy: {
                __typename: 'CommerceUser',
                email: 'example@example.com',
                name: 'John Smith',
              },
              defaultPrice: 0,
              description: null,
              id: 'aa807f0b-1b0b-4aea-af65-28e015886f69',
              lastUpdatedAt: '2021-05-06T11:44:43.647+00:00',
              lastUpdatedBy: {
                __typename: 'CommerceUser',
                email: 'example@example.com',
                name: 'John Smith',
              },
              name: 'testUpdate',
              price: 0,
              tags: [
                {
                  __typename: 'CommerceTag',
                  code: 'ticket',
                  description: 'Ticket',
                  id: '97543a7e-a9c5-43f9-9ad9-1d08c096fe60',
                  name: 'Ticket',
                },
              ],
              taxMode: 'B2C',
              taxType: {
                __typename: 'CommerceTaxType',
                description: 'The standard rate',
                id: '21bf6d0d-d6cb-475a-a421-394921f260a9',
                name: 'Standard',
              },
              type: 'SIMPLE',
            },
            {
              __typename: 'CommerceProduct',
              active: false,
              categories: [],
              createdAt: '2021-05-06T11:38:18.266+00:00',
              createdBy: {
                __typename: 'CommerceUser',
                email: 'example@example.com',
                name: 'John Smith',
              },
              defaultPrice: 0,
              description: null,
              id: 'a977af8a-54f5-46be-b18a-44641e98d7a4',
              lastUpdatedAt: '2021-05-06T11:38:25.947+00:00',
              lastUpdatedBy: {
                __typename: 'CommerceUser',
                email: 'example@example.com',
                name: 'John Smith',
              },
              name: 'TEST122',
              price: 0,
              tags: [
                {
                  __typename: 'CommerceTag',
                  code: 'ticket',
                  description: 'Ticket',
                  id: '97543a7e-a9c5-43f9-9ad9-1d08c096fe60',
                  name: 'Ticket',
                },
              ],
              taxMode: 'B2C',
              taxType: {
                __typename: 'CommerceTaxType',
                description: null,
                id: '9c5fd781-3113-4c6f-8327-87a91ba1a527',
                name: 'ACCOMMODATION',
              },
              type: 'SIMPLE',
            },
            {
              __typename: 'CommerceProduct',
              active: false,
              categories: [
                {
                  __typename: 'CommerceCategory',
                  active: true,
                  description: null,
                  id: '76227869-9f64-4e64-b4e5-eb43135da273',
                  name: 'General Attendee',
                },
              ],
              createdAt: '2021-04-21T09:56:41.037+00:00',
              createdBy: {
                __typename: 'CommerceUser',
                email: 'example@example.com',
                name: 'John Smith',
              },
              defaultPrice: 0,
              description: 'taeaaa',
              id: '8b176226-0bf9-45a9-bb6f-4fd850133475',
              lastUpdatedAt: '2021-04-21T11:42:15.191+00:00',
              lastUpdatedBy: {
                __typename: 'CommerceUser',
                email: 'example@example.com',
                name: 'John Smith',
              },
              name: 'Testing',
              price: 0,
              tags: [],
              taxMode: 'B2B',
              taxType: {
                __typename: 'CommerceTaxType',
                description: 'The standard rate',
                id: '21bf6d0d-d6cb-475a-a421-394921f260a9',
                name: 'Standard',
              },
              type: 'SIMPLE',
            },
          ],
        },
      }),
    ),
  ),
];
