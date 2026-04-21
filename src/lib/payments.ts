export async function createPaymentSession() {
  // TODO: Implement actual payment provider logic
  // This should create a session with your payment provider (IrisPay)
  // and return the necessary identifiers

  return {
    paymentId: 'temp-payment-id',
    hookHash: 'temp-hook-hash',
    userhash: 'temp-user-hash',
  }
}

export async function verifyPaymentSession(paymentId: string) {
  // TODO: Implement actual payment verification logic
  // This should verify the payment status with your provider

  return {
    paid: true,
    amount: 1000, // in cents
    currency: 'BGN',
  }
}
