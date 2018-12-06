import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";

class Prediction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fetched: false,
      predictions: null
    }
  }

  fetchDdot() {
    fetch(`https://api.ddot.info/api/where/arrivals-and-departures-for-stop/DDOT_${this.props.stopId}.json?key=BETA&format=json&includePolylines=false`)
      .then(r => r.json())
      .then(d => {
        this.setState({
          fetched: true,
          predictions: d.data.entry.arrivalsAndDepartures
        })
      })
  }

  componentDidMount() {
    this.fetchDdot()
  }

  render() {
    return (
      <div>
        <h2>Next trips</h2>
        {this.state.fetched && this.state.predictions.map(p => (
          <p>{p.tripId}, a {p.tripHeadsign} bus, is {p.numberOfStopsAway} stops away.</p>
        ))}
      </div>
    )
  }
}

export default ({ data }) => {
  const s = data.postgres.stop[0];

  return (
    <Layout>
      <div>
        <h2>{s.stopDesc}</h2>
        <Prediction stopId={s.stopId}/>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($stopId: String!) {
    postgres {
      stop: allStopsList(condition: {stopId: $stopId}) {
        stopId
        stopDesc
        stopLat
        stopLon
      }
    }
  }
`;
