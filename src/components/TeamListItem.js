import React, { Component } from "react";
import { object } from "prop-types";

export default class TeamListItem extends Component {
  static propTypes = {
    team: object.isRequired,
    activeFilters: object.isRequired
  };

  /**
   * Handle Color click
   * Select all text when color values are clicked/tapped
   *
   * {@link http://stackoverflow.com/questions/6139107/programatically-select-text-in-a-contenteditable-html-element}
   */
  handleColorClick = e => {
    const range = document.createRange();
    range.selectNodeContents(e.target);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };

  render() {
    const {
      team,
      activeFilters: { color: activeColor }
    } = this.props;

    return (
      <li className="team">
        <h3
          className="team-name"
          style={{
            backgroundImage: `url(img/${team.league}/${team.id}.svg)`
          }}
        >
          {team.name}
        </h3>
        <ul className="colors">
          {team.colors[activeColor].map((color, i) => {
            const paintedColor = team.colors.hex[i];
            return (
              <li
                key={i}
                className={`color ${activeColor}`}
                style={{ backgroundColor: `#${paintedColor}` }}
                onClick={this.handleColorClick}
              >
                {color}
              </li>
            );
          }, this)}
        </ul>
      </li>
    );
  }
}
