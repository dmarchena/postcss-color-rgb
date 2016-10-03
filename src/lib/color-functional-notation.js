function convertSpaces(colorFn) {
    const regex = /(\d*\.?\d+\%?)\s+(\d*\.?\d+\%?)\s+(\d*\.?\d+\%?)/g;
    return colorFn.replace(regex, '$1, $2, $3');
}

function convertAlpha(colorFn) {
    return colorFn.replace(/\s*\/\s*(\d*\.?\d+\%?)/g, (full, value) => {
        if (value.indexOf('%') > -1) {
            value = `${value.slice(0, -1) / 100}`;
        }
        value = value.replace(/^0\./, '.');
        return `, ${value}`;
    });
}

function legacy(colorFn) {
    let result = colorFn;
    if (result.indexOf('/') > -1) {
        result = result.replace(/(rgb|hsl)(?!a)/, '$1a');
        result = convertAlpha(result);
    }
    return convertSpaces(result);
}

export default { legacy };
