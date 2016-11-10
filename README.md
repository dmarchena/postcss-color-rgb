# PostCSS Color Rgb [![Build Status][ci-img]][ci] [![Coverage Status][cov-img]][cov]

[PostCSS] plugin to transform [W3C CSS Color Module Level 4 rgb() and rgba()](https://drafts.csswg.org/css-color/#funcdef-rgb) new syntax to today's alternate syntax.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/dmarchena/postcss-color-rgb.svg
[ci]:      https://travis-ci.org/dmarchena/postcss-color-rgb
[cov-img]: https://coveralls.io/repos/github/dmarchena/postcss-slideshow/badge.svg
[cov]:     https://coveralls.io/github/dmarchena/postcss-slideshow

```css
.foo {
  /* Input example */
  color: rgb(0 255 0);
}
```

```css
.foo {
  /* Output example */
  color: rgb(0, 255, 0);
}
```

## Usage

```js
postcss([ require('postcss-color-rgb') ])
```

See [PostCSS] docs for examples for your environment.
