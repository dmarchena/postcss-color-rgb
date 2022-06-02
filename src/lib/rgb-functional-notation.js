
function legacyAlpha(alpha) {
    if (alpha.indexOf('%') > -1) {
        alpha = `${alpha.slice(0, -1) / 100}`;
    }
    return alpha.replace(/^0\./, '.');
}

function legacyChannel(value) {
    if (value.indexOf('%') === -1) {
        value = '' + Math.round(value);
    }
    return value.replace(/^0\./, '.');
}

function getColorData(colorFn) {
    /* const rgbSyntaxRegex = /(\w{3})a?\s*\((\d*\.?\d+\%?)\s+(\d*\.?\d+\%?)
    \s+(\d*\.?\d+\%?)(?:\s*\/\s*(\d*\.?\d+\%?))?\)/g; */
    const rgbSyntaxPlusAltRegex = /(rgb)a?\s*\(\s*(\d*\.?\d+\%?)(?:\s+|(?:\s*,\s*))(\d*\.?\d+\%?)(?:\s+|(?:\s*,\s*))(\d*\.?\d+\%?)(?:\s*(?:\/?|,)\s*(var\([a-z-0-9,\s]+\)||\d*\.?\d+\%?))?\s*\)/g; // eslint-disable-line max-len
    const match = rgbSyntaxPlusAltRegex.exec(colorFn);
    if (match === null) return false;
    return {
        fn: match[1],
        r: legacyChannel(match[2]),
        g: legacyChannel(match[3]),
        b: legacyChannel(match[4]),
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
                colorData.r + ', ' +
                colorData.g + ', ' +
                colorData.b + ')';
    } else {
        result =
            colorData.fn + 'a(' +
                colorData.r + ', ' +
                colorData.g + ', ' +
                colorData.b + ', ' +
                colorData.alpha + ')';
    }
    return result;
}

export default { legacy };
