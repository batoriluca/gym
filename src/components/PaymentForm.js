import style from "@/styles/payment.module.css";
import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm({ type = 1 }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientDetailss, setClientDetailss] = useState({
    email: "workwithaashuu@gmail.com"
  });
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log("dd", type)
  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret)
      .then(async ({ paymentIntent }) => { });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.URL}/payment`,
        receipt_email: clientDetailss.email,
      },
    });
    // console.log("clientDetails :", clientDetails);
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <PaymentElement />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span>
          {isLoading ? <div>Wait</div> : (type == 1 ? "Începe cele 7 zile gratuite" : "Faceți dupăt")}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
