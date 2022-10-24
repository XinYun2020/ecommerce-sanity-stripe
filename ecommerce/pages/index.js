import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components";
import { client } from "../lib/client";

/*
  @params: get the data returned from the getServerSideProps
*/
const Home = ({ products, bannerData }) => {
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {console.log(bannerData)}
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p className="">Speakers of many variations</p>
      </div>
      <div className="products-container">
        {/* ? to make sure we have data  */}
        {products?.map((product) => (
          <Product
            key={product._id}
            product={product}
          />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
};

/* 
 getServerSideProps
  whenever we get getServerSideProps returned, that gets populated in our function
*/
export const getServerSideProps = async () => {
  // form SANITY query (* to fetch all)
  const query = '*[_type == "product"]'; // get all product from our sanity databoard
  const products = await client.fetch(query);

  // repeat for the banner data
  const bannerQuery = '*[_type == "banner"]'; // get all product from our sanity databoard
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      bannerData,
    },
  };
};

export default Home;
