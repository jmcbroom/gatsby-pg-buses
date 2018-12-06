/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = async ({ graphql, actions: { createPage }}) => {
  const result = await graphql(`
  {
    postgres {
      routes: allRoutesList {
        routeShortName
      }
      stops: allStopsList {
        stopId
      }
    }
  }
  `)

  result.data.postgres.routes.forEach(route => {
    createPage({
      path: `/route/${Number(route.routeShortName)}`,
      component: path.resolve('./src/templates/route-page.js'),
      context: {
        routeNo: route.routeShortName,
      },
    });
  });

  result.data.postgres.stops.forEach(stop => {
    createPage({
      path: `/stop/${stop.stopId}`,
      component: path.resolve('./src/templates/stop-page.js'),
      context: {
        stopId: stop.stopId,
      }
    })
  })
}
