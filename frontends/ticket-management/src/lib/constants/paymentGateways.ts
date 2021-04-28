// complementary payment gateway/method is the same id as external
// we need to differentiate between them however so when importing this variable
// make sure to add a configuration property when creating a complementary payment method
export const paymentGatewayIds = {
  complementary: 'complementary',
  external: 'f163017a-cc4f-4619-9e72-26c5ac9ea5e7',
  paypal: '7c328ad3-53c7-4400-8bba-add5e8381b16',
  stripe: '6e8588c5-f77e-4b1e-9b70-fc412aa97832',
};

export const paymentGatewayMap = new Map([
  ['complementary', 'Complementary'],
  ['f163017a-cc4f-4619-9e72-26c5ac9ea5e7', 'External'],
  ['7c328ad3-53c7-4400-8bba-add5e8381b16', 'Paypal'],
  ['6e8588c5-f77e-4b1e-9b70-fc412aa97832', 'Stripe'],
]);

export type PaymentGateway = 'stripe' | 'paypal' | 'external';

export const externalPaymentMethods = {
  complementary: 'complementary',
  external: 'external',
};
