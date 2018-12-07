import React from "react";
import { List } from "semantic-ui-react";
import { Link } from "@reach/router";

class RouteStops extends React.Component {
  constructor(props) {
    super(props);
    const directions = props.stops.map(t => t.directionId);
    console.log(this.props.stops);
    this.state = {
      directions: directions,
      direction: directions[1],
    };
  }
  render() {
    const trip = this.props.stops[this.state.direction];
    const stopTimes = trip.stopTimesByFeedIndexAndTripIdList;
    const stops = stopTimes.map(st => st.stopByFeedIndexAndStopId);
    return (
      <List divided relaxed>
        {stops.map((s, i) => (
          <List.Item>
            <List.Icon
              name="bus"
              color={stopTimes[i].timepoint ? "red" : "black"}
            />
            <List.Content>
              <List.Header>{s.stopDesc}</List.Header>
              <Link to={`/stop/${s.stopId}`}>
                <List.Description>{s.stopId}</List.Description>
              </Link>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  }
}

export default RouteStops;
