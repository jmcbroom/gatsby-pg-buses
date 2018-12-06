import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import RoutesList from "../components/RoutesList";

const IndexPage = ({ data }) => (
  <Layout>
    <h2>Routes</h2>
    <RoutesList routes={data.postgres.routes} />
  </Layout>
);

export const query = graphql`
  {
    postgres {
      routes: allRoutesList {
        routeShortName
        routeLongName
      }
    }
  }
`;

export default IndexPage;
