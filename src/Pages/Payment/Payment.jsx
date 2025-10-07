import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Paymentform from './Paymentform';
const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
    return (
       <Elements stripe={stripePromise}>
              <Paymentform></Paymentform>
       </Elements>
    );
};

export default Payment;