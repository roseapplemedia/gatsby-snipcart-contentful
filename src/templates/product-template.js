import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";

const ProductTemplate = ({ data: { contentfulProducts }, location }) => (
  <Layout>
    <div
      style={{
        marginLeft: "0 auto",
        width: "100%",
        textAlign: "center"
      }}
    >
      {/* Product Info */}
      <h2>
        {contentfulProducts.name} -{" "}
        <span style={{ color: "#ccc" }}>
          Added on {contentfulProducts.createdAt}
        </span>
      </h2>
      <h4>${contentfulProducts.price}</h4>
      <p>{contentfulProducts.description}</p>
      <button
        style={{
          background: "white",
          color: "white",
          padding: "0.3em",
          borderRadius: "5px",
          cursor: "pointer"
        }}
        className="snipcart-add-item"
        data-item-id={contentfulProducts.slug}
        data-item-price={contentfulProducts.price}
        data-item-image={contentfulProducts.image.file.url}
        data-item-name={contentfulProducts.name}
        data-item-url={location.pathname}
      >
        Add to Cart
      </button>
      <Img
        style={{ margin: "0 auto", maxWidth: 600 }}
        fluid={contentfulProducts.image.fluid}
      />
    </div>
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    contentfulProducts(slug: { eq: $slug }) {
      slug
      name
      price
      description {
        description
      }
      createdAt(formatString: "MMMM Do, YYYY, h:mm:ss a")
      image {
        fluid(maxWidth: 800) {
          ...GatsbyContentfulFluid
        }
        file {
          url
        }
      }
    }
  }
`;

export default ProductTemplate;
