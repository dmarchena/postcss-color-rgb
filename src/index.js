import postcss from 'postcss';
import parser from 'postcss-value-parser';
import functionalNotation from './lib/rgb-functional-notation';

function transformRgb(value) {
    return parser(value).walk(node => {
        /* istanbul ignore if */
        if (node.type !== 'function' || (node.value !== 'rgb' && node.value !== 'rgba')) {
            return;
        }
        node.value = functionalNotation.legacy(parser.stringify(node));
        node.type = 'word';
    }).toString();
}

module.exports = postcss.plugin('postcss-color-rgb', function (opts) {
    opts = opts || {};

    return function (root, result) {
        root.walkDecls(decl => {
            /* istanbul ignore if */
            if (!decl.value || (decl.value.indexOf('rgb(') === -1 && decl.value.indexOf('rgba(') === -1)) {
                return;
            }
            decl.value = transformRgb(decl.value);
        });
    };
});
