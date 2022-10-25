// import Stripe from "stripe";

// const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//     } catch (error) {
//       // server error
//       res.status(500).json({ statusCode: 500, message: error.message });
//     }
//   }
// }

import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body.cartItems); // the console.log will show in the terminal
    try {
      const params = {
        // recommanded selections
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        // SHIPPING RATE: https://dashboard.stripe.com/test/shipping-rates/shr_1Lwim8IBLZb9YDRI9LqSsZzj
        shipping_options: [
          { shipping_rate: "shr_1Lwim8IBLZb9YDRI9LqSsZzj" }, // COLLECT
          { shipping_rate: "shr_1LwincIBLZb9YDRIzKVzFRXT" }, // EXPRESS - FAST SHIPPING
        ],
        /* 
            get each item
            need to modify each item to add more information
                price
                quantity
                image
        */
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref; // get the first image, not the real image, the ref is from sanity
          const newImage = img
            .replace(
              "image-", // the _ref will contain image-
              // replace image- with actual url pointing to the image
              // mdgajy6p is the id of the project (find by cli: sanity manage)
              "https://cdn.sanity.io/images/mdgajy6p/production/"
            )
            .replace("-webp", ".webp");
          //   console.log(
          //     "🚀 ~ file: stripe.js ~ line 51 ~ line_items:req.body.map ~ newImage",
          //     newImage
          //   );

          // return an object that represents one of our items
          return {
            // setup price_data
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity, // starting quantity
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      // SUCCESS
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
