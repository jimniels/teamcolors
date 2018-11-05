import React, { Component } from "react";
import { array, object } from "prop-types";
import TeamListItem from "./TeamListItem.js";

export default class TeamList extends Component {
  static propTypes = {
    teams: array.isRequired,
    activeFilters: object.isRequired
  };

  render() {
    const { activeFilters, teams } = this.props;

    return (
      <div className="wrapper">
        <ul className="teams">
          {teams.length > 0 ? (
            teams.map(team => (
              <TeamListItem
                key={team.id}
                team={team}
                activeFilters={activeFilters}
              />
            ))
          ) : (
            <li>0 teams matching your filters</li>
          )}
        </ul>
      </div>
    );
  }
}
