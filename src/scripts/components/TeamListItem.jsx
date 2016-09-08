import React from 'react';
import fuzzy from 'fuzzy';
import {capitalize, start, replace} from 'lodash';

export default React.createClass({
  propTypes: {
    team: React.PropTypes.object.isRequired,
    activeFilters: React.PropTypes.object.isRequired
  },

  /**
   * Handle Color click
   * Select all text when color values are clicked/tapped
   *
   * {@link http://stackoverflow.com/questions/6139107/programatically-select-text-in-a-contenteditable-html-element}
   */
  handleColorClick: function(e) {
    const range = document.createRange();
    range.selectNodeContents(e.target);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  },

  render: function() {
    const {
      team,
      activeFilters: {
        color: activeColor
      }
    } = this.props;

    return (
      <li className='team'>
        <h3
          className='team-name'
          style={{backgroundImage: `url(static/img/${team.league}/${team.id}.svg)`}}>
          {team.name}
        </h3>
        <ul className='colors'>
          {
            team.colors[activeColor].map((color, i) => {
              const paintedColor = team.colors.hex[i];
              return (
                <li
                  key={i}
                  className={`color ${activeColor}`}
                  style={{backgroundColor: `#${paintedColor}`}}
                  onClick={this.handleColorClick}>
                  {color}
                </li>
              );
            }, this)
          }
        </ul>
      </li>
    )
  }
})
