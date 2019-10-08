import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Handmade Items</h1>
    <p>For all family members</p>
    <p>Especially the Pets</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      {/* <Image /> */}
    </div>
  </Layout>
);

export default IndexPage;
