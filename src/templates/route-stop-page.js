import React from "react";
import { graphql } from "gatsby";
import _ from "lodash";

import Layout from "../components/layout";
import RouteStops from "../components/RouteStops";

export default ({ data }) => {
  const r = data.postgres.route[0];

  const directions = _.uniq(
    r.tripsByFeedIndexAndRouteIdList.map(t => t.directionId)
  );
  const exampleTrips = directions.map(d => {
    let tripsThisDirection = r.tripsByFeedIndexAndRouteIdList.filter(t => {
      return t.directionId === d;
    });
    let sorted = tripsThisDirection.sort((a, b) => {
      return (
        a.stopTimesByFeedIndexAndTripIdList.length >
        b.stopTimesByFeedIndexAndTripIdList.length
      );
    });
    return sorted[0];
  });

  return (
    <Layout>
      <div>
        <h2>
          {Number(r.routeShortName)} {_.startCase(_.toLower(r.routeLongName))}:
          Bus stops
        </h2>
        <RouteStops stops={exampleTrips} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($routeNo: String!) {
    postgres {
      route: allRoutesList(condition: { routeShortName: $routeNo }) {
        routeShortName
        routeLongName
        tripsByFeedIndexAndRouteIdList {
          tripHeadsign
          directionId
          tripId
          stopTimesByFeedIndexAndTripIdList {
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
