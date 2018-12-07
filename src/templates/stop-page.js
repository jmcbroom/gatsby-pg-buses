import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import StopMap from '../components/StopMap';

class Stop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fetched: false,
      predictions: null
    }
  }

  fetchDdot() {
    const stopId = this.props.data.postgres.stop[0].stopId
    fetch(`https://api.ddot.info/api/where/arrivals-and-departures-for-stop/DDOT_${stopId}.json?key=BETA&format=json&includePolylines=false`)
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
    const s = this.props.data.postgres.stop[0]
    return (
      <Layout>
        <div>
          <h2>{s.stopDesc}</h2>
          <div>
            <h2>Next trips</h2>
            {this.state.fetched && this.state.predictions.map(p => (
              <p>{p.tripId}, a {p.tripHeadsign} bus, is {p.numberOfStopsAway} stops away.</p>
            ))}
            <StopMap stop={s} />
          </div>
        </div>
      </Layout>
    )
  }
}

export default Stop;

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
