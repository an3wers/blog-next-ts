import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const clientConfig = {
  projectId: "fdfkqsz5",
  dataset: "production",
};

export const client = sanityClient({
  projectId: "fdfkqsz5",
  dataset: "production",
  apiVersion: "2022-12-16",
  token: process.env.SANITY_TOKEN,
  useCdn: true,
  ignoreBrowserTokenWarning: true
});

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)
