import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import netlifyIdentity from "netlify-identity-widget";

import cattywampuslogo from "../images/cattywampuslogo.png";

const isActive = ({ isCurrent }) => {
  return { className: isCurrent ? "active" : "navlink" };
};

const NavLink = props => <Link getProps={isActive} {...props} />;

class Header extends React.Component {
  componentDidMount() {
    netlifyIdentity.init();
  }

  render() {
    const { siteTitle } = this.props;

    return (
      <div
        style={{
          background: `#8DD4BD`,
          marginBottom: `1.45rem`
        }}
      >
        <div>
          <NavLink to="/">
            {siteTitle}
            {/* Title / Logo */}
            <span style={{ display: "flex", alignItems: "center" }}>
              <img
                src={cattywampuslogo}
                alt="cattywampus"
                style={{
                  borderRadius: "0%",
                  border: "3px solid #888",
                  margin: "0 auto",
                  width: "100VW"
                }}
              />
              <h1 style={{ margin: 0 }}></h1>
            </span>
          </NavLink>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: `0 auto`,
            maxWidth: "75vw",
            padding: `.45rem .0875rem`
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridColumnGap: "20px"
            }}
          >
            <NavLink to="/dog-products">Dogs</NavLink>
            <NavLink to="/cat-products">Cats</NavLink>
            <NavLink to="/human-products">Humans</NavLink>
          </div>

          {/* Shopping Cart Summary */}
          <div
            style={{
              color: "white",
              cursor: "pointer"
            }}
            className="snipcart-summary snipcart-checkout"
          >
            <div>
              <strong>My Cart</strong>
            </div>
            <div>
              <span
                style={{ fontWeight: "bold" }}
                className="snipcart-total-items"
              />{" "}
              Items in Cart
            </div>
            <div>
              Total price{" "}
              <span
                style={{ fontWeight: "bold" }}
                className="snipcart-total-price"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
