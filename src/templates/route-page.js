import React from "react";
import { graphql, Link } from "gatsby";
import _ from "lodash";

import Layout from "../components/layout";

export default ({ data }) => {
  const r = data.postgres.route[0];

  return (
    <Layout>
      <div>
        <h2>{Number(r.routeShortName)} {_.startCase(_.toLower(r.routeLongName))}</h2>
        <section style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to={`/route/${Number(r.routeShortName)}/stops`}>Stops</Link>
          <Link to={`/route/${Number(r.routeShortName)}/schedule`}>Schedule</Link>
        </section>
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
