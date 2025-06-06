import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

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
  backgroundColor: "#6366f1", // Indigo 500
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
  backgroundColor: "#a5b4fc", // Indigo 300, lighter for disabled
  cursor: "not-allowed",
};

const messageStyle: React.CSSProperties = {
  marginTop: 16,
  fontWeight: "500",
};

const errorStyle: React.CSSProperties = {
  ...messageStyle,
  color: "#e53e3e", // red-600
};

const successStyle: React.CSSProperties = {
  ...messageStyle,
  color: "#38a169", // green-600
};

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
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

    // TODO: send paymentMethod.id to your backend to create payment intent and confirm payment

    setSuccess(true);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <button
        type="submit"
        disabled={!stripe || loading}
        style={loading || !stripe ? buttonDisabledStyle : buttonStyle}
      >
        {loading ? "Processing..." : "Pay"}
      </button>
      {error && <div style={errorStyle}>{error}</div>}
      {success && <div style={successStyle}>Payment successful!</div>}
    </form>
  );
};

export default CheckoutForm;
