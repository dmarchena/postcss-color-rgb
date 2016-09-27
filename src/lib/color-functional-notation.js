function legacy(colorFn) {
    if (colorFn.indexOf('/') > -1) {
        colorFn = colorFn.replace(/(rgb|hsl)/, '$1a');
    }
    colorFn = colorFn.replace(/\s*\/\s*/g, ',');
    colorFn = colorFn.replace(/(\s+)/g, ',');
    return colorFn;
}

export default { legacy };
