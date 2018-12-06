import React from "react";
import { Link, graphql } from "gatsby";
import _ from "lodash";

import Layout from "../components/layout";

const IndexPage = ({ data }) => (
  <Layout>
    <h2>Routes</h2>
    <ul>
      {data.postgres.routes.map(route => (
        <li key={Number(route.routeShortName)}>
          <Link to={`/route/${Number(route.routeShortName)}`}>
            {Number(route.routeShortName)} {_.startCase(_.toLower(route.routeLongName))}
          </Link>
        </li>
      ))}
    </ul>
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
