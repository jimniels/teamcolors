# Team Colors
Team Colors is a reference of HEX values for the brand colors of major league sporting teams. 


## Technical Overview
PHP is used to parse and load the HTML markup. Javascript is used to load vector versions of the team logos (if SVG is supported by the browser).


## Making Changes
Team Colors data is rendered from the `team-data.json` file. Any changes to the data of the page can be done from that file. Teams are sorted according to their respective leagues. Leagues and league navigation controls are all rendered from this single `.json` file.

### Edit Team Color or Name
If you want to edit a team's name or color(s), find the team's entry in `team-data.json`.

### Adding a Team
If you want to add a team, add the team name and colors in `team-data.json`. Then, add a .svg logo in the appropriate `img/` directory, with the team's name (as stated in `team-data.json`) in lowercase with hyphens in place of spaces.

### Adding a New League
Adding a league is relatively straight forward. Copy the model used for structuring data in `team-data.json`, add the appropriate logos, and you're done.


## Dependencies

### Compass
CSS is built and compiled using compass. Partials are in `css/sass/` and are compiled to stylesheets in `css/`.

### Modernizer
Specialized version of modernizer tests support for SVG only. If SVG is supported, a class of 'svg' is added to the body.

This class is important. The main script will check to see if the body has a class of svg. If it does, the team logos (in .svg fomat) will be loaded. Otherwise, the team logos are not loaded.

### Team Logos
All team logos are in .svg format. See documentation on modernizer for more info.