Team Sport Colors

# Readme
This page renders a reference of HEX values for major league sport teams' brand colors. PHP is used to parse and load the HTML markup. Javascript is used to load team logos (if SVG is supported by the browser)

## Add / Remove / Edit a Team
All data for this page is loaded from the `team-data.json` file. If you want to change/add/edit a team, add the team's name and hex data in the appropriate league. The page will be rendered off this data.

If you want to add a team logo, add it's info in the `team-data.json' file and then add a .svg logo in the appropriate `img/` directory, with the team's name (as stated in `team-data.json`) in lowercase with hyphens in place of spaces.

## Dependencies

### Compass
CSS is built and compiled using compass. Partials are in `css/sass/` and are compiled to stylesheets in `css/`.

### Modernizer
Specialized version of modernizer tests support for SVG only. If SVG is supported, a class of 'svg' is added to the body.

This class is important. The main script will check to see if the body has a class of svg. If it does, the team logos (in .svg fomat) will be loaded. Otherwise, the team logos are not loaded.

### Team Logos
All team logos are in .svg format. See documentation on modernizer for more info.