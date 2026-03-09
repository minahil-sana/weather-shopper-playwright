export interface PaymentData {
  email: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  zip: string;
}

export const payment_data: PaymentData = {
  email: 'test@test.com',
  cardNumber: '4242424242424242',
  expiry: '12/27',
  cvc: '123',
  zip: '12345',
};
