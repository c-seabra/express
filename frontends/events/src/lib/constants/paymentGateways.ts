export const paymentGatewayIds = {
  external: 'f163017a-cc4f-4619-9e72-26c5ac9ea5e7',
  paypal: '7c328ad3-53c7-4400-8bba-add5e8381b16',
  stripe: '6e8588c5-f77e-4b1e-9b70-fc412aa97832',
};

export const paymentGatewayMap = new Map([
  ['f163017a-cc4f-4619-9e72-26c5ac9ea5e7', 'External'],
  ['7c328ad3-53c7-4400-8bba-add5e8381b16', 'Paypal'],
  ['6e8588c5-f77e-4b1e-9b70-fc412aa97832', 'Stripe'],
]);

export type PaymentGateway = 'stripe' | 'paypal' | 'external';
