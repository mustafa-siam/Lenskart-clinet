import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useOrder from '../../Hooks/useOrder';
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { FaLock, FaCreditCard } from 'react-icons/fa';
import { TbCurrencyTaka } from 'react-icons/tb';
import useAxiossecure from '../../Hooks/useAxiossecure';
import { authcontext } from '../../Providers/Authprovider';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';

const Paymentform = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [orders,refetch] = useOrder();
  const {user}=useContext(authcontext)
  const axiosSecure=useAxiossecure()
  const navigate=useNavigate()
  const location=useLocation();
  const deleveryData=location.state?.data;
 const total = orders.reduce((sum, item) => sum + item.price * item.orderqty, 0);
 const amountincents=total*100;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Payment Successful!');
    }
    setLoading(false);
    //step2:creat payment intent
    const res=await axiosSecure.post('create-payment-intent',{
      amountincents,
    })
    const clientSecret=res.data.clientSecret;
    //step3:confirem card payment
     const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      }
    });
      if (result.error) {
      console.log(`Payment failed: ${result.error.message}`);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
  console.log('Payment succeeded!');
  
  // Create order data same as COD
  const orderData = {
    userName:user?.displayName,
    user: user?.email,
    ...deleveryData,
    orders,
    total,
    orderDate: moment().format("DD-MM-YYYY"),
    status: "Pending",
    paymentMethod: "Online",
  };

  // Save to order history collection
  const res2 = await axiosSecure.post('/orderhistory', orderData);
  if (res2.data.insertedId) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Payment Successful 🎉",
      text: "Your order has been placed!",
      timer: 2000
    });
    refetch();
    setTimeout(() => {
      navigate("/")
    }, 3500);
  }
}

    }
    console.log("res from intent",res)
  };

  const cardStyle = {
    style: {
      base: {
        color: "#2d2d2d",
        fontFamily: "Poppins, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        '::placeholder': { color: "#b1b1b1" },
      },
      invalid: { color: "#ff4f6d", iconColor: "#ff4f6d" },
    },
  };

 

  return (
    <div className="flex flex-col md:flex-row gap-10 justify-center py-10 px-6">
      
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 w-full md:w-1/2 border border-fuchsia-200 hover:shadow-2xl transition">
        <h2 className="text-2xl font-bold mb-6 text-fuchsia-700 border-b pb-3 flex items-center gap-2">
          <FaCreditCard className="text-fuchsia-600" /> Billing Details
        </h2>
        <table className="w-full text-gray-700">
          <thead>
            <tr className="text-left text-sm uppercase border-b">
              <th className="py-2">Product</th>
              <th className="text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b hover:bg-fuchsia-50 transition">
                <td className="py-2">{order.name} × {order.orderqty}</td>
                <td className="text-right flex items-center justify-end gap-1">
                  <TbCurrencyTaka />{order.price * order.orderqty}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold text-lg text-fuchsia-700">
              <td className="pt-3">Total</td>
              <td className="text-right flex items-center justify-end gap-1 pt-3">
                <TbCurrencyTaka />{total}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

    
      <div className="p-[1px] rounded-2xl w-full md:w-1/2">
        <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold text-center text-fuchsia-700 mb-6 flex items-center justify-center gap-2">
            <FaCreditCard className="text-fuchsia-600" /> Secure Payment
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <CardElement options={cardStyle} />
            </div>
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
            {successMsg && <p className="text-green-500 text-sm">{successMsg}</p>}

            <button
              type="submit"
              disabled={!stripe || loading}
              className={`w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                loading
                  ? 'bg-pink-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:to-fuchsia-500 shadow-md hover:shadow-xl'
              }`}
            >
              <FaLock /> {loading ? 'Processing...' : 'Pay Securely'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Paymentform;
