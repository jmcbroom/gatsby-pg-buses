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
}
