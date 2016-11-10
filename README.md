# PostCSS Color Rgb [![Build Status][ci-img]][ci] [![Coverage Status][cov-img]][cov]

[PostCSS] plugin to transform [W3C CSS Color Module Level 4 rgb() and rgba()](https://drafts.csswg.org/css-color/#funcdef-rgb) new syntax to actual syntax (rgb() or rgba()).

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/dmarchena/postcss-color-rgb.svg
[ci]:      https://travis-ci.org/dmarchena/postcss-color-rgb
[cov-img]: https://coveralls.io/repos/github/dmarchena/postcss-slideshow/badge.svg
[cov]:     https://coveralls.io/github/dmarchena/postcss-slideshow

```
// W3C CSS Colors 4 syntax
rgb() = rgb( <percentage>{3} [ / <alpha-value> ]? ) |
        rgb( <number>{3} [ / <alpha-value> ]? )
<alpha-value> = <number> | <percentage>

// W3C CSS Colors 3 syntax (actual)
rgb() = rgb( <percentage>#{3}) |
        rgb( <integer>#{3})
rgba() = rgba( <percentage>#{3} , <alpha-value>? ) |
         rgba( <integer>#{3} , <alpha-value>? )
```

```css
.foo {
  /* Input example */
  color: rgb(99.99 255 0 / 80%);
}
```

```css
.foo {
  /* Output example */
  color: rgba(100, 255, 0, .8);
}
```

## Usage

```js
postcss([ require('postcss-color-rgb') ])
```

See [PostCSS] docs for examples for your environment.
