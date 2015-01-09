# Team Colors

[Team Colors](http://teamcolors.arc90.com/) is a reference of HEX & RGB color values of major league sporting teams. 


## Technical Overview

PHP is used to parse and load the basic HTML markup. Javascript is used to load styles and vector versions of the team logos (if SVG is supported by the browser).


## Making Changes

Team Colors data is rendered from the `team-data.json` file. Any changes to the data of the page can be done from that file. Teams are sorted according to their respective leagues. Leagues and league navigation controls are all rendered from this single `.json` file.

### Edit Team Color or Name

1. Find the team's entry in `team-data.json` 
2. Edit it

### Adding a Team

1. Add the team name and colors in `team-data.json`
2. Add an .svg logo in the `project-files/TeamLogos.sketch` file, with the team's name (as stated in `team-data.json`) in lowercase with hyphens in place of spaces
3. Export the .svg file to the `img/` directory

## Dependencies

### Compass

CSS is built and compiled using compass. Partials are in `css/sass/` and are compiled to stylesheets in `css/`.

### Sketch App

All team logos are laid out in the .sketch file. You can export them to their corresponding league in `img/`.
