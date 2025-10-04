import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Paymentform from './Paymentform';
const Payment = () => {
    const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
    return (
       <Elements stripe={stripePromise}>
              <Paymentform></Paymentform>
       </Elements>
    );
};

export default Payment;