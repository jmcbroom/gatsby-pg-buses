
import React from "react";
import { graphql } from "gatsby";
import _ from "lodash";

import Layout from "../components/layout";

export default ({ data }) => {
  const r = data.postgres.route[0];

  console.log(r)

  return (
    <Layout>
      <div>
        <h2>{Number(r.routeShortName)} {_.startCase(_.toLower(r.routeLongName))}: Schedule</h2>
        {r.tripsByFeedIndexAndRouteIdList.map(t => (
          <p>{t.tripId}</p>
        ))}
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
        tripsByFeedIndexAndRouteIdList {
          tripHeadsign
          directionId
          tripId
          stopTimesByFeedIndexAndTripIdList(condition: {timepoint: 1}) {
            timepoint
            stopSequence
            stopId
            stopByFeedIndexAndStopId {
              stopName
              stopDesc
              stopLat
              stopLon
              stopId
            }
            arrivalTime {
              hours
              minutes
            }
          }
        }
      }
    }
  }
`;
