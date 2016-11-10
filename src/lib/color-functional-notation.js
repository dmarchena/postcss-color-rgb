function legacyAlpha(alpha) {
    if (alpha.indexOf('%') > -1) {
        alpha = `${alpha.slice(0, -1) / 100}`;
    }
    return alpha.replace(/^0\./, '.');
}

function legacyChannel(value) {
    if (value.indexOf('%') === -1) {
        // value = value.replace(/^\./, '0.');
        value = '' + Math.round(value);
    }
    return value.replace(/^0\./, '.');
}

function getColorData(colorFn) {
    const regex = /(rgb|hsl)a?\s*\((\d*\.?\d+\%?)\s+(\d*\.?\d+\%?)\s+(\d*\.?\d+\%?)(?:\s*\/\s*(\d*\.?\d+\%?))?\)/g; // eslint-disable-line max-len
    const match = regex.exec(colorFn);
    if (match === null) return false;
    return {
        fn: match[1],
        red: legacyChannel(match[2]),
        green: legacyChannel(match[3]),
        blue: legacyChannel(match[4]),
        alpha: match[5] ? legacyAlpha(match[5]) : false
    };
}

function legacy(colorFn) {
    const colorData = getColorData(colorFn);

    if (!colorData) return colorFn;

    let result = null;
    if (colorData.alpha === false) {
        result =
            colorData.fn + '(' +
                colorData.red + ', ' +
                colorData.green + ', ' +
                colorData.blue + ')';
    } else {
        result =
            colorData.fn + 'a(' +
                colorData.red + ', ' +
                colorData.green + ', ' +
                colorData.blue + ', ' +
                colorData.alpha + ')';
    }
    return result;
}

export default { legacy };
