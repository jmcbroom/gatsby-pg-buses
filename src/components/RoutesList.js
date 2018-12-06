import React from "react";
import { Link } from "gatsby";
import _ from "lodash";

const RoutesList = ({ routes }) => (
  <ul>
    {routes.map(route => (
      <li key={Number(route.routeShortName)}>
        <Link to={`/route/${Number(route.routeShortName)}`}>
          {Number(route.routeShortName)} {_.startCase(_.toLower(route.routeLongName))}
        </Link>
      </li>
    ))}
  </ul>
);

export default RoutesList;
