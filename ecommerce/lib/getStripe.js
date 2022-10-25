import { loadStripe } from "@stripe/stripe-js";

// declare empty stripe promise
let stripePromise; // undefined at start

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  return stripePromise;
};

export default getStripe;
