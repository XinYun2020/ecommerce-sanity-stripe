import React, { useState } from "react";
import { client, urlFor } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, products }) => {
  // destructure
  const { image, name, details, price } = product;
  //
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd } = useStateContext();

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div className=" flex flex-row">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span
                className="minus"
                onClick={decQty}
              >
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span
                className="plus"
                onClick={incQty}
              >
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="buy-now"
              //   onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div
            className={
              products.length > 3
                ? `maylike-products-container track`
                : `maylike-products-container`
            }
          >
            {/* track will make the marquee move around, animation */}
            {products.map((item) => (
              <Product
                key={item._id}
                product={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  // give me all the product, but dont return all, just return the current slug product
  const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

/*
    params: access the actual url query 
*/
export const getStaticProps = async ({ params: { slug } }) => {
  // form SANITY query (* to fetch all)
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`; // get the first product that matches the query: fetch product details
  // fetch all similar products
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query); // fetch the product
  const products = await client.fetch(productsQuery); // fetch all similar products

  return {
    props: {
      product,
      products,
    },
  };
};

export default ProductDetails;
