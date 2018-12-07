import React from "react";
import _ from "lodash";
import { Table, TableCell } from "semantic-ui-react";

/**
 * helper function for formatting an arrivalTime into a human readable
 * @param {} time
 */
const arrivalTimeDisplay = time => {
  let hour = time.hours;
  let minutes = time.minutes ? time.minutes.toString().padStart(2, "0") : "00";
  let ap = "am";

  // vary hours & am/pm based on what hour it is
  // gtfs has hours that are greater than 24
  if (time.hours < 12 && time.hours > 0) {
    hour = time.hours;
    ap = "am";
  } else if (time.hours > 12 && time.hours < 24) {
    hour = time.hours - 12;
    ap = "pm";
  } else if (time.hours === 24) {
    hour = 12;
    ap = "am";
  } else if (time.hours >= 24) {
    hour = time.hours - 24;
    ap = "am";
  }

  return `${hour}:${minutes} ${ap}`;
};

class RouteSchedule extends React.Component {
  constructor(props) {
    super(props);

    const trips = this.props.trips;

    this.state = {
      service: "1",
      direction: 0,
      services: _.uniq(trips.map(t => t.serviceId)),
      directions: _.uniq(trips.map(t => t.directionId)),
    };
  }
  render() {
    const all = this.props.trips;

    // filter trips by currently selected direction & service
    const filtered = all.filter(t => {
      return (
        t.directionId === this.state.direction &&
        t.serviceId === this.state.service
      );
    });

    // sort by comparing the first stop time of the trips
    const sorted = filtered.sort((a, b) => {
      return (
        a.stopTimesByFeedIndexAndTripIdList[0].arrivalTime.hours * 60 +
        a.stopTimesByFeedIndexAndTripIdList[0].arrivalTime.minutes -
        (b.stopTimesByFeedIndexAndTripIdList[0].arrivalTime.hours * 60 +
          b.stopTimesByFeedIndexAndTripIdList[0].arrivalTime.minutes)
      );
    });

    // get the trip with the most timepoints for the table header
    const mostTimepointsTrip = sorted.sort((a, b) => {
      return (
        b.stopTimesByFeedIndexAndTripIdList.length -
        a.stopTimesByFeedIndexAndTripIdList.length
      );
    })[0];

    // get the stops from the `mostTimepointsTrip` for the Table.Header row
    const timepoints = mostTimepointsTrip.stopTimesByFeedIndexAndTripIdList.map(
      st => st.stopByFeedIndexAndStopId
    );

    return (
      <Table>
        <Table.Header>
          <Table.Row>
            {timepoints.map(t => (
              <Table.HeaderCell key={t.stopId}>{t.stopDesc}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sorted.map(t => (
            <Table.Row>
              {/* Iterate over the timepoints and filter the current trip's timepoints for a match.  */}
              {timepoints.map((tp, i) => {
                let filtered = t.stopTimesByFeedIndexAndTripIdList.filter(
                  st => {
                    return st.stopId === tp.stopId;
                  }
                );
                if (filtered.length === 0) {
                  return <Table.Cell>-</Table.Cell>;
                } else {
                  return (
                    <Table.Cell>
                      {arrivalTimeDisplay(filtered[0].arrivalTime)}
                    </Table.Cell>
                  );
                }
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default RouteSchedule;
