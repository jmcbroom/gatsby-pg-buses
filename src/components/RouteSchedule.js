import React from "react";
import _ from "lodash";
import { Table } from "semantic-ui-react";

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

    const filtered = all.filter(t => {
      return (
        t.directionId === this.state.direction &&
        t.serviceId === this.state.service
      );
    });

    const timepoints = filtered[0].stopTimesByFeedIndexAndTripIdList.map(
      st => st.stopByFeedIndexAndStopId.stopDesc
    );

    return (
      <Table>
        <Table.Header>
          <Table.Row>
            {timepoints.map(t => (
              <Table.HeaderCell key={t}>{t}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filtered.map(t => (
            <Table.Row>
              {t.stopTimesByFeedIndexAndTripIdList.map(st => (
                <Table.Cell>{`${st.arrivalTime.hours} ${
                  st.arrivalTime.minutes
                }`}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default RouteSchedule;
