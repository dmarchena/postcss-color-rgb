import postcss from 'postcss';
import parser from 'postcss-value-parser';

function hasTransparency(colorFn) {
	return colorFn.nodes.reduce((acc, curr) => {
		return acc || (curr.type === 'div' && curr.value === '/');
	}, false);
}

function transformSlash(node) {
	if (node.type !== 'div' || node.value !== '/') {
		return false;
	}
	node.value = ',';
	node.before = node.after = '';
	return true;
}

function transformSpace(node) {
	if (node.type !== 'space') {
		return false;
	}
	node.type = 'div';
	node.value = ',';
	return true;
}

function parseFnToAlternateSyntax(colorFn) {
	if (hasTransparency(colorFn)) {
		colorFn.value = 'rgba';
		return parser.walk(colorFn.nodes, node => {
			transformSpace(node) || transformSlash(node);
		});
	} else {
		return parser.walk(colorFn.nodes, transformSpace);
	}
}

function transformRgb(value) {
	return parser(value).walk(node => {
		if (node.type !== 'function' || (node.value !== 'rgb' && node.value !== 'rgba')) {
			return;
		}
		node = parseFnToAlternateSyntax(node);
	}).toString();
}

module.exports = postcss.plugin('postcss-color-rgb', function (opts) {
    opts = opts || {};

    // Work with options here

    return function (root, result) {
        root.walkDecls(decl => {
			if (!decl.value || (decl.value.indexOf('rgb(') === -1 && decl.value.indexOf('rgba(') === -1)) {
				return;
			}

			decl.value = transformValue(decl.value);

        });
    };
});
