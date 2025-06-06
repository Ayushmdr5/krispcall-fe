import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#a0aec0",
      },
      padding: "12px 14px",
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

const formStyle: React.CSSProperties = {
  maxWidth: 420,
  margin: "40px auto",
  padding: 24,
  border: "1px solid #e2e8f0",
  borderRadius: 8,
  backgroundColor: "#f9fafb",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
};

const buttonStyle: React.CSSProperties = {
  marginTop: 24,
  padding: "12px 20px",
  backgroundColor: "#6366f1",
  color: "white",
  fontWeight: "600",
  fontSize: "16px",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const buttonDisabledStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: "#a5b4fc",
  cursor: "not-allowed",
};

const messageStyle: React.CSSProperties = {
  marginTop: 16,
  fontWeight: "500",
};

const errorStyle: React.CSSProperties = {
  ...messageStyle,
  color: "#e53e3e",
};

const successStyle: React.CSSProperties = {
  ...messageStyle,
  color: "#38a169",
};

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState(1000);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card details not found.");
      setLoading(false);
      return;
    }

    // Create payment method
    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

    if (stripeError) {
      setError(stripeError.message || "Payment error occurred.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/payments/create-intent`,
        {
          payment_method: paymentMethod.id,
          amount,
          currency: "usd",
        }
      );

      const clientSecret = response.data.clientSecret;

      const confirmResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (confirmResult.error) {
        setError(confirmResult.error.message || "Payment confirmation failed.");
        setLoading(false);
        return;
      }

      if (
        confirmResult.paymentIntent &&
        confirmResult.paymentIntent.status === "succeeded"
      ) {
        setSuccess(true);
      } else {
        setError("Payment failed or was not completed.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Payment processing error."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amt: number) => {
    return (amt / 100).toFixed(2);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={{ marginBottom: 16, fontWeight: "600", fontSize: 18 }}>
        <h3>Pro plan</h3>
        Amount: ${formatAmount(amount)}
      </div>

      <CardElement options={CARD_ELEMENT_OPTIONS} />

      <button
        type="submit"
        disabled={!stripe || loading}
        style={loading || !stripe ? buttonDisabledStyle : buttonStyle}
      >
        {loading ? "Processing..." : `Pay $${formatAmount(amount)}`}
      </button>

      {error && <div style={errorStyle}>{error}</div>}
      {success && <div style={successStyle}>Payment successful!</div>}
    </form>
  );
};

export default CheckoutForm;
