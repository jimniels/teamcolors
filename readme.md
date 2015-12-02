# Team Colors

[Team Colors](http://teamcolors.arc90.com/) is a reference of HEX, RGB, CMYK, and Pantone color values of major league sports teams.

## How-To

For development, install node_modules via npm, then run gulp for development mode:

```
npm install
gulp
```

For deployment, the site runs on github pages so all static assets must be pushed with the repo. To deploy, pass in the `prod` value to gulp:

```
gulp --prod
```

## Technical Overview

### "Server" side
Gulp is used to compile all necessary static assets locally into `assets/`. Those are then pushed to github pages which deploys and hosts the assets (hence the `CNAME` file).

To run, simply do `npm install` to get all necessary packages. Then run `gulp` to compile everything (or for developing).

### Client side
Static `index.html` file is loaded with all necessary data. If javascript is supported, it loads styles and vector versions of the team logos (if SVG is supported by the browser).


## Project Structure

Color data is rendered from each correspondingly-named league `.json` file in `src/data/`. Any changes to the data of the page can be done from those files.

*Note on colors*: Color definitions for each team are in arrays and grouped by color mode. Color values should match index position in the array across color modes, for example:

```
colors:
    rgb: TEAMS-RGB-BLUE, TEAMS-RGB-RED
    hex: TEAMS-HEX-BLUE, TEAMS-HEX-RED
```

### Edit Team Color or Name

1. Determine the team’s league
2. Find the league’s corresponding `.json` file in `src/data/`
3. Edit it
4. Run `gulp`
5. Commit

### Adding a Team

1. Determine the team’s league
2. Following the established pattern, add the team’s name and colors in its league’s `.json` file in `src/data/`
3. Add a vector logo for the team in its corresponding `.sketch` league file in `src/img/` with the team’s name (as referenced in its `.json` file) in lowercase with hyphens, i.e. "utah-jazz"
4. Export the team’s `.svg` logo to `assets/img/`
5. Run `gulp`
6. Commit

### Adding a League

Same essential steps as adding a team, except you would need new league files, i.e. a new file in `src/data` matching the league’s name (lowercase) with the league’s teams and colors, a new `.sketch` file in `src/img/` with the league’s teams and their logos, etc.


## Official Color References

### NBA

All NBA colors are official ([source](http://courtside.nba.com/QuickPlace/nbalogo/Main.nsf/$defaultview/AD4C002C7D0F37A285257D660058EAED/$File/NBA%20Primary%20Composite_14-15PLAYOFFS.pdf?OpenElement) user & pass: nbamedia).

The NBA only provides RGB, CMYK, and Pantone colors for each team, so the HEX color is a programmatic conversion of the RGB color.

### NFL

All NFL colors are official (see sources below).

The NFL provides official RGB, HEX, CMYK, and Pantone colors (so none of the colors you see on Team Colors are conversions).

The NFL has logo slicks which detail team color values. These are provided on a per-conference basis. *Note*: each of these source links are over 100MB in size, so they take a while to download.
- [AFC North](http://www.nflmedia.com/afc_north.zip)
- [AFC South](http://www.nflmedia.com/afc_south.zip)
- [AFC East](http://www.nflmedia.com/afc_east.zip)
- [AFC West](http://www.nflmedia.com/afc_west.zip)
- [NFC North](http://www.nflmedia.com/nfc_north.zip)
- [NFC South](http://www.nflmedia.com/nfc_south.zip)
- [NFC East](http://www.nflmedia.com/nfc_east.zip)
- [NFC West](http://www.nflmedia.com/nfc_west.zip)

### MLB

MLB colors have been extracted from the official “RGB Digital Art” spot color logo slicks provided at [MLB Press Box](http://mlbpressbox.mlbstyleguide.com) (user account required). They were not explicitly stated values, but they are color values pulled from individual team logos in an *official* MLB document.

The extracted colors are in HEX form and their RGB counterparts are generated programmatically.

- [American League logo slick](http://i.imgur.com/RP5kBSI.png)
- [National League logo slick](http://i.imgur.com/FcuizSx.png)

### EPL, MLS, NHL

These leagues’ teams and colors are currently approximations. I am working on getting official colors. If you know how/where to find them, please open an issue here in Github.
