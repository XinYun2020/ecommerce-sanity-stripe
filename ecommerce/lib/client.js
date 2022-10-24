// /project/lib/client.js
// FOR SANITY CLIENT

import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// run SANITY manage in terminal
export const client = sanityClient({
  projectId: "mdgajy6p",
  dataset: "production",
  apiVersion: "2022-10-24",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

// to use the sanity images
const builder = imageUrlBuilder(client);

// sanity will provide the url of the the imaged we stored
export const urlFor = (source) => builder.image(source); // get the source
