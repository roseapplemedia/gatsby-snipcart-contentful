import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import netlifyIdentity from "netlify-identity-widget";

import Layout from "../components/layout";

class Products extends React.Component {
  state = {
    products: []
  };

  componentDidMount() {
    this.getProducts();
    netlifyIdentity.on("login", user => this.getProducts(user));
    netlifyIdentity.on("logout", () => this.getProducts());
  }

  getProducts = user => {
    console.log("Current User", user);
    const allProducts = this.props.data.allContentfulProducts.edges;
    const products =
      netlifyIdentity.currentUser() !== null
        ? allProducts
        : allProducts.filter(({ node: product }) => !product.private);
    this.setState({ products });
  };

  render() {
    const { products } = this.state;

    return (
      <Layout>
        <div>
          {/* Products List */}
          {products.map(({ node: product }) => (
            <div key={product.id}>
              <h2>For Cats</h2>
              <Link
                to={`/products/${product.slug}`}
                style={{ textDecoration: "none", color: "#551a8b" }}
              >
                <h3>
                  {product.name} ·{" "}
                  <span
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 300,
                      color: "#f60"
                    }}
                  >
                    ${product.price}
                  </span>
                </h3>

                <Img style={{ maxWidth: 200 }} fluid={product.image.fluid} />
              </Link>
            </div>
          ))}
        </div>
      </Layout>
    );
  }
}

export const query = graphql`
  {
    allContentfulProducts(filter: { category: { eq: "cat" } }) {
      edges {
        node {
          id
          slug
          name
          price
          private
          image {
            fluid(maxWidth: 400) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`;

export default Products;
