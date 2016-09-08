## Old Way

- Everything in `/static` are static files that are pulled in via the HTML file. So if you make a commit that changes these, they'll be pulled in automatically without having to do a "build" of the site and commiting that as well.
- Everything in `/build` has to be built when you make an interactive/stylistic change in javascript or CSS. Change some css? Compile it to `/build/styles` and commit. Change some javascript, i.e. the way the app works? Compile it to `/build/scripts`. Raw assets like images and data are pulled in from `/static`.

```
build/
  scripts/
    index.js
  styles/
    index.css
src/
  scripts/
    components/
    utils/
    index.js
  styles/
    _partial.scss
    index.scss
static/
  sketch/
    *.sketch
  img/
    epl/
    arrow.svg
    logo.svg
  data/
    teams.json
index.html
```

## New Way

You gotta rebundle everything anytime a change takes place.

Gotta have a script that:
1. compiles the css, puts it: `src/index.css`
2. npm run start
2. copies over static assets to `build/assets`

```
assets/
  sketch/
  img/
build/
  index.html
  favicon.ico
  static/
    css/
      main.38919e8392.css
    js/
      main.381938171.js
    media/
      logo.39s839820.svg # stuff you `import`
src/
  favicon.ico
  data/
    epl.json
    nba.json
  scripts/
    components/
    utils/
  styles/
    _partial.scss
    index.scss
  img/
    logo.svg
  index.js
  index.css
```
