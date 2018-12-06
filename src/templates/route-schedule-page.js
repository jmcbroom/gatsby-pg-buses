import React from "react";
import { graphql } from "gatsby";
import _ from "lodash";

import Layout from "../components/layout";

export default ({ data }) => {
  const r = data.postgres.route[0];

  return (
    <Layout>
      <div>
        <h2>{Number(r.routeShortName)} {_.startCase(_.toLower(r.routeLongName))}: Schedule</h2>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($routeNo: String!) {
    postgres {
      route: allRoutesList(condition: {routeShortName: $routeNo}) {
        routeShortName
        routeLongName
      }
    }
  }
`;
